import React from "react";
import Carousel from 'react-material-ui-carousel';
import "./CarouselImg.css";


export default function CarouselImgMNVI( ) {

    return (
        <Carousel
            animation={"slide"}
        >
            <div>
                <img className="img" src={process.env.PUBLIC_URL + '/assets/images/nv/ISIC_0033265.jpg' } alt="logo"/>
            </div>
            <div>
                <img className="img" src={process.env.PUBLIC_URL + '/assets/images/nv/ISIC_0033266.jpg' } alt="logo"/>
            </div>
            <div>
                <img className="img" src={process.env.PUBLIC_URL + '/assets/images/nv/ISIC_0033273.jpg' } alt="logo"/>
            </div>
            <div>
                <img className="img" src={process.env.PUBLIC_URL + '/assets/images/nv/ISIC_0033276.jpg' } alt="logo"/>
            </div>
            <div>
                <img className="img" src={process.env.PUBLIC_URL + '/assets/images/nv/ISIC_0033277.jpg' } alt="logo"/>
            </div>
        </Carousel>
    )
}