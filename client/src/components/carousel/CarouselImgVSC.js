import React from "react";
import Carousel from 'react-material-ui-carousel';
import "./CarouselImg.css";

export default function CarouselImgVSC( ) {

    return (
        <Carousel
            animation={"slide"}
        >
            <div>
                <img className="img" src={process.env.PUBLIC_URL + '/assets/images/vasc/ISIC_0032932.jpg' } alt="logo"/>
            </div>
            <div>
                <img className="img" src={process.env.PUBLIC_URL + '/assets/images/vasc/ISIC_0033031.jpg' } alt="logo"/>
            </div>
            <div>
                <img className="img" src={process.env.PUBLIC_URL + '/assets/images/vasc/ISIC_0033092.jpg' } alt="logo"/>
            </div>
            <div>
                <img className="img" src={process.env.PUBLIC_URL + '/assets/images/vasc/ISIC_0033123.jpg' } alt="logo"/>
            </div>
            <div>
                <img className="img" src={process.env.PUBLIC_URL + '/assets/images/vasc/ISIC_0033135.jpg' } alt="logo"/>
            </div>
        </Carousel>
    )
}