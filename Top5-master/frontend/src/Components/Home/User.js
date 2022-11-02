import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
// import "./User.css";
// import "./UserFile.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactStars from "react-rating-stars-component";
import { useSelector, useDispatch } from "react-redux";

import ShowBook from "./User/ShowBook";
import UserTop from "./User/UserTop";
import { counterAction } from "../../store/index";

export default function User() {
    const [redirect, setRedirect] = useState(false);
    const [data, Setdata] = useState({

    });

    const dispatch = useDispatch();

    const Review_particluar = useSelector(state => state.particluarIndex);
    const rate = useSelector(state => state.particluarRating);
    const bookId = useSelector(state => state.particluarBook)
    const ID = useSelector(state => state.commentId)


    console.log(bookId + " please check");

    const [top5, setTop5] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [iden, setIden] = useState(null);

    const [selectedFile, setSelectedFile] = useState(null);

    const fileChangedHandler = event => {
        setSelectedFile({ selectedFile: event.target.files[0] })
    }
    const [comment, setComment] = useState([]);
    const [idreview, setIdreview] = useState("");
    const [idRating, setIdRating] = useState(1);
    const [Category, setCategory] = useState([]);
    const [handleSplit, setHandleSplit] = useState({});




    useEffect(() => {
        let token = sessionStorage.getItem("Token");
        let id;
        let userInfo;
        if (token) {
            userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
            id = userInfo._id;
            Setdata(userInfo)
            setCategory(userInfo.category)


            // userInfo.category.forEach(element => {
            //     setHandleSplit((val) => {
            //         return {
            //             ...val,
            //             [element] : []
            //         }
            //     })
            // });



        } else {
            setRedirect(true);
        }

        console.log(data)
        fetch("http://localhost:8000/comment/comment/" + id, {
            method: 'GET',
            _headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(fetchdata => fetchdata.json())
            .then(fecthnow => {

                setComment(fecthnow);
                let arr = []

                let comment_object = {};
                userInfo.category.forEach(element => {
                    comment_object[element] = [];
                });
                fecthnow.forEach(element => {
                    if (userInfo.category.includes(element.Category)) {
                        arr.push(element.BookId);
                        // console.log(element.Category);
                        let temp = [...comment_object[element.Category], element]
                        comment_object[element.Category] = temp;
                    }

                    // setHandleSplit((repval) =>{
                    //     return {
                    //         ...repval,
                    //         [element.category] : [temp]
                    //     }

                    // })

                });
                // console.log(comment_object);
                setHandleSplit(comment_object);
                console.log(handleSplit)

                dispatch(counterAction.bookscheck(arr));

            }).catch(err => console.log(err))
    }, [])


    const popUpRemvoe = (bol, identity) => {

        setIden(identity)

        if (comment[iden] != undefined && comment[iden] != null) {
            setIdRating(comment[iden].Rating)
            setIdreview(comment[iden].Review)
        }
        setIsOpen(bol);
    }

    const SubmitDetail = () => {

    }
    const SubmitReview = (e) => {
        e.preventDefault();
        if (Review_particluar.length === 0) {
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

            console.log(bookId)
            const update = {
                Review: Review_particluar,
                Rating: rate,
                BookId: bookId,
                UserId: data._id,
                category: data.category
            }

            fetch('http://localhost:8000/comment/comment/' + ID, {
                method: 'PUT',
                _headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(update)
            }).then(res => res.json())
                .then(res => {


                    toast.success('Added successfully', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                    window.location.reload();
                })
                .catch(err => console.log(err));
        }

    }
    const InputData = (e) => {

        dispatch(counterAction.reviewcheck(e.target.value))

    }

    const RatingChanged = (newRating) => {

        dispatch(counterAction.ratingcheck(newRating));

    };
    return (
        <>
            <Navbar />
            {redirect && <Redirect to="/login" />}
            <UserTop />
            <hr />
            {console.log(Category)}
            {Category !== undefined && Category.length !== 0 && (Category.map((value, index) => {
                return (
                    <div>
                        {(handleSplit[value] !== undefined && handleSplit[value].length !== 0) ? <h3 className="_text-center">Your Top books in {value}</h3> : null}
                        <div className="_container-fluid _mb-5">
                            <div className="_row">
                                <div className="clo-10 mx-auto">
                                    
                                            <div className="_row gy-4">

                                                {console.log(handleSplit[value])}
                                                {handleSplit[value] !== undefined && handleSplit[value].length !== 0 && (handleSplit[value].map((val, ind) => {
                                                    { console.log(val) }
                                                    return (
                                                        <ShowBook
                                                            key={ind}
                                                            indenity={ind}
                                                            commentAll={val}
                                                            HandleRemove={popUpRemvoe}
                                                        />
                                                    )

                                                }))}
                                            </div>
                                        </div>
                                    </div>
                                
                        </div>
                    </div>)
            }))}


            




            {
                (comment === undefined || comment === null) &&
                <div>Nothing to get</div>
            }
            {isOpen && comment !== undefined && comment.length !== 0 &&
                (
                    <div>
                        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="modal-_header">
                                        <h5 class="modal-title" id="exampleModalLongTitle">FeedBack</h5>
                                        {console.log("something found")}
                                        <button onClick={() => { setIsOpen(false) }} type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <form onSubmit={SubmitReview}>
                                        <div class="modal-body">
                                            <h4>Rating</h4>
                                            <ReactStars
                                                count={5}
                                                onChange={RatingChanged}
                                                value={rate}
                                                size={24}
                                                isHalf={true}
                                                emptyIcon={<i className="far fa-star"></i>}
                                                halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                fullIcon={<i className="fa fa-star"></i>}
                                                activeColor="#ffd700"
                                            />
                                            <h4>Your review</h4>
                                            <textarea type="text"
                                                placeholder="your review on this book!"
                                                name="comment"
                                                value={Review_particluar}
                                                onChange={InputData}
                                                _rows={7}
                                                style={{ width: "100%", height: "100%" }}
                                            />
                                        </div>

                                        <div class="modal-footer">
                                            <button onClick={() => { setIsOpen(false) }} type="button" class="_btn _btn-secondary" data-dismiss="modal">Close</button>
                                            <button onClick={() => SubmitDetail()} type="submit" class="_btn _btn-primary">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
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