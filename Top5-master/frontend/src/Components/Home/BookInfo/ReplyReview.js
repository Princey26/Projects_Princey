import Image from "../../Images/defaultUser.png";
export default function ReplyReview(props) {
    return (
        <>
            <div class="col-md-12">
                <div class="p-3 bg-white rounded mr-5 ml-lg-5">
                    <div class="review">
                        <div class="d-flex flex-row comment-user">
                        <img class="rounded" src={props.value.UserId.image && props.value.UserId.image.length !== 0 ? "http://localhost:8000/images/" + props.value.UserId.image : Image} width="50" alt="something new" />
                            <div class="ml-2">
                                <div class="d-flex flex-row "><span class="name font-weight-bold">{props.value.UserId.username}</span><span class="dot"></span></div>
                                <div class="mt-2">
                                    <p class="comment-text">{props.value.Review}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}