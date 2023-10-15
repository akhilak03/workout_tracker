import React, { isValidElement, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
import Button from 'react-bootstrap/Button'
import { exercRender } from "../slices/exerciseSlice";
import moment from 'moment'
function Exercise() {
  let { userObj, isError, isLoading, isSuccess, errMsg } = useSelector(
    (state) => state.user
  )
  let { exercObj, isError1, isLoading1, isSuccess1, errMsg1 } = useSelector(
    (state) => state.exercise
  )

  const navigate = useNavigate();
  let [Exerc, setExerc] = useState([]);
  const date = moment()
  var currDate = date.format('DD/MM/YYYY')
  let dispatch=useDispatch();
  useEffect(() => {
    dispatch(exercRender());
    //console.log(exercObj)
  }, [exercObj]);
 

  const myfun=()=>{
      console.log("Hello!!!");
  }

  const renderExercises = (element) => {
    const result = [];
    //console.log(element.date)
    let x = Object.keys(element.date)
    let y = x.length
    let z = Object.values(element.date)[y - 1]
    //console.log(z)
    for (let i in z) {
      if (z.hasOwnProperty(i)) {
        let value = z[i];
        //console.log(i, value[0], value[1]);
        result.push(
        <ul>
          <li>{i}<button onClick={myfun}>X</button></li>
          <li>{value[0]}</li>
          </ul>
        )
      }
    }
    return <div>{result}</div>;
  };

  function isValid(element) {
    return element.username === userObj.username
  }


  return (
    <div className="root1" >
      <div className="body">
        <div className="title1 mt-4"> YOUR EVENTS </div>
        <div className="Card-container">
           {exercObj.filter(isValid).map((element, Index) =>
            <div className="Card" key={Index}>
              <div>{renderExercises(element)}</div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  )
}

export default Exercise