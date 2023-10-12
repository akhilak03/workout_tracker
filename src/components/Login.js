import React from 'react';
import {useEffect} from 'react';
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { BiLogIn } from "react-icons/bi";
import {useSelector,useDispatch} from 'react-redux';
import {userLogin} from '../slices/userSlice'
import {useNavigate} from 'react-router-dom'
import axios from "axios";

function Login() {
  const {register,handleSubmit,formState:{errors}}=useForm()
  const navigate=useNavigate()
  let {userObj,isError,isLoading,isSuccess,errMsg}=useSelector(state=>state.user);
  let dispatch=useDispatch();
  const onFormSubmit=(userCredobj)=>{
    dispatch(userLogin(userCredobj));
    axios
    .post("http://localhost:4000/user/login", userCredobj)
    .then((response) => {
      //console.log(response)
      alert(response.data.message);
    })
    .catch((error) => alert("something went wrong while login "));
    if (userCredobj.userType === "user") {
      navigate("/Event")
    }

    if(userCredobj.userType === "admin") {
      navigate("/HostEvent")
     
      // dispatch(userLogin(userCredentialsObject));
    }

  }
 
  //this has to be excecuted when ever issucces or isError is changed
  useEffect(()=>{
    if(isSuccess){
      navigate("/Event") ;     
    }
  },[isSuccess,isError]);
  return (
    <>
    <div>
      <div className="display-2 text-center text-secondary m-3">
        Login Form
      </div>
      <Form className="w-50 mx-auto" onSubmit={handleSubmit(onFormSubmit)}>
      <Form.Group className="mb-3">
              <Form.Label>Select type of User</Form.Label> <br />
              {/* user type */}
              <Form.Check inline type="radio" id="user">
                <Form.Check.Input
                  type="radio"
                  value="user"
                  {...register("userType", { required: true })}
                />
                <Form.Check.Label>User</Form.Check.Label>
              </Form.Check>
              <Form.Check inline type="radio" id="admin">
                <Form.Check.Input
                  type="radio"
                  value="admin"
                  {...register("userType", { required: true })}
                />
                <Form.Check.Label>Admin</Form.Check.Label>
              </Form.Check>
            </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="enter Username"
            {...register("username", { required: true })}
          />
          {/*error validation for username */}
          {errors.username && (
            <p className="text-danger"> *username is required</p>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="enter Password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-danger"> *password is required</p>
          )}
        </Form.Group>
        

        <Button variant="primary" type="submit">
          Login <BiLogIn />
        </Button>
      </Form>
    </div>
    <div>
      <h5>Need an account...</h5>
      <a href="/Signup"> Sign Up</a>
    </div>
    </>

  )
}

export default Login