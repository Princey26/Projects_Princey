import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";


export default function HomeBooks(props){

    // const [rate, setRate] = useState(1);
    const [redirect, setRedirect] = useState(false);
    const [data, setData] = useState({
        image: "",
        description: "",
        publisher: "",
        auther: "",
        title: "",
        pages: "",
        rating: "",
        subtitle: ""
    })
    
    let href = "/particular/" + props.commentAll.BookId;
    useEffect(() => {
        let token = sessionStorage.getItem("Token");
        if(token){
            setRedirect(true);
        }
        let identity = props.commentAll.BookId;
        fetch('https://www.googleapis.com/books/v1/volumes/' + identity, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(fetchedata => {
                
                let imagefind = "https://source.unsplash.com/user/erondu/400x300";
                if (fetchedata.volumeInfo.imageLinks !== undefined) {
                    imagefind = fetchedata.volumeInfo.imageLinks['thumbnail'];
                }
                // console.log(fetchedata.volumeInfo.mainCategory)
                if (fetchedata.accessInfo !== undefined) {
                    if (fetchedata.accessInfo.pdf.isAvailable) {
                        let url = fetchedata.accessInfo.pdf.acsTokenLink;
                    }
                }

                setData({
                    ...data,
                    image: imagefind,
                    description: fetchedata.volumeInfo.description,
                    publisher: fetchedata.volumeInfo.publisher,
                    auther: fetchedata.volumeInfo.authors,
                    title: fetchedata.volumeInfo.title,
                    pages: fetchedata.volumeInfo.pageCount,
                    subtitle: fetchedata.volumeInfo.subtitle
                })
               
            })
            .catch(err => console.log(err));
    }, [])

    const UserHandle = () =>{
        if(redirect){
            window.location = href;
        }
        else{
            toast.warning('Please Login First', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return(
        <>
        <div className="div_change col-sm-2 col-10 mx-auto my-2" >
        
        <div onClick={UserHandle}  class="card 1" >
          <div class="card_image"> <img  src={
                data.image === undefined ? "https://source.unsplash.com/user/erondu/400x300" : data.image
            } alt="" /> </div>
          <div class="card_title title-white">
          
          </div>
        </div>
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
    )
}