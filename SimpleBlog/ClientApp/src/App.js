import React, { useState, useEffect} from 'react';
import Navigation from './components/Navigation';
import { Route } from "react-router";
import RegisterForm from './components/RegisterForm';
import Layout from './components/Layout';
import { Container } from 'reactstrap';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import GoogleLoginComponent from './components/GoogleLoginComponent';

function App() {
    const [name, setName] = useState(undefined)
    useEffect(() => {
        async function fetchApi() {
            await fetch("https://localhost:44377/api/user/GetUser")
                .then(results => results.json())
                .then(data => {
                    console.log(data)
                    setName(data.userName)
                })           
        }
        fetchApi();
    }, []);
   
    
    return (
        <div>
            <BrowserRouter>
                <Navigation userName={name} setName={setName} />
                <Route path="/" exact component={() => <Home userName={name} />} />
             {/*   <Route path='/register' component={() => <RegisterForm setName={setName} />} />*/}
                {/*<Route path='/login' component={() => <LoginForm setName={setName} />} />*/}
            </BrowserRouter>
            {/*<div>*/}
            {/*    <h2>React Google Login Example</h2>*/}
            {/*    <GoogleLoginComponent />*/}
            {/*</div>*/}
        </div>
    )
}

export default App;
