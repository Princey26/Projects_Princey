import React from "react";
import { NavLink } from "react-router-dom";
// import Fun from "./ExtraLink";

export default function Navbar() {

  const Fun = () => {
    if (sessionStorage.getItem('Token') && sessionStorage.getItem('Token') !== undefined) {
        let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        if (userInfo !== null) {
            return (
              <>
                <li className="nav-item active">
                  <NavLink
                    exact
                    activeClassName="menu_active"
                    className="nav-link"
                    to="/user"
                  >
                  Profile
                  </NavLink>
                </li>
                <li className="nav-item active">
                  <NavLink
                    exact
                    activeClassName="menu_active"
                    className="nav-link"
                    to="/input"
                  >
                  Input
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    activeClassName="menu_active"
                    className="nav-link"
                    to="/logout"
                  >
                    Logout
                      </NavLink>
                </li>
              </>
            )
          } else{
              return(
                <>
                  <li className="nav-item">
                    <NavLink
                      exact
                      activeClassName="menu_active"
                      className="nav-link"
                      to="/login"
                    >
                      login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      exact
                      activeClassName="menu_active"
                      className="nav-link"
                      to="/signin"
                    >
                      Signin
                    </NavLink>
                  </li>
                </>
              )
          }
    }else{
      return(
        <>
          <li className="nav-item">
            <NavLink
              exact
              activeClassName="menu_active"
              className="nav-link"
              to="/login"
            >
              login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              activeClassName="menu_active"
              className="nav-link"
              to="/signin"
            >
              Signin
            </NavLink>
          </li>
        </>
      )
    }
}

  

  return (
    <>
      <div className="container-fluid nav_bg">
        <div className="row">
          <div className="col-10 mx-auto">
            <nav className="navbar transparent navbar-expand-lg ">
              <NavLink exact className="navbar-brand" to="/">
                Top 5
              </NavLink>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item active">
                    <NavLink
                      exact
                      activeClassName="menu_active"
                      className="nav-link"
                      to="/"
                    >
                      Home 
                    </NavLink>
                  </li>
                  
                  <Fun />
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
