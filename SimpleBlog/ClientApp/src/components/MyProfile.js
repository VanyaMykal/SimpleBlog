import { Redirect } from "react-router-dom";
import defaultImage from "../images/default.png";
function MyProfile(props) {
    console.log(props.user)
    const labelStyle = {
        fontWeight: "bold",
        marginTop:"5px"
    }
    if (props.user.title === "Unauthorized") {
        return <Redirect to="/" />
    }
    return (
        <div className="mt-5">
            <div className="border border-dark w-50 mt-2 m-auto p-2 rounded-3">
                <div><h3 className="text-center">My profile</h3></div>
                     <div className="d-flex justify-content-around">
                        <div>
                            <div style={labelStyle}>Username</div>
                            <div>{props.user.userName}</div>
                            <div style={labelStyle}>Birthday</div>
                            <div>{props.user.birthday}</div>
                            <div style={labelStyle}>Email</div>
                            <div>{props.user.email}</div>
                        <div>
                        </div>
                        </div>
                        <div>
                            {props.user.photo === ''
                                ? <img style={{ width: '220px', height: '190px', borderRadius: "50%" }} src={defaultImage} />
                                : <img style={{ width: '220px', height: '190px', borderRadius: "50%" }} src={`${props.user.photo}`} />
                            }
                        </div>
                    </div>
            </div>
        </div>
        )
}

export default MyProfile