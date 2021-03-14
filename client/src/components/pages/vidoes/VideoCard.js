import React from 'react'
import cinema from './cinema.jpg'
import sport from './sport.png'
import arts from './arts.jpg'
import music from './music.jpg'
import {Link, useHistory} from 'react-router-dom'

export default function VideoCard () {
    const history = useHistory()
    const goCategory = () => {
        history.push("/category")
    }
    return(
        <div className="ui conatiner">
            <h2>Pick a category..</h2>
        <div className= "ui cards">
        <div className="ui card" style={{cursor: 'pointer' }} onClick={goCategory}>
            <div className="image">
                <img src={cinema} />\
            </div>
        <div className="content">
            <div className="header">Cinema</div>
            </div>
            </div>
            <div className="ui card" style={{cursor: 'pointer' }} onClick={goCategory}>
            <div className="image">
                <img src={sport} />\
            </div>
        <div className="content">
            <div className="header">Sport</div>
            </div>
            </div>
            <div className="ui card" style={{cursor: 'pointer' }} onClick={goCategory}>
            <div className="image">
                <img src={arts} />\
            </div>
        <div className="content">
            <div className="header">Arts</div>
            </div>
            </div>
            <div className="ui card" style={{cursor: 'pointer' }} onClick={goCategory}>
            <div className="image">
                <img src={music} />\
            </div>
        <div className="content">
            <div className="header">Music</div>
            </div>
            </div>
            </div>
            </div>
    )
}