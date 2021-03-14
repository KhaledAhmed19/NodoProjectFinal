import React,{useState} from 'react'
import {useHistory,useParams} from 'react-router-dom'
import Axios from 'axios'

const NewPassword  = ()=>{
    const history = useHistory()
    const [password,setPassword] = useState("")
    const {token} = useParams()

    const PostData = async()=>{
       await Axios.post("http://localhost:5000/users/new-password", {token, password})
       history.push("/login")
    }
   return (
      <div className="ui container" style={{margin: '20px'}}>
      <h2>Enter your new Password</h2>
      <div className="ui action input">
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="ui button primary" onClick={PostData}>Update</button>
      </div>
   </div>
      
   )
}


export default NewPassword