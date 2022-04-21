import ArticleItem from "./ArticleItem"

function ArticlesList({ articles, remove}) {
    return (
        <div>
            {articles.map((article, index) =>
                <div key={index}>
                    <ArticleItem article={article} number={index + 1} remove={remove}/>
                </div>
                )}
        </div>
        )
}

export default ArticlesList