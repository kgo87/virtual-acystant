import React from "react";
import Carousel from 'react-material-ui-carousel';
import "./CarouselImg.css";


export default function CarouselImgBCC( ) {

    return (
        <Carousel
            animation={"slide"}
        >
            <div>
                <img className="img" src={process.env.PUBLIC_URL + '/assets/images/bcc/ISIC_0032857.jpg' } alt="logo"/>
            </div>
            <div>
                <img className="img" src={process.env.PUBLIC_URL + '/assets/images/bcc/ISIC_0032894.jpg' } alt="logo"/>
            </div>
            <div>
                <img className="img" src={process.env.PUBLIC_URL + '/assets/images/bcc/ISIC_0032906.jpg' } alt="logo"/>
            </div>
            <div>
                <img className="img" src={process.env.PUBLIC_URL + '/assets/images/bcc/ISIC_0032959.jpg' } alt="logo"/>
            </div>
            <div>
                <img className="img" src={process.env.PUBLIC_URL + '/assets/images/bcc/ISIC_0032991.jpg' } alt="logo"/>
            </div>
        </Carousel>
    )
}