import React, { useEffect, useState } from "react";
import "./Login.css";
import Img from "../Images/bookLogin.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../Navbar/Navbar";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Multiselect from 'multiselect-react-dropdown';
import option from "./Options";
import { Circle } from "react-spinners-css";

const Signin = () => {
    const [redirect, setRedirect] = useState(false);
    const [categorySelect, setCategorySelect] = useState([]);

    useEffect(() => {
        if (sessionStorage.getItem('Token')) {
            setRedirect(true);
        }
    })
    const [data, setData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        verifyPassword: "",
        email: ""
    })
    const eventInput = (event) => {
        const { name, value } = event.target;
        setData((preValue) => {
            return {
                ...preValue,
                [name]: value
            };
        })
    }
    const formSubmit = (e) => {
        e.preventDefault();
        if (categorySelect === undefined || categorySelect.length === 0) {
            toast.warning('please select category', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else {
            const registerd = {
                username: data.username,
                password: data.password,
                verifyPassword: data.verifyPassword,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                category: categorySelect
            }
            // console.log("hello");
            console.log(registerd);
            fetch('http://localhost:8000/api/signup', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerd),
                credentials: "same-origin"
            })
                .then(res => {
                    if (res.status !== 200) {
                        toast.error('Bad request please try again', {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                    else {
                        toast.success('registration done successfully', {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });

                        setTimeout(() => {
                            window.location = "/login";
                        }, 2000)
                    }
                }
                )
                .catch(err => console.log(err));

        }

    }

    // const onSelect = (selectedList, selectedItem) => {
    //     // console.log(selectedList)
    //     setCategorySelect(selectedList);
    // }

    // const onRemove = (selectedList, removedItem) => {
    //     console.log("sometyhing will be good")
    //     console.log(removedItem)
    //     setCategorySelect(selectedList);
    // }

    const selectedValue = [];
    const animatedComponents = makeAnimated();

    const ChangingVal = (value , val) => {
        console.log(value)
        let arr = []
        value.forEach(element => {
            arr.push(element.value)
        });
        console.log(arr)
        setCategorySelect(arr);
        // console.log(val)
    }
    return (
        <>
            <Navbar />
            <div class="session">
                <div class="left">
                    <img src={Img} alt="No image" />
                </div>
                <form className="form" onSubmit={formSubmit}>
                    <h4>We are <span>NUVA</span></h4>
                    <p>Welcome back! signin in to your account to view today's clients:</p>
                    <div class="floating-label">
                        <input
                            type="text"
                            placeholder="Enter firstname" name="firstName"
                            value={data.firstName}
                            className="input"
                            onChange={eventInput}
                            autocomplete="off" />
                        <label for="password">First Name:</label>
                    </div>
                    <div class="floating-label">
                        <input
                            type="text"
                            placeholder="Enter lastname" name="lastName"
                            value={data.lastName}
                            onChange={eventInput}
                            className="input"
                            autocomplete="off" />
                        <label for="password">Last Name:</label>
                    </div>
                    <div class="floating-label">
                        <input
                            type="text"
                            placeholder="Enter username" name="username"
                            value={data.username}
                            onChange={eventInput}
                            className="input"
                            autocomplete="off" />
                        <label for="username">UserName</label>
                    </div>
                    <div class="floating-label">
                        <input
                            type="email"
                            placeholder="Enter Email"
                            name="email"
                            className="input"
                            value={data.email}
                            onChange={eventInput}
                            autocomplete="off" />
                        <label for="email">Email:</label>
                    </div>
                    <div className="floating-label">
                        {/* <Multiselect
                            isObject={false}
                            options={option}
                            // closeIcon={Circle}
                            selectedValues={selectedValue} 
                            onSelect={onSelect}
                            onRemove={onRemove}
                            // selectionLimit= {5}
                            displayValue="name"
                            // placeholder = "Select Type you like"
                        /> */}
                        <Select
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            defaultValue={[]}
                            selectionLimit={6}
                            isMulti
                            options={option}
                            isObject = {false}
                            onChange={ChangingVal}
                        />
                    </div>
                    <div class="floating-label">
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={data.password}
                            onChange={eventInput}
                            className="input"
                            name="password"
                            autocomplete="off" />
                        <label for="password">Password:</label>
                    </div>
                    <div class="floating-label">
                        <input
                            type="password" placeholder="Enter Con password"
                            value={data.verifyPassword}
                            onChange={eventInput}
                            className="input"
                            name="verifyPassword"
                            autocomplete="off" />
                        <label for="password">Conform Password:</label>
                    </div>
                    <button className="button" type="submit">Sign in</button>
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

export default Signin;