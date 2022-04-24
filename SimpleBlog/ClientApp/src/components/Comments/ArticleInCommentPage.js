function ArticleInCommentPage(props) {
    return (
        <div className="mt-3">
            <div className="border border-warning w-75 m-auto p-2">
                <div className="d-flex ">
                    <div>{props.article.image ? <img style={{ width: "350px", height: "250px" }} src={`${props.article.image}`} /> : ''}</div>
                    <div className="ml-3">
                        <div className="fw-bold">{props.article.title}</div>
                        <div>{props.article.description}</div>
                    </div>
                </div>
            </div>
        </div>
        )
}

export default ArticleInCommentPage