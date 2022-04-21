import { useState } from "react"
import MyModal from "../UI/MyModal/MyModal"
import EditArticleForm from "./EditArticleForm"

function ArticleItem(props) {
    const [modal, setModal] = useState(false)
    function editPost(newPost) {
        console.log("newPost " + newPost.title)
        props.article.title = newPost.title
        props.article.description = newPost.description
        props.article.image = newPost.image
        setModal(false)
    }
    return (
        <div>
            {!props.article.userName
                ?
                <div className="mt-2">
                <div className="border border-warning w-75 mt-2 m-auto p-2">
                    <div className="d-flex ">
                        <div>{props.article.image ? <img style={{ width: "350px", height: "250px" }} src={`${props.article.image}`} /> : ''}</div>
                        <div className="ml-3">
                            <div className="fw-bold">{props.number}. {props.article.title}</div>
                                <div>{props.article.description}</div>
                        </div>
                        </div>
                        <button className="btn btn-success w-25 m-auto d-block">Comment</button>
                    </div>
                </div>
                :
                <div className="mt-2">
                    <div className="border border-warning w-75 mt-2 m-auto p-2">
                        <div className="d-flex">
                            <div>{props.article.image ? <img style={{ width: "350px", height: "250px" }} src={`${props.article.image}`} /> : ''}</div>
                            <div className="ml-3">
                                <div className="fw-bold">{props.number}. {props.article.title}</div>
                                <div>{props.article.description}</div>
                                <div className="d-flex justify-content-around mt-5">
                                    <button className="btn btn-warning" id={props.number} onClick={() => setModal(true)}>Edit</button>
                                    <MyModal visible={modal} setVisible={setModal}>
                                        <EditArticleForm data={props.article} edit={editPost} />
                                    </MyModal>
                                    <button className="btn btn-danger" id={`${props.article.articleId}`} onClick={() => props.remove(props.article.articleId)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
 
        )
}

export default ArticleItem