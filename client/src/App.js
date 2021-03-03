import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/layout/Header";
import Home from "./components/pages/home/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UserContext from "./context/UserContext";
import vimeo from './apis/vimeo';
import VideoList from './components/pages/vidoes/VideoList';
import VideoDetail from './components/pages/vidoes/VideoDetail'
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

  const onTermSubmit = async () => {
    const response = await vimeo.get('/users/134710807', {
      headers: {
        Authorization: 'bearer 1db8a14552d7b885b42465cc03cd7276'
      }
    })
  

    
        console.log(response.data)      
     
   
  };


  useEffect(() => {
  /*  const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/users/", {
          headers: { "auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    }; */

   // checkLoggedIn();
    onTermSubmit();
   /* document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });*/
  }, []);

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
              <Route exact path="/videos" component={VideoList} />
              <Route exact path="/videoDetail" component={VideoDetail} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </div>
          </VideoContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
