import React from "react";
import Carousel from 'react-material-ui-carousel';
import "./CarouselImg.css";

export default function CarouselImgDF( ) {

    return (
        <Carousel
            animation={"slide"}
        >
            <div>
                <img className="img" src={process.env.PUBLIC_URL + '/assets/images/df/ISIC_0031429.jpg' } alt="logo"/>
            </div>
            <div>
                <img className="img" src={process.env.PUBLIC_URL + '/assets/images/df/ISIC_0031443.jpg' } alt="logo"/>
            </div>
            <div>
                <img className="img" src={process.env.PUBLIC_URL + '/assets/images/df/ISIC_0031457.jpg' } alt="logo"/>
            </div>
            <div>
                <img className="img" src={process.env.PUBLIC_URL + '/assets/images/df/ISIC_0031799.jpg' } alt="logo"/>
            </div>
            <div>
                <img className="img" src={process.env.PUBLIC_URL + '/assets/images/df/ISIC_0031827.jpg' } alt="logo"/>
            </div>
        </Carousel>
    )
}