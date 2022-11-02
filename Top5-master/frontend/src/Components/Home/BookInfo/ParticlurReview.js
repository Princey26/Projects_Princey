import ReactStars from "react-rating-stars-component";
import "./ParticlurReview.css";
import { useState, useEffect } from "react";
import Image from "../../Images/defaultUser.png";
// import reply from "../../../../../backend/models/Reply";
import ReplyReview from "./ReplyReview";

export default function ParticlurReview(props) {
    // console.log(props.value.UserId.image)
    // console.log(props.userId)
    const [showBox, setShowbox] = useState(false);
    const [comment, setComment] = useState("");
    const [reply , Allreply] = useState([]);


    useEffect(() => {
        fetch('http://localhost:8000/reply/reply_comment/' + props.index, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then(res => res.json())
            .then(res => {
                console.log(res)
                Allreply(res)
            })
            .catch(err => console.log(err))

    }, [])

    const inputData = (e) => {
        setComment(e.target.value);
    }

    const SubmitReview = (e) => {
        e.preventDefault();
        const Add = {
            CommentId : props.index,
            userId : props.userId,
            Review : comment
        }
        setComment("");
        fetch('http://localhost:8000/reply/reply', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Add)
            }).then(res => res.json())
            .then(res =>{
                window.location.reload();
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <div class="">
                <div class=" row">
                    <div class="col-md-12">
                        <div class="p-3 bg-white rounded mr-5 ml-lg-5">
                            <div class="review">
                                <div class="d-flex flex-row comment-user">
                                <img class="rounded" src={props.value.UserId.image && props.value.UserId.image.length !== 0 ? "http://localhost:8000/images/" + props.value.UserId.image : Image} width="50" alt="something new" />
                                    <div class="ml-2">
                                        <div class="d-flex flex-row "><span class="name font-weight-bold">{props.value.UserId.username}</span><span class="dot"></span></div>
                                        <div class="rating">
                                            <ReactStars
                                                value={props.value.Rating}
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
                                <div class="mt-2">
                                    <p class="comment-text">{props.value.Review}</p>
                                </div>
                                <form onSubmit={SubmitReview}>
                                <div className="">
                                    <input
                                        placeholder="your reply"
                                        name="comment"
                                        value={comment}
                                        onChange={inputData}
                                        autocomplete="off"
                                    />
                                    <button type="submit">reply</button>
                                    like
                                </div>
                                </form>
                                <div>
                                    {
                                        reply && reply.length !== 0 && (
                                            reply.map((value , index) =>{
                                                return (
                                                    <ReplyReview 
                                                        key = {value._id}
                                                        value = {value}
                                                    />
                                                )
                                            })
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}