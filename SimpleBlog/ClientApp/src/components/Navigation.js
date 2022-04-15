import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Navigation(props) {
    async function logout() {
        const response = await fetch('https://localhost:44377/api/user/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        const data = await response.json();
        console.log(data.message);
        props.setName(undefined);
        sessionStorage.removeItem("access_token");
    }

    let menu;

    if (props.userName === undefined) {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li>
                    <Link to="/login" className="nav-link active">
                        <button type="button" className="btn btn-outline-light me-2">Login</button>
                    </Link>
                </li>
                <li>
                    <Link to="/register" className="nav-link active">
                        <button type="button" className="btn btn-warning">Sign-up</button>
                    </Link>
                </li>
            </ul>
        )
    }
    else {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li>
                    <div style={{ border: "solid 1px white", borderRadius: "5px", color: "#88e64e", marginTop: "6px", marginRight: "10px", padding: "3px" }}>{props.userName}</div>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link active" onClick={logout}>Logout</Link>
                </li>
            </ul>
        )
    }

    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand" href="#" style={{ fontFamily: "cursive" }}>Medium</Link>
                    <div>
                        {menu}
                    </div>
                </div>
            </nav>
        </div>
    );

}

export default Navigation;