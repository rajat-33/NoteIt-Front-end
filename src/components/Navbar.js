import React, {useEffect} from 'react'
import {Link, useLocation} from "react-router-dom"


export const Navbar = () => {
    let location = useLocation(); //using useLocation to access the current location 
    useEffect(() => {
    }, [location]);
    return (
        <nav className="navbar navbar-expand-lg bg-white">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">NoteIt</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        {/* using current location to active(bold) when current path is / */}
                            <Link className={`nav-link ${location.pathname==="/"}? "active": "" `}  aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                        {/* using current location to active(bold) when current path is /about*/}
                            <Link className={`nav-link ${location.pathname==="/about"}? "active": "" `} to="/about">About</Link>
                        </li>

                    </ul>
                    <form className="d-flex" role="search">
                    <Link className="btn btn-primary mx-1" to="/login">Login</Link>
                    <Link className="btn btn-primary mx-1" to="/signup">Signup</Link>
                    </form>
                </div>
            </div>
        </nav>
    )
}