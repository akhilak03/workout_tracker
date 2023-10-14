const exp = require("express");
const exerciseApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
//to extract body of request object
exerciseApp.use(exp.json());
require("dotenv").config();

exerciseApp.post(
  "/create-exercise",
  expressAsyncHandler(async (request, response) => {
    //getuserCollectionobject
    // console.log(request.file.path)
    let userExercise = request.app.get("exerciseObj");
    //get userobj as string from client and convert into object
    let newexerciseObj = (request.body);
    console.log(newexerciseObj)
    //search for user by username 
    let result = await userExercise.insertOne(newexerciseObj);
    if (result == undefined) {
      response.send({ message: "FAILED exercise created" });
    }
    else {
      response.send({ message: "exercise created" });
    }


  })
);


exerciseApp.post(
  "/add-exercise",
  expressAsyncHandler(async (request, response) => {
    //getuserCollectionobject
    // console.log(request.file.path)
    let userExercise = request.app.get("exerciseObj");
    //get userobj as string from client and convert into object
    let newexerciseObj = (request.body);
    let excname = newexerciseObj.exercise
    let excval = newexerciseObj.sets
    //search for user by username 
    //console.log(excname,excval)
    let userOfDb = await userExercise.findOne({
      $and: [{ username: newexerciseObj.username }]  //and newuserObj,d---currentDate....
    });

    console.log("userobj", userOfDb)
    let d = newexerciseObj.d
    let x = {}

    x[d] = { [excname]: [excval, false] }


    if (userOfDb === null) {
      let resu = await userExercise.insertOne({
        username: newexerciseObj.username, date: x
      })
      console.log("res", resu)
      if (resu === null) {
        response.send({ message: "No exercise created" });
      }
      else {
        response.send({ message: "exercise created" });
      }
    }
    else {
      //let userDate = userOfDb["date"][d]
      /*if (userDate === null) {
        let x = { ...userOfDb["date"], [d]: { [excname]: [excval, false] } }
        let ans = await userExercise.updateOne({
          username: newexerciseObj.username
        }, {
          $set: {
            date: x
          }
        });
        if (ans === null) {
          response.send({ message: "new date exercise adding failed" });
        }
        else {
          response.send({ message: "new Date exercise added" });
        }
      } */
        let f_val = userOfDb["date"] //{14}
        let flag = 0
        for (i in f_val[d]) {
          if (i === excname) {
            f_val[d][i] = [parseInt(f_val[d][i][0]) + parseInt(excval), f_val[d][i][1]];
            flag = 1
            console.log(1)
          }
        }
        if (flag === 0) {
          f_val[d] = { ...f_val[d], [excname]: [excval, false] }
        }
        console.log(f_val)
        let res = await userExercise.updateOne({
          username: newexerciseObj.username
        }, {
          $set: {
            date: f_val
          }
        });
        if (res === null) {
          response.send({ message: "FAILED exercise adding" });
        }
        else {
          response.send({ message: "exercise added" });
        }
      }

    }
  )
);

exerciseApp.get(
  "/get-exercise",
  expressAsyncHandler(async (request, response) => {
    //getuserCollectionobject
    let userExercise = request.app.get("exerciseObj");
    let result = await userExercise.find().toArray();
    if (result == undefined) {
      response.send({ message: "no exercise found for that Date!" });
    } else {
      response.send({ message: "Exercises are Found", payload: result });
    }
    //get userobj from client
  })
);



module.exports = exerciseApp;