import React, { useState, useEffect} from 'react';
import Navigation from './components/Navigation';
import { Route } from "react-router";
import RegisterForm from './components/Authentication/RegisterForm';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from './components/Authentication/LoginForm';
import Home from './components/Home';
import GoogleLoginComponent from './components/GoogleLoginComponent';
import ArticlesList from './components/Article/ArticlesList';
import AddArticleForm from './components/Article/AddArticleForm';
import MyArticles from './components/Article/MyArticles';
import Loader from './components/UI/loader/Loader';

function App() {
    const [name, setName] = useState(undefined)
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(false)
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

    //async function getArticle() {
    //    let response = await fetch("https://localhost:44377/api/article/articles")
    //    let data = await response.json()
    //    console.log(data)
    //}
    //useEffect(() => {
    //    getArticle()
    //},[])
    useEffect(() => {
        async function getArticle() {
            await fetch("https://localhost:44377/api/article/articles")
                .then(results => results.json())
                .then(data => {
                    console.log(data)
                    setArticles(data)
                })
            setIsLoading(true)
        }
        getArticle();
    }, []);

    function createArticle(newArticle) {
        setArticles([...articles, newArticle])
    }

 
    return (
        <div>
            <BrowserRouter>
                <Navigation userName={name} setName={setName} />
                <Route path="/" exact component={() => <Home userName={name} articles={articles} />} />
                <Route path="/create" component={() => <AddArticleForm create={createArticle} />} />
                <Route path="/myarticles" component={() => <MyArticles/>} />
            </BrowserRouter>
        </div>
    )
}

export default App;
