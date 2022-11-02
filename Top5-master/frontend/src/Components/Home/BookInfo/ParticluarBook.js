import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from "react-router-dom";
import "./card.css";
import { Roller } from 'react-spinners-css';
// import StarRatings from './react-star-ratings';
import ReactStars from "react-rating-stars-component";
import VideoPart from "./VideoPart";
// import React, { Component } from "react"
// import Disqus from "disqus-react"
// import Axios from "axios";

//using bit
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
// import Facebook from '@bit/joshk.react-spinners-css.facebook';
import "./popup.css";
// import Popup from './Popup';
import { useHistory } from "react-router-dom";
import Reviewbottom from "./Reviewbottom";
import { useSelector } from "react-redux";

// import { getRandomColor } from '@bit/joshk.jotils.get-random-color'
export default function ParticluarBook() {
    const top5 = useSelector(state => state.books);
    let history = useHistory();
    const { id } = useParams();
    // console.log(id);
    const [user, setUser] = useState({})
    // const [book , setBook] = useState([]);
    const [loding, isLoding] = useState(false);
    const [comment, setComment] = useState("");
    const [category, setCategory] = useState([]);
    const [firstCategoy , setFirstCategory] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [rate, setRate] = useState(1);
    const [data, setData] = useState({
        image: "",
        description: "",
        publisher: "",
        auther: "",
        title: "",
        pages: "",
        rating: "",
        subtitle: "",
        category: "",
        rating: 1
    })

    // const disqusShortname = "top5"
    // const disqusConfig = {
    //     url: "http://localhost:3000/" + id,
    //     identifier: id,
    //     title: "something shit"
    // }


    const [isOpen, setIsOpen] = useState(false);

    // const togglePopup = () => {
    //     setIsOpen(!isOpen);
    // }



    const fetchData = () => {
        isLoding(true)
        let token = sessionStorage.getItem("Token");
        if (token) {
            let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
            setCategory(userInfo.category);
        } else {
            setRedirect(true);
        }
        let ISBN = "";
        
        fetch('https://www.googleapis.com/books/v1/volumes/' + id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(fetchedata => {
                console.log(fetchedata)
            //    ISBN = fetchedata.volumeInfo.industryIdentifiers[0].identifier;
                let imagefind = "https://source.unsplash.com/user/erondu/400x300";
                if (fetchedata.volumeInfo.imageLinks !== undefined) {
                    imagefind = fetchedata.volumeInfo.imageLinks['thumbnail'];
                    
                    // imagefind = imagefind.replace("zoom=1" , "zoom=0")
                }
                // fetch('https://api.nytimes.com/svc/books/v3/lists/current/personal-finance.json?api-key=GjmApHcKMGDHHB4IAGymihCBZx2s1cIJ', {    method: 'get',  })  .then(response => { return response.json(); })  .then(json => { console.log(json); });
                // console.log(imagefind)
                // if (fetchedata.accessInfo !== undefined) {
                //     if (fetchedata.accessInfo.pdf.isAvailable) {
                //         let url = fetchedata.accessInfo.pdf.acsTokenLink;
                //     }
                // }
                let rateByGoogle = 4.5;
                if(fetchedata.volumeInfo.averageRating){
                    rateByGoogle = fetchedata.volumeInfo.averageRating;
                }
                setData({
                    ...data,
                    image: imagefind,
                    description: fetchedata.volumeInfo.description,
                    publisher: fetchedata.volumeInfo.publisher,
                    auther: fetchedata.volumeInfo.authors,
                    title: fetchedata.volumeInfo.title,
                    pages: fetchedata.volumeInfo.pageCount,
                    subtitle: fetchedata.volumeInfo.subtitle,
                    category: fetchedata.volumeInfo.categories,
                    rating: rateByGoogle
                })
                // console.log(data.title)
                isLoding(false)
            })
            .catch(err => console.log(err));
            
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        let token = sessionStorage.getItem("Token");
        if (token) {
            let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
            if (userInfo && userInfo.length !== 0) {
                setUser(userInfo)
            } else {
                let arr = {};
                setUser(arr)
            }
            // console.log(userInfo)

            // let topInfo = JSON.parse(localStorage.getItem("topInfo"));
            // if(topInfo && topInfo !== null && topInfo !== undefined && topInfo.length !== 0){
            //     setBook(topInfo);
            // }
        }
        fetch('https://www.googleapis.com/books/v1/volumes?q=business+subject:coding', {    method: 'get',  })  .then(response => { return response.json(); })  .then(json => { console.log(json); });
        


    }, [])

    const FindAns = () => {
        console.log(category);
        console.log(data.category)
        let cate = []
        data.category.forEach(element => {
            cate += element.split(" / ");
        });
        let intersection = category.filter(x => cate.includes(x));
        if(intersection.length > 0){
            if (top5.length !== 0) {
               
                    let check = top5.includes(id);
                    if (check) {
                        toast.warning('You have that book in your List', {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    } else {
                        setFirstCategory(intersection[0])
                        setIsOpen(true);
                    }
    
               
            }
            else {
                setFirstCategory(intersection[0])
                setIsOpen(true);
            }
        }
        else{
            toast.warning('This book is not in your category!', {
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

    const ratingChanged = (newRating) => {
        setRate(newRating);
    };

    const inputData = (event) => {
        setComment(event.target.value)
    }

    const SubmitReview = (e) => {
        e.preventDefault();
        if (comment.length === 0) {
            toast.warning('Please Write your review!', {
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
            // setIsOpen(false);
            console.log(user._id);
            const update = {
                Review: comment,
                Rating: rate,
                BookId: id,
                UserId: user._id,
                Category : firstCategoy
            }
            // console.log(update);
            fetch('http://localhost:8000/comment/comment', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(update)
            }).then(res => res.json())
                .then(res => {
                    // console.log(res);

                    toast.success('Added successfully', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    // window.location = "/input"
                    //  let bookInsert = [...book , id];
                    // localStorage.setItem("topInfo" , JSON.stringify(bookInsert));
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                })
                .catch(err => console.log(err));
        }
    }
    return (
        <>
            <Navbar />
            {redirect && <Redirect to="/login" />}
            {!loding && <section class="mt-2 mb-1">

                <div class="row">
                    <div class="col-md-3 mb-4 mb-md-0">

                        <div id="mdb-lightbox-ui"></div>

                        <div className="div__change mx-4">
                            <img className="image__position" src={data.image} alt="nothing is there" style={{ draggable: "false" }} />
                        </div>
                        <div class="mdb-lightbox">

                            <div class="row product-gallery mx-1">


                            </div>

                        </div>

                    </div>
                    <div class="col-md-8">
                        <div className="mr-4">
                            <h1>{data.title}</h1>
                            <h3 className="text-muted text-uppercase ">{data.subtitle}</h3>
                            <h5 className="text-muted text-uppercase mb-4">{data.auther}</h5>
                            <h5><sapn className="font-weight-bold">Category:</sapn> {data.category}</h5>
                            <hr />
                            <div className="d-flex justify-content-between" >
                                <h5>Pages: {data.pages}</h5>
                                <div className="row">
                                <p className="rating__p">Google Book Rating:</p>
                                <ReactStars
                                    value={data.rating}
                                    size={24}
                                    isHalf={true}
                                    edit={false}
                                    emptyIcon={<i className="far fa-star"></i>}
                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                    fullIcon={<i className="fa fa-star"></i>}
                                    activeColor="#ffd700"
                                />
                                </div>
                            </div>
                            <h6 className="text-danger">Publisher: {data.publisher}</h6>
                            <div dangerouslySetInnerHTML={{ __html: `<div>${data.description}</div>` }} />

                            <hr />
                            <div className="row">
                                <button data-toggle="modal" data-target="#exampleModalCenter" onClick={() => { FindAns() }} type="button" class="btn btn-light btn-md mr-1 mb-2"><i
                                    class="fa fa-shopping-cart pr-2"></i>Add to Top 5</button>
                                <div><button class="btn btn-info btn-md ml-3 mr-1 mb-2" onClick={() => history.goBack()}>Go Back</button></div>
                            </div>
                            {/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                                        Launch demo modal
                                    </button> */}
                            {
                                isOpen &&
                                <div>
                                    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLongTitle">FeedBack</h5>

                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <form onSubmit={SubmitReview}>
                                                    <div class="modal-body">
                                                        <h4>Rating</h4>
                                                        <ReactStars
                                                            count={5}
                                                            onChange={ratingChanged}
                                                            size={24}
                                                            isHalf={true}
                                                            emptyIcon={<i className="far fa-star"></i>}
                                                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                            fullIcon={<i className="fa fa-star"></i>}
                                                            activeColor="#ffd700"
                                                        />,
                                                        <textarea type="text"
                                                            placeholder="your review on this book!"
                                                            name="comment"
                                                            value={comment}
                                                            onChange={inputData}
                                                            rows={7}
                                                            style={{ width: "100%", height: "100%" }}
                                                        />
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button onClick={() => { setIsOpen(false) }} type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                        <button type="submit" class="btn btn-primary">Submit</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }

                        </div>
                    </div>
                </div>
            <VideoPart videoTitle={data.title} />
            </section>
            }
            {loding && <div className="align-items-center justify-content-center ml-lg-5">
                <Roller className="change__loading" color="#be97e8" size={200} />
            </div>}

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
            <hr />
            <h2> All reviews</h2>
            <Reviewbottom bookId={id} />
        </>
    )
}





