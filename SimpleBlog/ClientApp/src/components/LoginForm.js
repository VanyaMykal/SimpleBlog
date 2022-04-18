import React, { useEffect, useState } from 'react';
function LoginForm(props) {
    const [user, setUser] = useState({ email: '', password: '' })

    const [fieldError, setFieldError] = useState({ emailError: 'Input your email', passwordError: 'Input your password' })
    const [fieldEmpty, setFieldEmpty] = useState({ emailEmpty: '', passwordEmpty: '' })

    const [formValid, setFormValid] = useState(false)
    useEffect(() => {
        if (fieldError.emailError || fieldError.passwordError) {
            setFormValid(false)
        }
        else {
            setFormValid(true)
        }
    })
    function submit(e) {
        e.preventDefault();
    }

    function userEmail(event) {
        setUser({ ...user, email: event.target.value });
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(event.target.value).toLowerCase())) {
            setFieldError({ emailError: 'Invalid email' });
        }
        else {
            setFieldError({ emailError: '' });
        }
    }
    function userPassword(event) {
        setUser({ ...user, password: event.target.value });
        if (!event.target.value) {
            setFieldError({ passwordError: 'Input your password'});
        }
        setFieldError({ passwordError: '' });
    }
    const blurHandler = (event) => {
        switch (event.target.name) {
            case 'email':
                setFieldEmpty({ emailEmpty: true});
                break;
            case 'password':
                setFieldEmpty({ passwordEmpty: true });
                break;
        }
    }

    async function loginUser() {
        let currentUser = {
            email: user.email,
            password: user.password
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
            setFieldError({ emailError: 'Incorrect login or password' })
        }
        else {
            props.setName(data.name)
            sessionStorage.setItem("access_token", data.access_token)
        }       
    }
    return (
        <main className="form-signin">
            <div>
                <form onSubmit={submit}>
                    <h1 className="h3 mb-3 fw-normal" style={{ fontFamily: "sans-serif", textAlign: "center" }}>Welcome back!</h1>

                    {(fieldEmpty.emailEmpty && fieldError.emailError) && <div style={{ color: "red" }}>{fieldError.emailError}</div>}
                    <div>
                        <input className="form-control mb-2" value={user.email} onBlur={e => blurHandler(e)} type="email" name="email" onChange={userEmail} placeholder="Email@address.com" />
                    </div>

                    {(fieldEmpty.passwordEmpty && fieldError.passwordError) && <div style={{ color: "red" }}>{fieldError.passwordError}</div>}
                    <div>
                        <input type="password" onBlur={e => blurHandler(e)} className="form-control mb-2" value={user.password} name="password" onChange={userPassword} placeholder="Password..." />
                    </div>

                    <button className="w-100 btn btn-lg btn-primary" disabled={!formValid} onClick={loginUser} type="submit">Sign in</button>

                </form>
            </div>
        </main>
        )
}

export default LoginForm;