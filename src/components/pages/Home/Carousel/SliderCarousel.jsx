import React, { useState } from 'react'
import CarouselSlider from 'react-carousel-slider';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { Typewriter } from 'react-simple-typewriter';
import PageLoad from '../../../share/PageLoad/PageLoad';

export const SliderCarousel = () => {
    const [projects, setProjects] = useState([]);
    const [pageLoad, setPageLoad] = useState(true);
    const sliderBoxStyle = {
        backgroundColor: "#030537",
        color: "white",
        padding: "0px",
        borderRadius: "20px"
    }

    let manner = {
        autoSliding: { interval: "3s" },
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
                background: "rgba(6, 3, 55 )",
                borderRadius: "50%"
            },
            right: {
                height: "50px",
                width: "50px",
                color: "#929393",
                background: "rgba(6, 3, 55 )",
                borderRadius: "50%"
            }
        }
    };

    let itemsStyle = {
        padding: "0px",
        background: "white",
        margin: "0 30px",
        boxShadow: "1px 1px 1px 1px #9E9E9E",
        borderRadius: "4px"
    };

    let imgStyle = {
        height: "70%",
        borderBottom: "1px solid #9E9E9E",
        width: "60%",
    };

    let btnStyle = {
        display: "inline-block",
        position: "relative",
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: "36px"
    }
    let btnWrapperStyle = {
        position: "relative",
        borderRadius: "50%",
        height: "50px",
        width: "50px",
        boxShadow: "1px 1px 1px 1px #9E9E9E",
        textAlign: "center"
    }

    let rBtnCpnt = (<div style={btnWrapperStyle} >
        <div style={btnStyle} className="material-icons" >

            <BsArrowRight></BsArrowRight>
        </div>
    </div>);

    let lBtnCpnt = (<div style={btnWrapperStyle} >
        <div style={btnStyle} className="material-icons" >
            <BsArrowLeft></BsArrowLeft>
        </div>
    </div>);


    let items = projects?.map((item) =>

        <div ke={item?._id} className="p-sm-5 p-md-0">
            <a href={item?.liveWebsiteLink} target="_blank" rel="noreferrer">
                <img src={item?.projectImage ? item?.projectImage : "https://i.ibb.co/RSCmwXf/imagenot.jpg"} alt={item?.projectImage}

                ></img>
                <p className='text-white fw-5 fw-bolder bg-success'>Project name: {item?.projectName?.length > 20 ? item?.projectName.slice(0, 20) + "..." : item?.projectName}</p>
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
            <div className="my-5 ">
                <div className='text-center mx-auto fs-2  container fw-bold styleHeadOfContent p-4 rounded-2'>
                    {
                        //My best projects that I made in 20/10/2022
                        <Typewriter
                            words={['My best projects', 'images and links', 'are here']}
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
                    itemsStyle={itemsStyle}
                    imgStyle={imgStyle}
                    sliderBoxStyle={sliderBoxStyle}
                    buttonSetting={buttonSetting}
                    slideCpnts={items}
                    manner={manner}
                    rBtnCpnt={rBtnCpnt}
                    lBtnCpnt={lBtnCpnt}

                />

            </div>
        </>);
}
