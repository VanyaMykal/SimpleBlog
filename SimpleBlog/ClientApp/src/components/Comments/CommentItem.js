function CommentItem(props) {
    return (
        <div className="mt-3">
            <div style={{ width: "90%", margin: 'auto', borderColor: 'yellow', borderStyle: 'solid', borderWidth: '1px', display: 'block' }}>
                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{props.comment.userName} {props.comment.dateTime}</div>
                <div style={{ fontSize: '16px' }}>{props.comment.text}</div>
            </div>
        </div>
        )
}

export default CommentItem