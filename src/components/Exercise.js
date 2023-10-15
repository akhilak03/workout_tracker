import React, { isValidElement, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button'
import moment from 'moment'
function Exercise() {
  let { userObj, isError, isLoading, isSuccess, errMsg } = useSelector(
    (state) => state.user
  )
  const navigate = useNavigate();
  let [Exerc, setExerc] = useState([]);
  const date = moment()
  var currDate = date.format('DD/MM/YYYY')
  useEffect(() => {
    axios
      .get("http://localhost:4000/exercise/get-exercise")
      .then((response) => {
        setExerc(response.data.payload);
        console.log(response.data.payload);
      })
      .catch((error) => alert("something went wrong!!"));
  }, []);
  //console.log(currDate) ]
  const renderUsers = (element) => {
    const result = [];
    console.log(element.date)
    let x = Object.keys(element.date)
    let y = x.length
    let z = Object.values(element.date)[y - 1]
    console.log(z)
    for (let i in z) {
      if (z.hasOwnProperty(i)) {
        let value = z[i];
        console.log(i, value[0], value[1]);
        result.push(<ul><li>{i}</li><li>{value[0]}</li></ul>)
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
          {Exerc.filter(isValid).map((element, Index) =>
            <div className="Card" key={Index}>
              <div>{renderUsers(element)}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Exercise