import ArticleItem from "./ArticleItem"

function ArticlesList({ articles }) {
    return (
        <div>
            {articles.map((article, index) =>
                <ArticleItem key={index} article={article} number={index+1}/>
                )}
        </div>
        )
}

export default ArticlesList