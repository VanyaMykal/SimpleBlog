import { useEffect, useState } from "react";
import ArticlesList from "./ArticlesList";

function MyArticles() {
    const [myArticles, setMyArticles] = useState([])
    useEffect(() => {
        async function getArticle() {
            await fetch("https://localhost:44377/api/article/myarticles")
                .then(results => results.json())
                .then(data => {
                    console.log(data)
                    setMyArticles(data)
                })
        }
        getArticle();
    }, []);
    return (
        <div>
            <ArticlesList articles={myArticles} />
        </div>
        )
}

export default MyArticles;