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
    //console.log(currDate) 
    function isValid(element) {
        let x = Object.keys(element.date)
        let y = x.slice(-1)[0]
        console.log(y)
        return element.username === userObj.username && y === currDate
    }
/*
let x = Object.values(date)[0]
for (let i in x) {
        if (x.hasOwnProperty(i)) {
            value = x[i];
            console.log(i,value[0], value[1]);
        }
}*/
    return (
        <div className="root1" >
        <div className="body">
          <div className="title1 mt-4"> YOUR EVENTS </div>
          <div className="Card-container">
            {Exerc.filter(isValid).map((element, Index) =>
              <div className="Card" key={Index}>
                <h1>{Object.values(element.date)[Index]}</h1>
              </div>  
            )}
          </div>
        </div>
      </div>
    )
}

export default Exercise