import React,{useState} from 'react'
import Axios from 'axios'

const Reset  = ()=>{
    const [email,setEmail] = useState("")
    const PostData = async ()=>{
       
       await Axios.post("http://localhost:5000/users/reset-password", {email})
    }
   return (
      <div className="ui container" style={{margin: '20px'}}>
         <h2>Enter your email</h2>
         <div className="ui action input">
         <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
         <button className="ui button primary" onClick={PostData}>Reset</button>
         </div>
      </div>
   )
}


export default Reset