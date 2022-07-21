import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GoogleLogoutComponent from './GoogleLogoutComponent';
import LoginForm from './Authentication/LoginForm';
import RegisterForm from './Authentication/RegisterForm';
import MyModal from './UI/MyModal/MyModal';
import { Dropdown } from 'react-bootstrap';
import defaultImage from "../images/default.png";

function Navigation(props) {
    const [modalRegister, setModalRegister] = useState(false)
    const [modalLogin, setModalLogin] = useState(false)
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
    function logoutGmail(logoutUser) {
        props.setName(logoutUser)
    }
    let menu;

    if (props.userName === undefined) {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li>
                    <button type="button" className="btn btn-outline-light me-2" onClick={() => setModalLogin(true)}>Login</button>
                    <MyModal visible={modalLogin} setVisible={setModalLogin}>
                        <LoginForm setName={props.setName} />
                    </MyModal>
                </li>
                <li>
                    <button type="button" className="btn btn-warning" onClick={() => setModalRegister(true)}>Sign-up</button>
                    <MyModal visible={modalRegister} setVisible={setModalRegister}>
                        <RegisterForm setName={props.setName}/>
                    </MyModal>
                </li>
            </ul>
        )
    }
    else {
        menu = (
            <div>
                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                    <li>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {props.userName}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                <li className="nav-item">
                    <Link to="/" className="nav-link active" onClick={logout}>Logout</Link>
                </li>
                </ul>
            </div>
        )
    }

    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container-fluid">
                    <div className="d-flex">
                        <Link to="/" className="navbar-brand"  style={{ fontFamily: "cursive" }}>Medium</Link>
                        {props.userName === undefined
                        ?
                            <div>
                                <div><Link to="/" style={{ fontFamily: "cursive" }} className="navbar-brand" onClick={() => setModalRegister(true)}>Add new article</Link></div>
                                <MyModal visible={modalRegister} setVisible={setModalRegister}>
                                    <RegisterForm setName={props.setName} setModal={setModalRegister} />
                                </MyModal>
                            </div>
                        :
                        <Link to="/create" className="navbar-brand"  style={{ fontFamily: "cursive" }}>Add new article</Link>
                        }
                    </div>
                    <div>
                        {menu}
                    </div>
                </div>
            </nav>
        </div>
    );

}

export default Navigation;