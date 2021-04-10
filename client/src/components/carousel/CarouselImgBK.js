import React from "react";
import Carousel from 'react-material-ui-carousel';
import "./CarouselImg.css";


export default function CarouselImgBK( ) {

    return (
        <Carousel
            animation={"slide"}
        >
            <div>
                <img className="img" src={process.env.PUBLIC_URL + '/assets/images/bkl/ISIC_0031436.jpg' } alt="logo"/>
            </div>
            <div>
                <img className="img" src={process.env.PUBLIC_URL + '/assets/images/bkl/ISIC_0031449.jpg' } alt="logo"/>
            </div>
            <div>
                <img className="img" src={process.env.PUBLIC_URL + '/assets/images/bkl/ISIC_0031459.jpg' } alt="logo"/>
            </div>
            <div>
                <img className="img" src={process.env.PUBLIC_URL + '/assets/images/bkl/ISIC_0031464.jpg' } alt="logo"/>
            </div>
            <div>
                <img className="img" src={process.env.PUBLIC_URL + '/assets/images/bkl/ISIC_0031465.jpg' } alt="logo"/>
            </div>
        </Carousel>
    )
}