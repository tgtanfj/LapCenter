import React from "react";
import pageNotFoundImg from '../../assets/images/pagenotfound.jpg'
import { useNavigate } from "react-router-dom";
import './main1.css'

const PageNotFound = () => {
    const navigate = useNavigate()
    return (
        <div className="fage-not-found-content w-screen h-screen flex items-center justify-center">
            <div className="fage-not-found-container">
                <img className="picture2 w-[700px] h-screen" src={pageNotFoundImg}></img>
                <button className="back-to-home-button" onClick={() => navigate(('/'))}>Back to home</button>
            </div>
        </div>
    )
}

export default PageNotFound