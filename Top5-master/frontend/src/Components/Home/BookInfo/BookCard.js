// import React from "react";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./newcard.css";

export default function BookCard(props) {


  let href = "/particular/";
 

  if (props.productInfo.id !== undefined) {
    href += props.productInfo.id;
  }
  const [userdata, Setuserdata] = useState([]);

  useEffect(() => {
    

    let userInfo = JSON.parse(localStorage.getItem("productId"));
    if (userInfo && userInfo.length !== 0) {
      Setuserdata(userInfo)
    } else {
      let arr = [];
      Setuserdata(arr)
    }
  }, [])


  return (
    <>

      <div className="div_change col-sm-4 col-12 mx-auto my-2" >
        
        <NavLink to={href}  class="card 1" >
          <div class="card_image"> <img  src={
                props.productInfo.volumeInfo.imageLinks === undefined ? "https://source.unsplash.com/user/erondu/400x300" : props.productInfo.volumeInfo.imageLinks.thumbnail
            } alt="" /> </div>
          <div class="card_title title-white">
          
          </div>
        </NavLink>
      </div>



      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}



// link uses
// https://stackoverflow.com/questions/34687091/can-i-execute-a-function-after-setstate-is-finished-updating