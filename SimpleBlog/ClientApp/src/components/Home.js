import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import ArticlesList from './Article/ArticlesList';
import Loader from './UI/loader/Loader';

function Home(props) {
    const [articles, setArticles] = useState([])
    const [value, setValue] = useState('')
    useEffect(() => {
        async function getArticle() {
            await fetch("https://localhost:44377/api/article/articles")
                .then(results => results.json())
                .then(data => {
                    console.log(data)
                    setArticles(data)                 
                })
        }
        getArticle();
    }, []);
    const filteredArticle = articles.filter(article => {
        return article.title.toLowerCase().includes(value.toLowerCase())
    })
    let auth;
    console.log(props.userName)
    if (props.userName === undefined) {
        auth = (
            <div>
                <nav className="navbar navbar-light bg-light">
                    <form className="container-fluid">
                        <div style={{ textAlign: "center" }}>Sorry, but you not authenticated.</div>
                        <input onChange={(event) => setValue(event.target.value)} className="form-control w-25 me-2" type="search" placeholder="Search" aria-label="Search" />
                    </form>
                </nav>
                {!articles.length
                    ? <div className="d-flex justify-content-center"><Loader /></div>
                    : <div>
                        {!filteredArticle.length
                            ? <h1 className="text-center">Not found</h1>
                            : <ArticlesList articles={filteredArticle} />
                        }</div>
                }              
            </div>
        )
    }
    else {
        auth = (
            <div>
                <nav className="navbar navbar-light bg-light">
                    <form className="container-fluid">
                        <Link to="/myarticles">
                            <button className="btn btn-outline-primary me-2">My articles</button>
                        </Link>
                        <input onChange={(event) => setValue(event.target.value)} className="form-control w-25 me-2" type="search" placeholder="Search" aria-label="Search" />
                    </form>
                </nav>
                {!articles.length
                    ? <div className="d-flex justify-content-center"><Loader /></div>
                    : <div>
                        {!filteredArticle.length
                            ? <h1 className="text-center">Not found</h1>
                            : <ArticlesList articles={filteredArticle} userName={props.userName} setName={props.setName} getId={props.getId}/>
                        }</div>
                }
            </div>
            )
    }
    return (
        <div>
            {auth}

        </div>

    );
}

export default Home;