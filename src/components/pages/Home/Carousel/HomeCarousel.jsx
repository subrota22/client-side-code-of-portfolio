import React  from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import "./HomeCarousel.css" ;
const HomeCarousel = () => {
    return (
        <>
                    <div className="container rounded-2">
             <Carousel>
            <div>
                    <img src="https://static-01.daraz.com.bd/p/4ea5f4f3e0759187c2e101235cea2698.png" alt='carousel' className='carouselImage rounded-2'/>
                    <p className="legend">Project image  1</p>
                </div>
                <div>
                    <img src="https://i.pinimg.com/736x/d2/9b/63/d29b63f956215ead3f9c4ed98f226901.jpg" alt='carousel' className='carouselImage rounded-2'/>
                    <p className="legend">Project image  2</p>
                </div>
                <div>
                    <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1593123524i/54268137._UY1000_SS1000_.jpg" alt='carousel' className='carouselImage rounded-2'  />
                    <p className="legend">Project image  3</p>
                </div>
           
            </Carousel>
            </div>
        </>
    );
};

export default HomeCarousel;