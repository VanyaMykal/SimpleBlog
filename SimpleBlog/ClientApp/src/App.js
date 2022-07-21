import React, { useState, useEffect} from 'react';
import Navigation from './components/Navigation';
import { Route } from "react-router";
import { BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import AddArticleForm from './components/Article/AddArticleForm';
import MyArticles from './components/Article/MyArticles';
import CommentPage from './components/Comments/CommentPage';
import MyProfile from './components/MyProfile';

function App() {
    const [name, setName] = useState(undefined)
    const [user, setUser] = useState('')
    const [articleId, setArticleId] = useState('')
    useEffect(() => {
        async function fetchApi() {
            await fetch("https://localhost:44377/api/user/GetUser")
                .then(results => results.json())
                .then(data => {
                    console.log(data)
                    setUser(data)
                    setName(data.userName)
                })           
        }
        fetchApi();
    }, []);

    function getId(articleId) {
        setArticleId(articleId)
    }
    return (
        <div>
            <BrowserRouter>
                <Navigation userName={name} setName={setName} photo={user.photo}/>
                <Route path="/" exact component={() => <Home userName={name} setName={setName} getId={getId} />} />
                <Route path="/create" component={() => <AddArticleForm />} />
                <Route path="/myarticles" component={() => <MyArticles userName={name}/>} />
                <Route path="/comment" component={() => <CommentPage getId={articleId} />} />
                <Route path="/profile" component={() => <MyProfile user={user} />} />
            </BrowserRouter>
        </div>
    )
}

export default App;
