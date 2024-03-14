import {GoogleLogin,GoogleLoginResponse ,GoogleLoginResponseOffline} from 'react-google-login';

const clientId="954816881980-nht1hradsn67c2nv9m8llaikmqereanb.apps.googleusercontent.com"


const Login=()=>{

    const onSuccess = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        if ('profileObj' in res) {
            console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
        } else {
            console.log("LOGIN SUCCESS! Current user: ", res);
        }
    }

    const onFailure = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        if ('profileObj' in res) {
            console.log("LOGIN FAILURE! Error: ", res.profileObj);
        } else {
            console.log("LOGIN FAILURE! Error: ", res);
        }
    }

    return(
        <div id="signInButton">
            <GoogleLogin
                clientId={clientId}
                buttonText='Login'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />

        </div>
    )
}


export default Login;