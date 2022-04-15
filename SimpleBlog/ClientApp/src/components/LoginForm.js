import React, { useState } from 'react';
function LoginForm(props) {
    const [user, setUser] = useState({email:'', password:''})
    function submit(e) {
        e.preventDefault();
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
        props.setName(data.name)
        sessionStorage.setItem("access_token", data.access_token)
       
    }
    return (
        <div>
            <h1>Login form</h1>
            <form onSubmit={submit}>
                <input placeholder="Email..." type="email" value={user.email} onChange={event => setUser({ ...user, email: event.target.value })} />
                <input placeholder="Password..." type="password" value={user.password} onChange={event => setUser({ ...user, password: event.target.value })} />
                <button onClick={loginUser} type="submit">Sign in</button>
            </form>
        </div>
        )
}

export default LoginForm;