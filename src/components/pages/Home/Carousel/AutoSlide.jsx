import React from 'react';
import CarouselSlider from 'react-carousel-slider';
const AutoSlide = () => {
  const jsonData =   {
        "autoSliding": {
             "items": [
                 {
                     "imgSrc": "https://i.pinimg.com/originals/ee/04/37/ee043767048ca2de89bc45f9ba07f620.jpg",
                     "name":"Susmita" ,
                 },
                 {
                     "imgSrc": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrrfUTFYjJXhseZBc0W1NYw5ug4HvKHytMbA&usqp=CAU",
                     "name" : "Allena",
                 },
                 {
                     "imgSrc": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO9AuSzodzuASrnVDFp-9m50tRnCRtZD-iww&usqp=CAU",
                     "name" : "Papia",
                 },
                 {
                     "imgSrc": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjU6ZIHCQtHZ4j9rbUziNdfMTMQtftKCMvWQ&usqp=CAU",
                     "name" : "Papia",
                 }
             ]
         }
     }
 
    let manner = {
        autoSliding: {interval: "3s"},
        duration: "2s"
    };
    
    let accEleSetting;

    let mobileRegx = /Mobi|Tablet|iPad|iPhone/;
    if (mobileRegx.test(navigator.userAgent)) {
        accEleSetting.button = false;
    }

    let buttonSetting = {
        placeOn: "middle-inside",
        hoverEvent: true,
        style: {
            left: {
                height: "50px",
                width: "50px",
                color: "#929393",
                background: "rgba(225, 228, 232, 0.8)",
                borderRadius: "50%"
            },
            right: {
                height: "50px",
                width: "50px",
                color: "#929393",
                background: "rgba(225, 228, 232, 0.8)",
                borderRadius: "50%"
            }
        }
    };
    return (
        <>
           <CarouselSlider slideItems = {jsonData.autoSliding.items}  
                                manner = {manner} 
                                buttonSetting = {buttonSetting} />;  
        </>
    );
};

export default AutoSlide;