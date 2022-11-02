import { useState, useEffect } from "react";
// import { NavLink, Redirect } from "react-router-dom";
import ParticlurReview from "./ParticlurReview";

export default function Reviewbottom(props) {
    const [comment, setComment] = useState([]);
    const [userId , setUserId] = useState("");

    useEffect(() => {
        fetch("http://localhost:8000/comment/comment_book/" + props.bookId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(fetchdata => fetchdata.json())
            .then(fecthnow => {
                // console.log(fecthnow)
                setComment(fecthnow);
            }).catch(err => console.log(err))
        const userData = JSON.parse(sessionStorage.getItem("userInfo"));
        // console.log(userData._id)
        setUserId(userData._id);

    }, [])
    return (
        <>
            <h5>Total reviews [{comment.length}]</h5>
            <div className="">
                {comment && comment.length !== 0 && (
                    comment.map((value, index) => {
                        return (
                            <div className="row">
                            <ParticlurReview
                                key = {value._id}
                                index = {value._id}
                                value = {value}
                                userId = {userId}
                            // img={img2}
                            />
                            </div>
                        )
                    })
                )
                }
            </div>
        </>
    )
}