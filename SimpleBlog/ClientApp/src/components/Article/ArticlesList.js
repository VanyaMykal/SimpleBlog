import ArticleItem from "./ArticleItem"

function ArticlesList({ articles, remove, userName, setName, getId}) {
    return (
        <div>
            {articles.map((article, index) =>
                <div key={index}>
                    <ArticleItem article={article} number={index + 1} remove={remove} userName={userName} setName={setName} getId={getId} />
                </div>
                )}
        </div>
        )
}

export default ArticlesList