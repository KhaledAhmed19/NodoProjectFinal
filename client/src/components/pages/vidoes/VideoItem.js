import './VideoItem.css';
import axios from 'axios'
import React, {useContext, useRef, useEffect} from 'react';
import flv from 'flv.js'
import { useHistory, Link } from "react-router-dom";
import UserContext from "../../../context/UserContext";


const VideoItem = () => {
  const videoRef = useRef(null)
  const history = useHistory()
  let player = null
  
  useEffect(()=> {
    player = flv.createPlayer({
      type: 'flv',
      url: 'http://localhost:8000/live/video.flv'
    });
    player.attachMediaElement(videoRef.current);
    player.load();
  }, [])

const startStream = () => {
  player.play()
}
  const { userData } = useContext(UserContext);
  const unsubscribe = async() => {
    
    
    await fetch('http://localhost:5000/users/unsubscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: userData.user.id
      }),
    })
        await axios.put('http://localhost:5000/users/changeStatus', {id: userData.user.id, subscribed: false, subId: ''})
        console.log("Unsubscribed done")
        history.push("/home")

    
  }

  /* 
  */
 
  
  return (
    <div className= "ui container">
      <Link to="/cards"><h1>Change cameras..</h1></Link>
    <div className="ui two stackable cards" style={{marginTop: '10px'}}> 
      <div className="ui card">
    <iframe src="https://vimeo.com/event/781154/embed" width="385" height="300" frameBorder="0"  allowFullScreen>
    </iframe>
    </div>
    <div className="ui card" >
    <iframe src="https://vimeo.com/event/779580/embed" width="385" height="300" frameBorder="0"  allowFullScreen>
    </iframe>
    </div>
    <div className="ui card" >
    <iframe src="https://vimeo.com/event/779973/embed" width="385" height="330" frameBorder="0"  allowFullScreen>
    </iframe>
    </div>
    <div className="ui card" style={{backgroundColor: 'black'}}>
    <video ref={videoRef} width="385" height="300" />
    <button className="ui button primary tiny" onClick={startStream}>OBS Stream</button>
    </div>
  </div>
  <button className="ui icon button red inverted mini" title="Unsubscribe" onClick={unsubscribe} style={{marginBottom: '20px', position: 'fixed', 
    bottom: '0', 
    left: '0',
    
}}>
  <i className="window close icon"></i>
  </button>
  </div>

  
    
  );
};

export default VideoItem;
