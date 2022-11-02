import { useState, useEffect } from "react";

export default function VideoPart(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
        let val = props.videoTitle + "book review";
        fetch(
            "https://www.googleapis.com/youtube/v3/search?q=" +
            val +
            "&part=snippet&maxResults=5&key=AIzaSyC5trB7ouOy__tKhG0d9-Ip4SxdSf-4C0M",
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            }
        )
            .then((res) => res.json())
            .then((fetchedata) => {
                console.log(fetchedata);

                setData(fetchedata.items);

            })
            .catch((err) => console.log(err));
    }, [])

    return (
        <div className="container-fluid mb-5">
            <div className="clo-10 mx-auto">
                
                    <div className="row">
                        {data !== undefined &&
                            data.length !== 0 &&
                            data.map((item) => {
                                const { id, snippet = {} } = item;
                                const { title, thumbnails = {}, resourceId } = snippet;
                                const { medium = {} } = thumbnails;

                                return (
                                    <li key={id} className="card">
                                        <a target="_blank" href={`https://www.youtube.com/watch?v=${id.videoId}`}>
                                            <p>
                                                <img
                                                    width={medium.width}
                                                    height={medium.height}
                                                    src={medium.url}
                                                    alt="sometinth"
                                                />
                                            </p>
                                        </a>
                                        <h3>{title}</h3>
                                    </li>
                                );
                            })}
                    </div>
                </div>
           
        </div>


    );
}
