import React from 'react';

function Home(props) {
    let auth;
    if (props.userName === undefined) {
        auth = (
            <div>
                <div style={{ textAlign: "center" }}>Sorry, but you not authenticated.</div>
                {/*<div style={{ padding: "10px" }}>*/}
                {/*    <ArticlesList name={props.userName} />*/}
                {/*</div>*/}
            </div>
        )
    }
    else {
        auth = (
            <div>
                <div style={{ textAlign: "center" }}>Hello, {props.userName}</div>
                {/*<div style={{ padding: "10px" }}>*/}
                {/*    <ArticlesList name={props.userName} />*/}
                {/*</div>*/}
            </div>
            )
    }
    //else {
    //    auth = (
    //        <div style={{ display: "flex", padding: "10px" }}>
    //            <div><ArticlesList name={props.userName} /></div>
    //            <div style={{ width: "100%", textAlign: "center" }}>

    //                <Link to="/myarticles">
    //                    <button type="button" class="btn btn-warning w-75 mb-3">Show my articles</button>
    //                </Link>
    //                <Link to="/articleform">
    //                    <button type="button" class="btn btn-warning w-75">Add new article</button>
    //                </Link>
    //            </div>

    //        </div>
    //    )
    //}
    return (
        <div>
            {auth}

        </div>

    );
}

export default Home;