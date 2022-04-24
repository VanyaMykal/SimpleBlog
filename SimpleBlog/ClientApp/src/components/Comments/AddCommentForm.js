import { useState } from "react";
import { Redirect } from "react-router-dom";

function AddCommentForm({ createComment, article }) {
    let dateTime = new Date().toLocaleDateString();
    const [text, setText] = useState('')
    const [valid, setValid] = useState(true)
    const [isHidden, setIsHidden] = useState(true)
    function submit(e) {
        e.preventDefault()
    }
    async function addComment() {
        let newComment = {
            text: text,
            DateTime: dateTime,
            ArticleId: article.articleId
        }
        await fetch("https://localhost:44377/api/comment/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newComment)
        })
        createComment(newComment)
        setText('')
        setValid(true)
        setIsHidden(true)
    }
    function checkArea(event) {
        setText(event.target.value)
        setValid(false)
        if (!event.target.value) {
            setValid(true)
        }
    }
    function clearArea() {
        setText('')
        setValid(true)
        setIsHidden(true)
    }
    return (
        <div>
            <div style={{}}>
                <form onSubmit={submit}>
                    <textarea onFocus={(e) => { setIsHidden(false) }}
                        value={text} style={{
                    width: "90%", height: "180px", margin: 'auto',
                    display: 'block', marginTop: '10px', padding: '12px 20px',
                    boxSizing: 'border-box', borderWidth: '2px', borderStyle: 'solid',
                    borderColor: '#ccc', backgroundColor: '#f8f8f8', fontSize: '16px',
                            resize: 'none', borderRadius: '4px'
                        }} onChange={checkArea} placeholder="Enter comment text" />
                    <div className="ml-5 mt-2">
                        <button hidden={isHidden} className="btn btn-light" onClick={clearArea}>Отмена</button>
                        <button hidden={isHidden} disabled={valid} className="btn btn-primary ml-2" onClick={addComment}>Добавить комментарий</button>
                    </div>
                </form>
            </div>
        </div>
        )
}

export default AddCommentForm