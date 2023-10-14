//create router to handle user api requests
const { request } = require("express");
const { response } = require("express");
const exp = require("express");
const expressAsyncHandler = require("express-async-handler");
const adminApp = exp.Router();
//to extract body of request object
adminApp.use(exp.json());
//to extract body of request object



//creatr product using asyn and await
adminApp.post(
  "/CreateProducts",
  expressAsyncHandler(async (request, response) => {
    // get productCollectionObject

    let EventObj = request.app.get("adminObj");
    let EObj = request.body;
    let result = await EventObj.insertOne(EObj);
    if (result == undefined) {
      response.send({ message: "no event has been created!" });
    } else {
      response.send({ message: "Event has been successfully created!!"});
    }
  })
);
adminApp.get(
  "/getEvents",
  expressAsyncHandler(async (request, response) => {
    //getuserCollectionobject
    let EventObj= request.app.get("adminObj");
    let result = await  EventObj.find().toArray();
    if (result == undefined) {
      response.send({ message: "no event found!" });
    } else {
      response.send({ message: "All Events", payload: result });
      //console.log(result)
      //result.map((e)=>{console.log(e)})
    }
    //get userobj from client
  })
);



//export apis
module.exports = adminApp;
