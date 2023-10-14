import React from "react";
import { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
//import { BiLogIn } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from 'moment'
import Exercise from "./Exercise";
function DailyTarget() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  let { userObj, isError, isLoading, isSuccess, errMsg } = useSelector(
    (state) => state.user
  );
  
  const onFormSubmit = (Excobj) => {
    const date = moment()
    var currDate = date.format('DD/MM/YYYY')

    let x = { username: userObj.username, d: currDate }
    let newExcObj = { ...x, ...Excobj }
    console.log(newExcObj);
    axios
      .post("http://localhost:4000/exercise/add-exercise", newExcObj)
      .then((response) => {
        //console.log(response)
        alert(response.data.message);
      })
      .catch((error) => alert("something went wrong while adding exercise "));
  };

  //this has to be excecuted when ever issucces or isError is changes
  return (
    <>
      <div>
        <div className="display-2 text-center text-secondary m-3">
          Login Form
        </div>
        <Form className="w-50 mx-auto" onSubmit={handleSubmit(onFormSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Select type of User</Form.Label> <br />
            <Form.Select aria-label="Default select example"
              {...register("exercise", { required: true })}>
              <option value="">Open this select menu</option>
              <option value="situps">situps</option>

              <option value="planks">planks</option>
              <option value="pushups">pushups</option>
            </Form.Select>

            {/*error validation for username */}
            {errors.exercise && (
              <p className="text-danger"> *exercise is required</p>
            )}



          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Select no. of sets</Form.Label>
            <Form.Control
              type="number"
              default="0"
              {...register("sets", { required: true })}
            />
            {/*error validation for username */}
            {errors.sets && (
              <p className="text-danger"> *sets is required</p>
            )}
          </Form.Group>




          <Button variant="primary" type="submit">
            Add Exercise
          </Button>
        </Form>
      </div>
      <Exercise/>
    </>
  );
}

export default DailyTarget;
