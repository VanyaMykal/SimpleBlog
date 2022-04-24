import CommentItem from "./CommentItem"
function GetComments({ comments }) {
    return (
        <div>
            {comments.map((comment, index) =>
                <CommentItem key={index} comment={comment} />
                )}
        </div>
        )
}

export default GetComments