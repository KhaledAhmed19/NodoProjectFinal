import React, {useContext} from 'react';
import VideoItem from './VideoItem';
import axios from 'axios'
import VideoContext from '../../../context/VideoContext'
import { Button } from '@material-ui/core';

const VideoList = () => {
  const {videos} = useContext(VideoContext)

  const unsubscribe = async() => {
    try {
      const userUnsubscribe = await axios.post(
        "http://localhost:5000/users/unsubscribe"
      );
      console.log(userUnsubscribe.data)
    }
    catch(err){
      console.log(err.response.data.msg)
    }
  }

  const renderedList = videos.map(video => {
    return (
      
      <div key={video.id.videoId}  style={{background: 'rgba(12, 11, 11, 0.72)', 
       border: '1px solid #9749f7'}}>
      <VideoItem 
        video={video}
      />
      </div>
      
    );
  });

  return(
    <div > 
      <div  style={{marginTop: '5px'}}>{renderedList}</div>
      <button className="ui icon button red inverted mini" title="Unsubscribe" style={{marginBottom: '20px', position: 'fixed', 
        bottom: '0', 
        left: '0',
        
  }}>
      <i className="window close icon"></i>
      </button>
      
    </div>
    
  ) 
};

export default VideoList;
