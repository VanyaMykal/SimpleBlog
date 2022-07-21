function ConfirmingRemovingArticle({data, remove, cancel}) {
    console.log(data)
    return (
        <div>
            <div className="text-center">Delete article?</div>
            <div className="d-flex justify-content-around">
                <div><button className="btn btn-light" onClick={() => cancel(false)}>Cancel</button></div>
                <div><button className="btn btn-primary" onClick={() => [remove(data.articleId), cancel(false)]}>Remove</button></div>
            </div>
        </div>
        )
}

export default ConfirmingRemovingArticle