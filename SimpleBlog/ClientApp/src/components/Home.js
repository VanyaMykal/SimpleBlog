import React from 'react';
import { Link } from 'react-router-dom';
import ArticlesList from './Article/ArticlesList';
import Loader from './UI/loader/Loader';

function Home(props) {
    let auth;
    console.log(props.articles)
    if (props.userName === undefined) {
        auth = (
            <div>
                <div style={{ textAlign: "center" }}>Sorry, but you not authenticated.</div>
                {!props.articles.length
                    ? <div className="d-flex justify-content-center"><Loader /></div>
                    : <ArticlesList articles={props.articles} />
                }
                
            </div>
        )
    }
    else {
        auth = (
            <div>
                <div style={{ textAlign: "center" }}>Hello, {props.userName}</div>
                <Link to="/myarticles">
                    <button>My articles</button>
                </Link>
                {!props.articles.length
                    ? <div className="d-flex justify-content-center"><Loader /></div>
                    : <ArticlesList articles={props.articles} />
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