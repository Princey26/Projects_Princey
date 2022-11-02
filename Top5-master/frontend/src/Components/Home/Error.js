import ErrorPage from "../Images/Error.png";
import Navbar from "../Navbar/Navbar";
export default function Error() {
    return (
        <>
            <Navbar />
            <div className="container-fluid mb-5">
                <div className="row">
                    <div className="clo-10 mx-auto">
                        <div className="row">
                            <div className="col-10 mx-auto">
                                <div className="row gy-4">
                                    <img src={ErrorPage} alt="Nothing is here" className="center-block image__error align-items-end justify-content-center" style={{ marginLeft: "400px !important" }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}