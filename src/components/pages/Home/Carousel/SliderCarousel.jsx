import React, { useState } from 'react'
import CarouselSlider from 'react-carousel-slider';
import { Typewriter } from 'react-simple-typewriter';
import PageLoad from '../../../share/PageLoad/PageLoad';

export const SliderCarousel = () => {
    const [projects, setProjects] = useState([]);
    const [pageLoad, setPageLoad] = useState(true);
console.log(projects);
        let items = projects?.map((item) => 

             <div ke={item?._id}>
                <a href={item?.liveWebsiteLink} target="_blank"  rel="noreferrer">

          
                   <img src = {item?.projectImage ? item?.projectImage : "https://i.ibb.co/RSCmwXf/imagenot.jpg"} alt={item?.projectImage}></img>
                <p className='text-white fw-5 fw-bolder bg-success'>Project name: {item?.projectName?.length > 20 ? item?.projectName.slice(0,20) + "..." : item?.projectName}</p>
                </a>
             </div>
          
        );

        React.useEffect(() => {
            fetch(`https://subrota-server-subrota22.vercel.app/projects`)
                .then(res => res.json())
                .then(data => {
                    setProjects(data?.data);
                    setPageLoad(false);
                })
                .catch(error => console.log(error))
        }, []);


        if (pageLoad) {
            return <PageLoad></PageLoad>
        }

        return (
        <>
        <div className="my-5">
        <div className='text-center mx-auto fs-2 fw-bold styleHeadOfContent p-4 rounded-2'>
                    {
                        //My best projects that I made in 20/10/2022
                        <Typewriter
                            words={['My best projects', 'images', 'are here']}
                            loop={Infinity}
                            cursor
                            cursorStyle='_'
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        />
                    }
                </div>
        <CarouselSlider 
            slideCpnts = {items} />
        </div>
        </>);
    }
