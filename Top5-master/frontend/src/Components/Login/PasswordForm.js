import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Login.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const FormPage = () => {
  let token;
  const [data, setData] = useState({
    email : "",
    otp: "",
    password: "",
    conPassword : "",

  })
  
  
    const InputData = (event) => {
    const { name, value } = event.target;
    setData((preValue) => {
      return {
        ...preValue,
        [name]: value
      };
    })
  }

  const LoginSubmit = (e) => {
    e.preventDefault();
    if(data.otp.length === 0 || data.email.length === 0 || data.password.length === 0){
        toast.warning('Please Enter all the feild', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        return ;
    }
    if(data.password !== data.conPassword){
        toast.warning('Password are not matching', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        return ;
    }
    const login = {
      email:data.email,
      password:data.password,
      otpCode:data.otp
    }


    fetch('http://localhost:8000/forget/change-password', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(login)
    })
      .then(data => {
        if(data.status === 200){
            toast.success('Password change successfully', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        }else{
            toast.error('Someting Went wrong please try later', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        }
        window.location = "/login";
      })
      .catch(err => console.log(err));

  }

  return (
    <>
      <div class="session">
        <form className="form" onSubmit={LoginSubmit}>
          <div class="floating-label">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={setData.email}
              className="input"
              onChange={InputData}
              autocomplete="off" />
            <label for="email">Email:</label>  
          </div>


          <div class="floating-label">
            <input
              type="otp"
              placeholder="OTP"
              maxLength="4"
              name="otp"
              value={setData.otp}
              className="input"
              onChange={InputData}
              autocomplete="off" />
            <label for="password">OTP:</label>
          </div>

          <div class="floating-label">
            <input
              type="password"
              placeholder="password"
              name="password"
              value={setData.password}
              className="input"
              onChange={InputData}
              autocomplete="off" />
            <label for="password">Password:</label>
          </div>

          <div class="floating-label">
            <input
              type="password"
              placeholder="Conform Password"
              name="conPassword"
              value={setData.conPassword}
              className="input"
              onChange={InputData}
              autocomplete="off" />
            <label for="password">Conform Password:</label>
          </div>

          <button className="button" type="submit" >Change Password</button>
        </form>
      </div>
      <ToastContainer
                position="top-center"
                autoClose={2000}
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
};

export default FormPage;