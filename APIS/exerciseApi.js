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
      let userExercise= request.app.get("exerciseObj");
      
      //get userobj as string from client and convert into object
      let newexerciseObj = (request.body);
      console.log(newexerciseObj)
      //search for user by username 
      let result = await userExercise.insertOne(newexerciseObj);
      if(result == undefined ){
        response.send({ message: "FAILED exercise created" });
      }
      else{
        response.send({ message: "exercise created" });
      }
    
      
    })
  );
  module.exports = exerciseApp;