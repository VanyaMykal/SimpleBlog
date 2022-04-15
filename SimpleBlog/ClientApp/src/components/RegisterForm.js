import React, { useEffect, useState } from 'react';
function RegisterForm(props) {
    const [user, setUser] = useState({ name: '', birthday: '', email: '', password: '', confirmPassword: '' })
    function submit(e) {
        e.preventDefault();
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
            props.setName(data.user.userName);
        console.log(data);
        sessionStorage.setItem("access_token", data.access_token)
    }
    return (
        <div>
            <h1>Register form</h1>
                <h1>{user.name}</h1>
                <h1>{user.email}</h1>
                <h1>{user.password}</h1>
                <h1>{user.confirmPassword}</h1>
                <form onSubmit={submit}>
                    <input type="text" placeholder="Nickname..." value={user.name} onChange={event => setUser({ ...user, name: event.target.value })} />
                    <input type="email" placeholder="Email..." value={user.email} onChange={event => setUser({ ...user, email: event.target.value })} />
                    <input type="password" placeholder="Password..." value={user.password} onChange={event => setUser({ ...user, password: event.target.value })} />
                    <input type="password" placeholder="Confirm password..." value={user.confirmPassword} onChange={event => setUser({ ...user, confirmPassword: event.target.value })} />
                    <button onClick={createUser}>Sign up</button>
            </form>
        </div>
    );
}

export default RegisterForm;
