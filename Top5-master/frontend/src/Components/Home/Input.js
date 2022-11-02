import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import BookCard from "./BookInfo/BookCard";
import Books from "./Category/Category";
import { upperBook } from "./Category/Category";
import Button from '@material-ui/core/Button';
import Search from "./Search/Search";
import { Redirect } from "react-router-dom";
import { Roller } from 'react-spinners-css';
import "./BookInfo/card.css";
import Img1 from "../Images/void.png";
import CategoryButton from "./Category/CategoryButton";
import { TinyButton as ScrollUpButton } from "react-scroll-up-button";
import { useSelector, useDispatch } from "react-redux";
import { counterAction } from "../../store";

import Pagination from "./Pagination/Pagiation";

export default function Input() {
    const dispatch = useDispatch();
    const data = useSelector(state => state.data)


    const [redirect, setRedirect] = useState(false);
    const [changeCat, setChangeCat] = useState("history");
    const [loading, isLoding] = useState(false);
    const [stateindex, setStateindex] = useState(-1);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(9);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        let token = sessionStorage.getItem("Token");
        let id;
        if (token) {


        } else {
            setRedirect(true);
        }
        if (!data.length) {
            isLoding(true);

            fetch('https://www.googleapis.com/books/v1/volumes?q=' + changeCat + '&maxResults=39', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(fetchedata => {

                    dispatch(counterAction.datacheck(fetchedata.items))
                    isLoding(false);
                })
                .catch(err => console.log(err));
        }


    }, [])

    const changeState = (value, key) => {
        // setIsOpen(false);
        setStateindex(key);

        isLoding(true)
        fetch('https://www.googleapis.com/books/v1/volumes?q=' + value + "&maxResults=39", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            .then(dat => {
                console.log(dat)
                setChangeCat(value)

                dispatch(counterAction.datacheck(dat.items))
                isLoding(false);
            }).catch(err => console.log(err))
    }

    const searchQuery = (input) => {
        isLoding(true)
        changeState(input);
    }

    const onClickEvent = () => {
        setIsOpen(true);
    }
    const SubmitReview = () => {

    }

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const last = Books.length;

    return (
        <>
            <Navbar />
            <Search handleSearch={searchQuery} />
            {redirect && <Redirect to="/login" />}
            <h3 className="text-center my-2">Select Your Category </h3>
            <ScrollUpButton />
            <div className="container-fluid mb-5">
                <div className="row">
                    <div className="clo-10 mx-auto">
                        <div className="row">
                            <div className="col-10 mx-auto">

                                {!loading &&
                                    <div className="row">
                                        <div className="col-md-2 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column">

                                            <div className="left-part" style={{ textAlign: "center" }}>
                                                <h4 style={{ justifyContent: "center", paddingLeft: "20px", textAlign: "center" }}>Category </h4>
                                                <hr />
                                                <div>

                                                    <ul>
                                                        {Books.map((value, index) => {
                                                            return (
                                                                <CategoryButton key={index} curIndex={index} value={value} colorIndex={index === stateindex} handleButton={changeState} />
                                                            )

                                                        })}
                                                    </ul>
                                                    <ul>
                                                        <Button data-toggle="modal" data-target="#exampleModalCenter" onClick={() => { onClickEvent() }} type="submit" className={"my-2 button__swith"} style={{ width: "200px" }} >
                                                            More..
                                                        </Button>
                                                    </ul>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-lg-10 order-1 order-lg-2 header-img">

                                            <div className="row">
                                                {console.log(currentPosts)}
                                                {currentPosts !== undefined && currentPosts.length !== 0 && (
                                                    currentPosts.map((value) => {
                                                        if (value.volumeInfo.categories !== undefined) {
                                                            return (
                                                                <BookCard
                                                                    id={value.id}
                                                                    productInfo={value}
                                                                />
                                                            )

                                                        }
                                                        else {
                                                            console.log("fuc me")
                                                        }

                                                    })

                                                )}

                                                {
                                                    data === undefined && <div className="void__div">
                                                        <img className="void__image" src={Img1} alt="Fun with image" />
                                                        <h6 className="void__text">Nothing found please check your queury!</h6>
                                                    </div>
                                                }

                                            </div>

                                        </div>
                                    </div>

                                }

                                {loading && <div className="align-items-center justify-content-center ml-lg-5">
                                    <Roller className="change__loading__input" color="#be97e8" size={200} />
                                </div>}
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
                                                    <div class="modal-body">
                                                        <ul>
                                                            {upperBook.map((value, index) => {
                                                                return (
                                                                    <Button onClick={() => { changeState(value, last) }} type="submit" className={"my-2 button__swith"} style={{ width: "200px" }} >
                                                                        {value}
                                                                    </Button>
                                                                )

                                                            })}
                                                        </ul>

                                                    </div>
                                                    <div class="modal-footer">
                                                        <button onClick={() => { setIsOpen(false) }} type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }



                            </div>
                        </div>

                    </div>
                    {
                        !loading &&
                        < Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={data.length}
                        paginate={paginate}
                        className="ml-5"
                    />
                    }
                    
                </div>

            </div>

        </>
    )
}