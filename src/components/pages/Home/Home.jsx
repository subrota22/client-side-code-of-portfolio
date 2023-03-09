import Spline from '@splinetool/react-spline';
import React from 'react';
import { Helmet } from 'react-helmet';
import Projects from '../Projects/Projects';
import Skills from '../Skills/Skills';
import { SliderCarousel } from './Carousel/SliderCarousel';
import HeadSection from './HeadSection/HeadSection';
import MainSection from './MainSection/MainSection';
import styled from 'styled-components';
const Home = () => {

    const Wrapper = styled.section`
 height:800px;
 width:100%;
 border-radius:28px;
 margin-top:23px;
 margin-bottom:23px;
 padding:35px;
 transform:translateX(10px) translateY(8px) rotateY(2deg) ;
`;

    return (
        <>
            <Helmet><title> Home page </title></Helmet>

            <HeadSection></HeadSection>



            <SliderCarousel></SliderCarousel>
            <Projects></Projects>
            <Skills></Skills>

            <div className="d-flex flex-column mx-auto flex-lg-row justify-content-between my-5" style={{width:"90%"}}>
                <div className='w-100 mx-5'>
                    <Wrapper>
                        <Spline scene="https://prod.spline.design/0I7jHsVGuSAZX6hk/scene.splinecode" />
                    </Wrapper>
                </div>
                <div className='w-100 mx-5'>
                    <Wrapper>
                    <Spline scene="https://prod.spline.design/3SK8XaboD12dLRqV/scene.splinecode" />
                  </Wrapper>
                </div>
            </div>

            <MainSection></MainSection>
        </>
    );
};

export default Home;