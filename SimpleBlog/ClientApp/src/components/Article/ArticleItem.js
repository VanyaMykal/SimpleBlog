function ArticleItem(props) {
    console.log(props.article.userName)
    return (
        <div>
            {!props.article.userName
                ?
                <div className="border border-warning w-75 m-auto d-flex justify-content-between p-3 mt-2">
                    <div>
                        <div>{props.number} {props.article.title}</div>
                    </div>
                </div>
                :
                <div className="border border-warning w-75 m-auto d-flex justify-content-between p-3 mt-2">
                    <div>
                        <div>{props.number} {props.article.title}</div>
                    </div>
                    <button className="btn btn-warning" id={props.number} onClick={() => setModal(true)}>Edit</button>
                    {/*<MyModal visible={modal} setVisible={setModal}>*/}
                    {/*    <EditPost data={props.post} edit={editPost} />*/}
                    {/*</MyModal>*/}
                    <button className="btn btn-danger">Delete</button>
                </div>
            }
        </div>
 
        )
}

export default ArticleItem