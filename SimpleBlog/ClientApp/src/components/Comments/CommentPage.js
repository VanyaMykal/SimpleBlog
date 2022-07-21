import { useEffect, useState } from "react";
import AddCommentForm from "./AddCommentForm";
import { Redirect } from "react-router-dom";
import ArticleInCommentPage from "./ArticleInCommentPage";
import GetComments from "./GetComments";
import Loader from "../UI/loader/Loader";

function CommentPage(props) {
    const [article, setArticle] = useState("")
    const [comments, setComments] = useState([])
    console.log("Id " + props.getId)
    useEffect(() => {
        async function getArticle() {
            await fetch(`https://localhost:44377/api/article/getarticle/` + props.getId, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
                })
                .then(results => results.json())
                .then(data => {
                    console.log(data)
                    setArticle(data)
                })
        }
        getArticle()
    }, [])

    useEffect(() => {
        async function getComments() {
            await fetch(`https://localhost:44377/api/comment/Comments/` + props.getId, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(results => results.json())
                .then(data => {
                    console.log(data)
                    setComments(data)
                })
        }
        getComments()
    }, [])
    console.log(comments)
    console.log(article.length)
    function createComment(newComment) {
        setComments([...comments, newComment])
    }
    if (props.getId === '') {
        return <Redirect to="/"/>
    }
    return (
        <div>
            
                 {/*<div className="d-flex justify-content-center"><Loader /></div>*/}
                 <ArticleInCommentPage article={article} />
            
            <AddCommentForm createComment={createComment} article={article} />
            <GetComments comments={comments} />
        </div>
        )
}

export default CommentPage