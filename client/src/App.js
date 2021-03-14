import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./components/pages/home/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Reset from "./components/auth/Reset";
import NewPassword from "./components/auth/NewPassword";
import Verify from "./components/auth/Verify";
import UserContext from "./context/UserContext";
import vimeo from './apis/vimeo';
import VideoItem from './components/pages/vidoes/VideoItem';
import VideoCard from './components/pages/vidoes/VideoCard';
import VideoCategory from './components/pages/vidoes/VideoCategory';
import VideoContext from "./context/VideoContext";


import "./style.css";

export default function App() {
  const KEY = 'AIzaSyAu7mSc1aVCgCMv8HwpNlPrZTXeaiV2jR4';
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  const [videos, setVideos] = useState([])
  const [selectedVideo, setSelectedVideo] = useState(null)

 

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
        <VideoContext.Provider value={{ videos, setVideos, selectedVideo, setSelectedVideo }}>
        <div className="container">
          <Header />
            <Switch>
            <Route exact path="/" component={Register} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/videos" component={VideoItem} />
              <Route exact path="/cards" component={VideoCard} />
              <Route exact path="/category" component={VideoCategory} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/verifyScreen" component={Verify} />
              <Route exact path="/reset" component={Reset} />
              <Route path="/reset/:token" component={NewPassword} />
            </Switch>
          </div>
          </VideoContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
