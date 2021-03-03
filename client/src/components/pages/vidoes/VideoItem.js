import './VideoItem.css';
import React, {useContext} from 'react';
import VideoContext from '../../../context/VideoContext'
import { useHistory } from "react-router-dom";


const VideoItem = ({ video}) => {
  const {setSelectedVideo} = useContext(VideoContext)
  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
  const history = useHistory()
  const selectVideo = () => {
    setSelectedVideo(video)
    history.push("/videoDetail")  
  }
 
  
  return (
    
    
    <iframe src="https://player.vimeo.com/video/518119627" width="640" height="360" frameBorder="0"
    allowFullScreen></iframe>

  
    
  );
};

export default VideoItem;
