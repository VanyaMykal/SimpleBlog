import React, { useState, useEffect} from 'react';
import Navigation from './components/Navigation';
import { Route } from "react-router";
import { BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import AddArticleForm from './components/Article/AddArticleForm';
import MyArticles from './components/Article/MyArticles';

function App() {
    const [name, setName] = useState(undefined)
    useEffect(() => {
        async function fetchApi() {
            await fetch("https://localhost:44377/api/user/GetUser")
                .then(results => results.json())
                .then(data => {
                    setName(data.userName)
                })           
        }
        fetchApi();
    }, []);
    return (
        <div>
            <BrowserRouter>
                <Navigation userName={name} setName={setName} />
                <Route path="/" exact component={() => <Home userName={name}/>} />
                <Route path="/create" component={() => <AddArticleForm />} />
                <Route path="/myarticles" component={() => <MyArticles/>} />
            </BrowserRouter>
        </div>
    )
}

export default App;
