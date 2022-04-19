import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

function AddArticleForm({ create }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

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

    async function createArticle() {
        let newArticle = {
            title: title,
            description: description,
            image: image
        }
        let response = await fetch("https://localhost:44377/api/article/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newArticle)
        })
        create(newArticle)
    }
    return (
        <main className="form-signin">
            <div>
                <form onSubmit={submit}>
                    <h1 class="h3 mb-3 fw-normal" style={{ fontFamily: "sans-serif", textAlign: "center" }}>New Article</h1>
                    {(titleEmpty && titleError) && <div style={{ color: "red" }}>{titleError}</div>}
                    <div>
                        <input class="form-control mb-2" onBlur={e => blurHandler(e)} value={title} type="text" name="title" onChange={articleTitle} placeholder="Title" />
                    </div>
                    {(descriptionEmpty && descriptionError) && <div style={{ color: "red" }}>{descriptionError}</div>}
                    <div>
                        <textarea class="form-control mb-2" onBlur={e => blurHandler(e)} value={description} type="text" name="text" onChange={articleDescription} placeholder="Text..." />
                    </div>
                    {(imageEmpty && imageError) && <div style={{ color: "red" }}>{imageError}</div>}
                    <div>
                        <input type="file" class="form-control mb-2" onBlur={e => blurHandler(e)} name="avatar" onChange={handleFileInputChange} />
                    </div>
                    <Link to="/">
                        <button class="w-100 btn btn-lg btn-primary" disabled={!formValid} onClick={createArticle} type="submit">Save</button>
                    </Link>
                </form>
            </div>
        </main>
        )
}

export default AddArticleForm;