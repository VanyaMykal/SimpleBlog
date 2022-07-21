import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
function LoginForm(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const [emailEmpty, setEmailEmpty] = useState(false);
    const [passwordEmpty, setPasswordEmpty] = useState(false);

    const [emailError, setEmailError] = useState('Input your email');
    const [passwordError, setPasswordError] = useState('Input your password');

    const [formValid, setFormValid] = useState(false);

    useEffect(() => {

        if (emailError || passwordError) {
            setFormValid(false);
        }
        else {
            setFormValid(true);
        }
    }, [emailError, passwordError])


    const submit = async (event) => {
        event.preventDefault();

    };

    function userEmail(event) {
        setEmail(event.target.value);
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(event.target.value).toLowerCase())) {
            setEmailError('Invalid email');
        }
        else {
            setEmailError('');
        }
    }
    function userPassword(event) {
        setPassword(event.target.value);
        if (!event.target.value) {
            setPasswordError('Input your password');
        }
        setPasswordError('');
    }

    const blurHandler = (event) => {
        switch (event.target.name) {
            case 'email':
                setEmailEmpty(true);
                break;
            case 'password':
                setPasswordEmpty(true);
                break;
        }
    }

    async function loginUser() {
        let currentUser = {
            email: email,
            password: password
        }
        let response = await fetch(`https://localhost:44377/api/user/login`, {
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(currentUser)
        })  
        const data = await response.json();
        console.log(data)
        if (data.message === "Invalid email" || data.message === "Invalid password") {
            setEmailError("Incorrect login or password");
            setEmail('')
            setPassword('')
            setRedirect(false);
        }
        else {
            setRedirect(true);
            props.setName(data.name);
            sessionStorage.setItem("access_token", data.access_token)
        }   
    }
    if (redirect) {
        return <Redirect to="/" />
    }
    return (
        <main className="form-signin">
            <div>
                <form onSubmit={submit}>
                    <h1 className="h3 mb-3 fw-normal" style={{ fontFamily: "sans-serif", textAlign: "center" }}>Welcome back!</h1>

                    {(emailEmpty && emailError) && <div style={{ color: "red" }}>{emailError}</div>}
                    <div>
                        <input className="form-control mb-2" value={email} onBlur={e => blurHandler(e)} type="email" name="email" onChange={userEmail} placeholder="Email@address.com" />
                    </div>

                    {(passwordEmpty && passwordError) && <div style={{ color: "red" }}>{passwordError}</div>}
                    <div>
                        <input type="password" onBlur={e => blurHandler(e)} className="form-control mb-2" value={password} name="password" onChange={userPassword} placeholder="Password" />
                    </div>

                    <button className="w-100 btn btn-lg btn-primary" disabled={!formValid} onClick={loginUser} type="submit">Sign in</button>
                </form>
            </div>
        </main>
        )
}

export default LoginForm;