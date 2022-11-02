import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { useSelector  , useDispatch} from "react-redux";
import { counterAction } from "../../../store";
export default function ShowBook(props) {
    const top5 =  useSelector(state => state.books)
    const dispatch = useDispatch();
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
    const [rate, setRate] = useState(1);
    
    let href = "/particular/" + props.commentAll.BookId;
    useEffect(() => {
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
                // console.log(fetchedata)
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
    const ratingChanged = (newRating) => {
        setRate(newRating);
    };
    const removeBook = () => {
        
        props.HandleRemove(true , props.indenity)
       
        dispatch(counterAction.reviewcheck(props.commentAll.Review))
        dispatch(counterAction.ratingcheck(props.commentAll.Rating))
        dispatch(counterAction.bookIdcheck(props.commentAll.BookId))
        dispatch(counterAction.commentcheck(props.commentAll._id))
    }
    
    const togglePopup = () => {
        // setIsOpen(!isOpen);
        props.HandleRemove()
    }
    const DeleteEvent = () =>{
        fetch('http://localhost:8000/comment/comment/' + props.commentAll._id, {
            method: 'DELETE',
        })
            .then(res => res.text()) 
            .then(text =>{
                let filtered = top5.filter(function(value, index){ 
                    return value !== props.id;
                });
               
                dispatch(counterAction.bookscheck(filtered))
                window.location.reload();
            } )
            .catch(err => console.log(err))
    }
    return (
        <>
            <div className="col-md-2 col-10 mx-auto my-2" >
                <div className="card-img"  >
                    <div class="image card__image-container">
                        <img className="mr-5 card__image" src={
                            data.image
                        } alt="" />
                    </div>
                    <div class="card__content">
                        <h3 class="card__title">{data.title.substring(0, 12) + "..."}</h3>
                    
                        <p className="card-text">
                            {data.auther}
                        </p>

                        <div className="row div_button">
                            <NavLink to={href} className="mr-3 btn btn-outline-info navlink">
                                Info
                            </NavLink>


                            <button onClick={() => removeBook()} className="btn btn-outline-info navlink ml-4">
                                Add
                            </button>
                        </div>
                        <hr className="ml-0 center" />
                        <div className="row div__button my-2">
                            <button data-toggle="modal" data-target="#exampleModalCenter" onClick={() => removeBook()} className="mr-3 btn-light navlink pr-1">
                                Update
                            </button>
                            <button onClick={()=> DeleteEvent()} className="ml-4 btn btn-danger navlink">
                                Remove
                            </button>
                        </div>
                        <br />
                        <div className="row">
                            <p>
                                {props.commentAll.Review}
                            </p>
                        </div>
                        
                        <div>
                            <ReactStars
                                
                                value={props.commentAll.Rating}
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
                </div>
            </div>
            
        </>
    )
}