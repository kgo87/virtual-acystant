import React from "react";
import Carousel from 'react-material-ui-carousel';
import "./CarouselImg.css";


export default function CarouselImgAK( ) {

    return (
        <Carousel
            animation={"slide"}
        >
            <div>
                <img className="img" src={process.env.PUBLIC_URL + '/assets/images/akiec/ISIC_0032437.jpg' } alt="logo"/>
            </div>
            <div>
                <img className="img" src={process.env.PUBLIC_URL + '/assets/images/akiec/ISIC_0032455.jpg' } alt="logo"/>
            </div>
            <div>
                <img className="img" src={process.env.PUBLIC_URL + '/assets/images/akiec/ISIC_0032854.jpg' } alt="logo"/>
            </div>
            <div>
                <img className="img" src={process.env.PUBLIC_URL + '/assets/images/akiec/ISIC_0032897.jpg' } alt="logo"/>
            </div>
            <div>
                <img className="img" src={process.env.PUBLIC_URL + '/assets/images/akiec/ISIC_0032947.jpg' } alt="logo"/>
            </div>
        </Carousel>
    )
}