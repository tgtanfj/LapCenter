import banner01 from '../../assets/slider/1.jpg'
import banner02 from '../../assets/slider/2.jpg'
import banner03 from '../../assets/slider/3.jpg'
import banner04 from '../../assets/slider/4.jpg'
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Slider = () => {
    return (
        <div>
            <Carousel interval={3000} infiniteLoop={true} autoPlay={true}>
                <div>
                    <img src={banner03} />
                </div>
                <div>
                    <img src={banner04} />
                </div>
                <div>
                    <img src={banner01} />
                </div>
                <div>
                    <img src={banner02} />
                </div>
                
            </Carousel>
        </div>
    )
}

export default Slider