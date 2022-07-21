import { useEffect, useState } from "react";
import ArticlesList from "./ArticlesList";
function MyArticles(props) {
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

    async function removeArticle(articleId) {
        let article = setMyArticles(myArticles.filter(a => a.articleId !== articleId))
        await fetch(`https://localhost:44377/api/article/delete/` + articleId, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        })
    
    }
    if (!myArticles.length) {
        return (
            <h1 className="text-center">Empty list</h1>
        )
    }
    return (
        <div>
            <ArticlesList articles={myArticles} remove={removeArticle} />
        </div>
        )
}

export default MyArticles;