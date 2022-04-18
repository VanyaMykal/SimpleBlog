import { GoogleLogout } from "react-google-login"
import React, { useState } from 'react';

const CLIENT_ID = "455165680834-rrbgjobnjboleblitgq32k74uepageug.apps.googleusercontent.com";
function GoogleLogoutComponent({logoutGmail}) {
    const [userInfo, setUserInfo] = useState({ name: '', emailId: '' })
    function logout(response) {
        console.log(response);
        let userInfo = {
            name: "",
            emailId: "",
        };
        setUserInfo(userInfo)
        console.log("Name " + userInfo.name)
        console.log("Email " + userInfo.emailId)
        setIsLoggedIn(false)
        logoutGmail(userInfo.name)
    };
    return (
        <GoogleLogout
            clientId={CLIENT_ID}
            buttonText={"Logout"}
         onLogoutSuccess={logout}                         
         ></GoogleLogout> 
        )
}

export default GoogleLogoutComponent