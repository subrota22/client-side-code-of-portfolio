import React from 'react';
import { Helmet } from 'react-helmet';
import Projects from '../Projects/Projects';
import Skills from '../Skills/Skills';
import { SliderCarousel } from './Carousel/SliderCarousel';
import HeadSection from './HeadSection/HeadSection';
import MainSection from './MainSection/MainSection';
const Home = () => {
 return (
 <>
<Helmet><title> Home page </title></Helmet>
<HeadSection></HeadSection>
<SliderCarousel></SliderCarousel>
    <Projects></Projects>
         <Skills></Skills>
         <MainSection></MainSection>
        </>
    );
};

export default Home;