import React from 'react'
import {useHistory} from 'react-router-dom'
import {auth} from './firebase'

export default function Verify(){
    const history = useHistory()
    const verifyUser = () => {
        auth.currentUser.reload()
        setTimeout(verifyUserAgain, 3000)
      }
    
      
      const verifyUserAgain = () => {
        if(auth.currentUser.emailVerified){
            history.push("/home")
        }
        else {
            window.alert("Please verify your email first")
        }
      }

    return(
        <div>
            <h2>Click the button after verifying your email</h2>
            <button className="ui button primary" onClick={verifyUser}>Verify</button>
        </div>
    )
}