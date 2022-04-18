import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import LoginForm from './LoginForm';
import MyModal from './UI/MyModal/MyModal';
import { Link } from 'react-router-dom';
import GoogleLoginComponent from './GoogleLoginComponent';
function RegisterForm(props) {
    const [user, setUser] = useState({ name: '', birthday: '', email: '', password: '', confirmPassword: '' })
    const [modal, setModal] = useState(false)

    const [fieldEmpty, setFieldEmpty] = useState({ nameEmpty: false, birthdayEmpty: false, emailEmpty: false, passwordEmpty: false, confirmPasswordEmpty: false })

    const [fieldError, setFieldError] = useState({
        nameError: 'Input your name',
        birthdayError: 'Input your birthday', emailError: 'Input your email',
        passwordError: 'Input your password', confirmPasswordError: 'Please confirm your password'
    })

    const [formValid, setFormValid] = useState(false)
    const [passwordStrengthColor, setPasswordStrengthColor] = useState("#ffffff");

    useEffect(() => {
        if (fieldError.nameError || fieldError.birthdayError || fieldError.emailError || fieldError.password || fieldError.confirmPasswordError) {
            setFormValid(false)
        }
        else {
            setFormValid(true)
        }
    }, [fieldError.nameError, fieldError.birthdayError, fieldError.emailError, fieldError.password, fieldError.confirmPasswordError])

    function submit(e) {
        e.preventDefault();
    }

    function userName(event) {
        setUser({ ...user, name: event.target.value })
        const regex = /[A-Za-z0-9]/
        const chars = event.target.value.split('')
        const char = chars.pop()
        if (regex.test(char)) {
            setFieldError({ nameError: '' })
        }
        else {
            setFieldError({ nameError: 'Only Latin letters and Arabic numerals are available' })
        }
    }

    function userBirthday(event) {
        setUser({ ...user, birthday:event.target.value });
        const re = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
        if (!re.test(String(event.target.value).toLowerCase())) {
            setFieldError({ birthdayError: 'Invalid birthday' })
        }
        else {
            setFieldError({ birthdayError: '' })
        }
    }

    function userEmail(event) {
        setUser({ ...user, email:event.target.value });
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(event.target.value).toLowerCase())) {
            setFieldError({ emailError: 'Invalid email'});
        }
        else {
            setFieldError({ emailError: '' });
        }
    }
    function userPassword(event) {
        setUser({ ...user, password: event.target.value });
        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

        if (strongRegex.test(event.target.value)) {
            setPasswordStrengthColor("#7ef2ba");
            if (!event.target.value) {
                setFieldError({ passwordError: 'Input your password'});
            }
        }
        else if (mediumRegex.test(event.target.value)) {
            setPasswordStrengthColor("#f2d174");
            if (!event.target.value) {
                setFieldError({ passwordError: 'Input your password' });
            }
        }
        else {
            setPasswordStrengthColor("#f08178");
            setFieldError({ passwordError: '' });
        }
    }

    function userConfirmPassword(event) {
        setUser({ ...user, confirmPassword: event.target.value });
        if (!event.target.value) {
            setFieldError({ confirmPasswordError: 'Input your password'});
        }
        else {
            setFieldError({ confirmPasswordError: '' });
        }
    }

    const blurHandler = (event) => {
        switch (event.target.name) {
            case 'email':
                setFieldEmpty({ emailEmpty: true });
                break;
            case 'nickname':
                setFieldEmpty({ nameEmpty: true });
                break;
            case 'password':
                setFieldEmpty({ passwordEmpty: true });
                break;
            case 'birthday':
                setFieldEmpty({ birthdayEmpty: true });
                break;
            case 'confirmPassword':
                setFieldEmpty({ confirmPasswordEmpty: true });
                break;
        }
    }
    async function createUser() {
        //name the same like in registermodel
        let newUser = {
            username: user.name,
            email: user.email,
            Password: user.password,
            confirmPassword: user.confirmPassword
        }
        const response = await fetch(`https://localhost:44377/api/user/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        })
        const data = await response.json();
        if (data.message === "This name already exist") {
            setFieldError({ nameError: "This name already exist" })
        }
        else if (data.message === "This email already exist") {
            setFieldError({ emailError: "This email already exist" })
        }
        else if (data.message === "Password mismatch") {
            setFieldError({ confirmPasswordError: 'Password mismatch' });
        }
        else {
            props.setName(data.user.userName);
            console.log(data);
            sessionStorage.setItem("access_token", data.access_token)
        }
    }
    function newUser(userGmail) {
        props.setName(userGmail)
    }

    const stylePasswordField = { backgroundColor: passwordStrengthColor };
    return (
        <main className="form-signin">
            <div>
                <form onSubmit={submit}>
                    <h1 className="h3 mb-3 fw-normal" style={{ fontFamily: "sans-serif", textAlign: "center" }}>Join Medium</h1>
                    {(fieldEmpty.nameEmpty && fieldError.nameError) && <div style={{ color: "red" }}>{fieldError.nameError}</div>}
                    <div>
                        <input className="form-control mb-2" value={user.name} onBlur={e => blurHandler(e)} name="nickname" onChange={userName} placeholder="Nickname..." />
                    </div>

                    {(fieldEmpty.birthdayEmpty && fieldError.birthdayError) && <div style={{ color: "red" }}>{fieldError.birthdayError}</div>}
                    <div>
                        <input className="form-control mb-2" value={user.birthday} onBlur={e => blurHandler(e)} type="text" name="birthday" onChange={userBirthday} placeholder="DD-MM-YYYY" />
                    </div>

                    {(fieldEmpty.emailEmpty && fieldError.emailError) && <div style={{ color: "red" }}>{fieldError.emailError}</div>}
                    <div>
                        <input className="form-control mb-2" value={user.email} onBlur={e => blurHandler(e)} type="email" name="email" onChange={userEmail} placeholder="Email@address.com" />
                    </div>

                    {(fieldEmpty.passwordEmpty && fieldError.passwordError) && <div style={{ color: "red" }}>{fieldError.passwordError}</div>}
                    <div>
                        <input style={stylePasswordField} type="password" onBlur={e => blurHandler(e)} className="form-control mb-2" value={user.password} name="password" onChange={userPassword} placeholder="Password" />
                    </div>

                    {(fieldEmpty.confirmPasswordEmpty && fieldError.confirmPasswordError) && <div style={{ color: "red" }}>{fieldError.confirmPasswordError}</div>}
                    <div>
                        <input type="password" onBlur={e => blurHandler(e)} className="form-control mb-2" value={user.confirmPassword} name="confirmPassword" onChange={userConfirmPassword} placeholder="Confirm password" />
                    </div>


                    <button className="w-100 btn btn-lg btn-primary" disabled={!formValid} onClick={createUser} type="submit">Sign up</button>
                    <hr></hr>
                    <div>
                        <GoogleLoginComponent newUser={newUser} />
                    </div>
                    {/*<div className="mt-3 text-center">Already have an account?*/}
                    {/*    <button type="button" className="btn btn-success" onClick={() => [props.setModal(false), setModal(true)]}>Sign in</button>*/}
                    {/*    <MyModal visible={modal} setVisible={setModal}>*/}
                    {/*        <LoginForm/>*/}
                    {/*    </MyModal>*/}
                    {/*    */}{/*<Link to="/login" className="nav-link active link-success">*/}
                    {/*    */}{/*    <button type="button" onClick={()=>props.setModal(false)} className="btn btn-success">Sign in</button>*/}
                    {/*    */}{/*</Link>*/}
                    {/*</div>*/}
                </form>
            </div>
        </main>
    );
}

export default RegisterForm;
