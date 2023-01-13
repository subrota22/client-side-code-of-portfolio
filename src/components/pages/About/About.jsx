import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import {Helmet} from "react-helmet";
const About = () => {
    return (
    <>
    <Helmet> <title> About me </title></Helmet>
        <div className='aboutPage'>
        <div className='text-center fs-2 fw-bold text-info my-3 text-uppercase'>
         {
                 <Typewriter
                 words={['Welcome in ', 'my about ' , 'page thanks',  'for your interent' , 'to know about me !!']}
                 loop={Infinity}
                 cursor
                 cursorStyle='_'
                 typeSpeed={70}
                 deleteSpeed={50}
                 delaySpeed={1000}
               />
            }
         </div>
            <div className="card  h-100 bg-dark">
                <img src="https://i.ibb.co/mGqLDhL/subrota.png" className="card-img-top w-75 rounded-2 aboutPage" alt="Subrota chandra" />
                <div className="card-body">
                    <h5 className="card-title">Name : Subrota chandra sarker </h5>
                    <p className="card-text"> 
                    About me :  I am a full-stack web developer I am include in this work almost four years.
                    I am goot at in HTML , CSS3 , Bootstrap5 , Tailwind CSS , React.js , Node.js , javaScript ,
                    PHP, MongoDB, and MYSQL that's it. My education qualification I am under graduated I pass HSC in 2020 from the science division after that now I am practicing CSE subject to learn 
                    new things every day the real thing is I love coding and programming to face the new 
                    problem every time. I am not at all a first learner but I can understand new technology 
                    after practicing and working it is not for a long time it depends on my working 
                    processes thank my dear friend to read this text.  I am a full-stack web developer I am include in this work almost four years.
                    I am goot at in HTML , CSS3 , Bootstrap5 , Tailwind CSS , React.js , Node.js , javaScript ,
                    PHP, MongoDB, and MYSQL. My education qualification I am an undergraduate I pass HSC in 2020 from the science division after that now I am practicing CSE subject to learn 
                    new things every day the real thing is I love coding and programming to face new 
                    problems every time. I am not at all a first learner but I can understand new technology 
                    after practicing and working it is not for a long time it is dependent on my working 
                    processes thank my dear friend to read this text.  </p>
                   <a href="http://subrotachandra.lovestoblog.com/" target="_blank" rel='noreferrer' className='my-3 py-3 mx-5 w-50 btn btn-outline-primary'> Visit my website  <i className="fa-solid fa-arrow-right mx-5"></i> </a>
                </div>
            </div>
        </div>
    </>
    );
};

export default About;