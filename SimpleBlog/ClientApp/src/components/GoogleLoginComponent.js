import { useState } from "react";
import { GoogleLogin, GoogleLogout, useGoogleLogout } from "react-google-login";

const CLIENT_ID = "455165680834-rrbgjobnjboleblitgq32k74uepageug.apps.googleusercontent.com";
function GoogleLoginComponent({newUser}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userInfo, setUserInfo] = useState({ name: '', emailId: '' })

     function responseGoogleSuccess(response) {
        console.log();
        let userInfo = {
            name: response.profileObj.name,
            emailId: response.profileObj.email,
        };
         setUserInfo(userInfo)
         console.log(userInfo.name)
         console.log(userInfo.emailId)
         setIsLoggedIn(true)
         newUser(userInfo.name)
    };
    function responseGoogleError(response){
        console.log(response);
    };
    function logout(response){
        console.log(response);
        let userInfo = {
            name: "",
            emailId: "",
        };
        setUserInfo(userInfo)
        console.log("Name " + userInfo.name)
        console.log("Email " + userInfo.emailId)
        setIsLoggedIn(false)
    };
    return (
        <div className="row mt-5">
            {/*<div className="col-md-12">*/}
            {/*    {isLoggedIn ? (*/}
            {/*        <div>*/}
            {/*            */}{/*<h1>Welcome, {userInfo.name}</h1>*/}
            {/*            <GoogleLogout*/}
            {/*                clientId={CLIENT_ID}*/}
            {/*                buttonText={"Logout"}*/}
            {/*                onLogoutSuccess={logout}                        */}
            {/*            ></GoogleLogout>*/}
            {/*        </div>*/}
            {/*    ) : (*/}
            {/*        <GoogleLogin*/}
            {/*            clientId={CLIENT_ID}*/}
            {/*            buttonText="Sign In with Google"*/}
            {/*            onSuccess={responseGoogleSuccess}*/}
            {/*                onFailure={responseGoogleError}*/}
            {/*                prompt="select_account"                          */}
            {/*                isSignedIn={true}                         */}
            {/*            cookiePolicy={"single_host_origin"}*/}
            {/*        />*/}
            {/*    )}*/}
            {/*</div>*/}

                    <GoogleLogin
                        clientId={CLIENT_ID}
                        buttonText="Sign In with Google"
                        onSuccess={responseGoogleSuccess}
                            onFailure={responseGoogleError}
                            prompt="select_account"                          
                            isSignedIn={true}                         
                        cookiePolicy={"single_host_origin"}
                    />
              
        </div>
        )
}

export default GoogleLoginComponent;