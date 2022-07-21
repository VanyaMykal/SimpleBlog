import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import LoginForm from './LoginForm';
import MyModal from '../UI/MyModal/MyModal';
function RegisterForm(props) {
    const [modalLogin, setModalLogin] = useState(false)

    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');
    const [photo, setPhoto] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const [nameEmpty, setNameEmpty] = useState(false);
    const [birthdayEmpty, setBirthdayEmpty] = useState(false);
    const [emailEmpty, setEmailEmpty] = useState(false);
    const [photoEmpty, setPhotoEmpty] = useState(false);
    const [passwordEmpty, setPasswordEmpty] = useState(false);
    const [confirmPasswordEmpty, setConfirmPasswordEmpty] = useState(false);

    const [nameError, setNameError] = useState('Input your name');
    const [birthdayError, setBirthdayError] = useState('Input your birthday');
    const [emailError, setEmailError] = useState('Input your email');
    const [photoError, setPhotoError] = useState('Photo required');
    const [passwordError, setPasswordError] = useState('Input your password');
    const [confirmPasswordError, setConfirmPasswordError] = useState('Please confirm your password');

    const [passwordStrengthColor, setPasswordStrengthColor] = useState("#ffffff");

    const [formValid, setFormValid] = useState(false)   
    useEffect(() => {

        if (nameError || birthdayError || emailError || passwordError || confirmPasswordError || photoError) {
            setFormValid(false);
        }
        else {
            setFormValid(true);
        }
    }, [nameError, birthdayError, emailError, passwordError, confirmPasswordError, photoError])

    function userName(event) {
        setName(event.target.value);
        const regex = /[A-Za-z0-9]/;
        const chars = event.target.value.split('');
        const char = chars.pop();
        if (regex.test(char)) {
            setNameError('');
        }
        else {
            setNameError('Only Latin letters and Arabic numerals are available');
        }
    }

    function userBirthday(event) {
        setBirthday(event.target.value);
        const re = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
        if (!re.test(String(event.target.value).toLowerCase())) {
            setBirthdayError('Invalid birthday');
        }
        else {
            setBirthdayError('');
        }
    }

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
        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

        if (strongRegex.test(event.target.value)) {
            setPasswordStrengthColor("#7ef2ba");
            if (!event.target.value) {
                setPasswordError('Input your password');
            }
        }
        else if (mediumRegex.test(event.target.value)) {
            setPasswordStrengthColor("#f2d174");
            if (!event.target.value) {
                setPasswordError('Input your password');
            }
        }
        else {
            setPasswordStrengthColor("#f08178");
            setPasswordError('');
        }
    }

    function userConfirmPassword(event) {
        setConfirmPassword(event.target.value);
        if (!event.target.value) {
            setConfirmPasswordError('Input your password');
        }
        else {
            setConfirmPasswordError('');
        }
    }

    let baseURL;
    function getBase64(file) {
        return new Promise(resolve => {
            baseURL = "";
            let reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = () => {
                console.log("Called", reader);
                baseURL = reader.result;
                console.log("Base 64", reader.result);
                setPhoto(reader.result);
                if (reader.result === '') {
                    setPhotoError('Photo required');
                }
                else {
                    setPhotoError('');
                }
                resolve(baseURL);
            }
        })
    }
    function handleFileInputChange(e) {
        console.log(e.target.files[0]);
        let file = e.target.files[0];
        getBase64(file)
            .then(result => {
                file["base64"] = result;
                console.log("File Is", file);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const blurHandler = (event) => {
        switch (event.target.name) {
            case 'email':
                setEmailEmpty(true);
                break;
            case 'nickname':
                setNameEmpty(true);
                break;
            case 'password':
                setPasswordEmpty(true);
                break;
            case 'photo':
                setPhotoEmpty(true)
                break;
            case 'birthday':
                setBirthdayEmpty(true);
                break;
            case 'confirmPassword':
                setConfirmPasswordEmpty(true)
                break;
        }
    }
    async function createUser() {
        //name the same like in registermodel
        let newUser = {
            username: name,
            birthday: birthday,
            photo:photo,
            email: email,
            Password: password,
            confirmPassword: confirmPassword
        }
        const response = await fetch(`https://localhost:44377/api/user/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        })
        const data = await response.json();
        if (data.message === "This name already exist") {
            setNameError('This name already exist');
            setRedirect(false);
        }
        else if (data.message === "This email already exist") {
            setEmailError('This email already exist');
            setRedirect(false);
        }
        else if (data.message === "Password mismatch") {
            setConfirmPasswordError('Password mismatch');
            setRedirect(false);
        }
        else {
            setRedirect(true);
            sessionStorage.setItem("access_token", data.access_token)
            props.setName(data.user.userName);
        }
    }
    const stylePasswordField = { backgroundColor: passwordStrengthColor };

    if (redirect) {
        return <Redirect to="/"/>
    }
    return (
        <main className="form-signin">
            <div>
                <form>
                    <h1 className="h3 mb-3 fw-normal" style={{ fontFamily: "sans-serif", textAlign: "center" }}>Join Medium</h1>
                    {(nameEmpty && nameError) && <div style={{ color: "red" }}>{nameError}</div>}
                    <div>
                        <input className="form-control mb-2" value={name} onBlur={e => blurHandler(e)} name="nickname" onChange={userName} placeholder="Nickname" />
                    </div>

                    {(birthdayEmpty && birthdayError) && <div style={{ color: "red" }}>{birthdayError}</div>}
                    <div>
                        <input className="form-control mb-2" value={birthday} onBlur={e => blurHandler(e)} type="text" name="birthday" onChange={userBirthday} placeholder="DD-MM-YYYY" />
                    </div>

                    <label>Profile picture</label>
                    {(photoEmpty && photoError) && <div style={{ color: "red" }}>{photoError}</div>}
                    <div>
                        <input className="form-control mb-2" type="file" name="photo" onChange={handleFileInputChange} />
                    </div>

                    {(emailEmpty && emailError) && <div style={{ color: "red" }}>{emailError}</div>}
                    <div>
                        <input className="form-control mb-2" value={email} onBlur={e => blurHandler(e)} type="email" name="email" onChange={userEmail} placeholder="Email@address.com" />
                    </div>

                    {(passwordEmpty && passwordError) && <div style={{ color: "red" }}>{passwordError}</div>}
                    <div>
                        <input style={stylePasswordField} type="password" onBlur={e => blurHandler(e)} className="form-control mb-2" value={password} name="password" onChange={userPassword} placeholder="Password" />
                    </div>

                    {(confirmPasswordEmpty && confirmPasswordError) && <div style={{ color: "red" }}>{confirmPasswordError}</div>}
                    <div>
                        <input type="password" onBlur={e => blurHandler(e)} className="form-control mb-2" value={confirmPassword} name="confirmPassword" onChange={userConfirmPassword} placeholder="Confirm password" />
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" disabled={!formValid} onClick={createUser} type="submit">Sign up</button>
                    
                </form>
                <hr></hr>
                <div className="mt-3 text-center">Already have an account?
                    <div><button type="button" className="btn btn-success mt-2" onClick={() => setModalLogin(true)}>Sign in</button></div>
                    <MyModal visible={modalLogin} setVisible={setModalLogin}>
                        <LoginForm setName={props.setName} />
                    </MyModal>
                </div>
            </div>
        </main>
    );
}

export default RegisterForm;
