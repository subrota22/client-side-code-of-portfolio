import React from 'react';
import Projects from '../Projects/Projects';
import Skills from '../Skills/Skills';
import HeadSection from './HeadSection/HeadSection';
import MainSection from './MainSection/MainSection';
const Home = () => {
 return (
 <>

<HeadSection></HeadSection>
    <Projects></Projects>
         <Skills></Skills>
      <MainSection></MainSection>
   
        </>
    );
};

export default Home;