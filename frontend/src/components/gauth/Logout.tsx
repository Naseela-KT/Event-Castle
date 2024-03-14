import {GoogleLogout} from 'react-google-login';

const clientId="954816881980-nht1hradsn67c2nv9m8llaikmqereanb.apps.googleusercontent.com"


const Logout=()=>{

    const onSuccess = () => {
        console.log("Google Logout successfull....");
        
    }

    return(
        <div id="signInButton">
            <GoogleLogout
                clientId={clientId}
                buttonText='Logout'
                onLogoutSuccess={onSuccess}
            />

        </div>
    )
}


export default Logout;