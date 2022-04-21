import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function EditArticleForm({ data, edit }) {
    console.log(data.articleId)
    const [title, setTitle] = useState(data.title);
    const [description, setDescription] = useState(data.description);
    const [image, setImage] = useState(data.image);

    const [titleEmpty, setTitleEmpty] = useState(false);
    const [descriptionEmpty, setDescriptionEmpty] = useState(false);
    const [imageEmpty, setImageEmpty] = useState(false);

    const [titleError, setTitleError] = useState('Enter the title of your article');
    const [descriptionError, setDescriptionError] = useState('There should be some text');
    const [imageError, setImageError] = useState('Image required');

    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        if (titleError || descriptionError || imageError) {
            setFormValid(false);
        }
        else {
            setFormValid(true);
        }
    }, [titleError, descriptionError, imageError])


    const submit = async (event) => {
        event.preventDefault();

    };
    function articleTitle(event) {
        setTitle(event.target.value);
        if (!event.target.value) {
            setTitleError('Enter the title of your article');
        }
        else {
            setTitleError('');
        }
    }
    function articleDescription(event) {
        setDescription(event.target.value);
        if (!event.target.value) {
            setDescriptionError('There should be some text');
        }
        else {
            setDescriptionError('');
        }
    }
    let baseURL;
    function getBase64(file) {
        return new Promise(resolve => {
            baseURL = "";
            let reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = () => {
                console.log("Called", reader);
                baseURL = reader.result;
                console.log("Base 64", reader.result);
                setImage(reader.result);
                if (reader.result === '') {
                    setImageError('Image required');
                }
                else {
                    setImageError('');
                }
                resolve(baseURL);
            }
        })
    }
    function handleFileInputChange(e) {
        console.log(e.target.files[0]);
        let file = e.target.files[0];
        getBase64(file)
            .then(result => {
                file["base64"] = result;
                console.log("File Is", file);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const blurHandler = (event) => {
        switch (event.target.name) {
            case 'title':
                setTitleEmpty(true);
                break;
            case 'text':
                setDescriptionEmpty(true);
                break;
            case 'avatar':
                setImageEmpty(true);
                break;
        }
    }

    async function editArticle() {
        let newArticle = {
            articleId: data.articleId,
            title: title,
            description: description,
            image: image
        }
        let response = await fetch("https://localhost:44377/api/article/edit/", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newArticle)
        })
        edit(newArticle)
    }
    return (
        <main className="form-signin">
            <div>
                <form onSubmit={submit}>
                    <h1 className="h3 mb-3 fw-normal" style={{ fontFamily: "sans-serif", textAlign: "center" }}>New Article</h1>
                    {(titleEmpty && titleError) && <div style={{ color: "red" }}>{titleError}</div>}
                    <div>
                        <input className="form-control mb-2" onBlur={e => blurHandler(e)} value={title} type="text" name="title" onChange={articleTitle} placeholder="Title" />
                    </div>
                    {(descriptionEmpty && descriptionError) && <div style={{ color: "red" }}>{descriptionError}</div>}
                    <div>
                        <textarea className="form-control mb-2" onBlur={e => blurHandler(e)} value={description} type="text" name="text" onChange={articleDescription} placeholder="Text..." />
                    </div>
                    {(imageEmpty && imageError) && <div style={{ color: "red" }}>{imageError}</div>}
                    <div>
                        <input type="file" className="form-control mb-2" onBlur={e => blurHandler(e)} name="avatar" onChange={handleFileInputChange} />
                    </div>
                    <Link to="/">
                        <button className="w-100 btn btn-lg btn-primary" disabled={!formValid} onClick={editArticle} type="submit">Save</button>
                    </Link>
                </form>
            </div>
        </main>
        )
}

export default EditArticleForm