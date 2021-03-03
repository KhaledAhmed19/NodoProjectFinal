import React, {useContext} from 'react';
import VideoContext from '../../../context/VideoContext'

const VideoDetail = () => {

  const {selectedVideo} = useContext(VideoContext)
  if (!selectedVideo) {
    return <div>Loading...</div>;
  }

  const videoSrc = `https://www.youtube.com/embed/${selectedVideo.id.videoId}`;

  return (
    <div >
      
        <iframe title="video player" src={videoSrc} height="500" width="700" style={{marginTop: '5px'}}/>
      
      
      
    </div>
  );
};

export default VideoDetail;
