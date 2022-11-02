import { useState } from "react";

import Navbar from "../Navbar/Navbar";
import "./Login.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PasswordForm from "./PasswordForm";


export default function ForgetPassword(){
    const [data , setData] = useState("");
    const [flag , setFlag] = useState(true);

    const HandleSubmit = (e) =>{
        e.preventDefault();
        if(data == ""){
            toast.warning('please write Email', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            return;
        }
        fetch('http://localhost:8000/forget/email-send' , {
            method : 'POST',
            headers : {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({email : data})
        }).then(dataSend => {
            // console.log(dataSend)
            if(dataSend.status === 500){
                toast.error('Email not Found !', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
            } else{
                toast.success('🦄 email Sent !', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                  setFlag(false)
            }
            
            
        }).catch(err => console.log(err))
    }
    const InputData = (e) =>{
        setData(e.target.value)
    }
    return(
        <>
            <Navbar />
            {flag ?  <form onSubmit={HandleSubmit} className="col">
                <input type="email"
                value={data}
                onChange={InputData}
                 placeholder="email"/> 
                <button className="button" type="submit">submit</button>
            </form>
            : <PasswordForm />
            }
            
            <button className="button" onClick={()=> window.location = "/login"}>Back</button>
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
    )
}