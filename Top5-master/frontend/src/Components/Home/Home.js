import Navbar from "../Navbar/Navbar";
import { DiscussionEmbed } from 'disqus-react';
import { NavLink } from "react-router-dom";
import "./home.css";
import Img from "../Images/homeimage.png"
import HomeTop5 from "./HomeTop5";
import { useEffect, useState } from "react";


export default function Home() {

  const [user, setUser] = useState(false);
  const [href, setHref] = useState("/login");

  useEffect(() => {
    let token = sessionStorage.getItem("Token");
    if (token) {
      setHref("/input");
      setUser(true);
    }
  }, [])
  return (
    <>

      <div className="home_background new__image">
        <Navbar />
        <section id="header" className="d-flex align-item-center">
          <div className="container-fluid nav-bg">
            <div className="row">
              <div className="clo-10 mx-auto">
                <div className="row">
                  <div className="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex justify-content-center flex-column">
                    <h1>
                      Learn with
                      <strong className="brand-name"> Top5 </strong>
                    </h1>
                    <h2 className="my-3">
                      We are team a Community of Readers
                    </h2>
                    <div className="mt-3">
                      <NavLink to={href} className="btn-get-started">
                        {user ? "Books" : "SignIn"}
                      </NavLink>
                    </div>
                  </div>
                  <div className="col-lg-6 order-1 order-lg-2 header-img">
                    <img
                      src={Img}
                      className="img-fluid animated image__size"
                      alt="Common img"
                    />
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <HomeTop5 />
    </>

  )
}