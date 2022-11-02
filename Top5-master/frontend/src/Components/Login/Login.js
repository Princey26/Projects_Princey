import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Login.css";
// import { NavLink } from "react-router-dom";
import Img from "../Images/bookLogin.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../Navbar/Navbar";

const FormPage = () => {
  let token;
  const [data, setData] = useState({
    username: "",
    password: "",
    // verifyPassword: ""
  })
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem('Token')) {
      setRedirect(true);
    }
  }, [])
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
    const login = {
      username: data.username,
      password: data.password,
      // verifyPassword: data.verifyPassword,
    }


    fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(login)
    })
      .then(res => res.json())
      .then(data => {

        token = data.jsonToken;
        // console.log(data)
        if (token !== undefined && token !== null) {
          // console.log(token);
          sessionStorage.setItem("Token", token);
          sessionStorage.setItem("userInfo", JSON.stringify(data.user));
            toast.success('🦄 Successful login !', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              window.location = "/user";
            }, 2000);
        }
        else {
          toast.info(data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          // alert(data.message)
        }
      })
      .catch(err => console.log(err));

  }

  return (
    <>
      <Navbar />
      <div class="session">
        <div class="left">
          <img src={Img} alt="No image" />
        </div>
        <form className="form" onSubmit={LoginSubmit}>
          <h4>We are <span>NUVA</span></h4>
          <p>Welcome back! Log in to your account to view today's clients:</p>
          <div class="floating-label">
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={setData.username}
              className="input"
              onChange={InputData}
              autocomplete="off" />
            <label for="email">Email:</label>
            <div class="icon">

              <rect class="st0" width="100" height="100" />

            </div>
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
            <div class="icon">

              <rect class="st0" width="24" height="24" />
            </div>

          </div>
          <button className="button" type="submit" >Log in</button>
          <NavLink
            exact
            activeClassName="menu_active"
            className="nav-link"
            to="/signin"
          >
            SignIn
        </NavLink>
        <button className="button" onClick={() => window.location = "/forget_password"}>
          Forget Password
        </button>
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