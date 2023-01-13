import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import {Helmet} from "react-helmet";
const Blogs = () => {
    return (
        <>
        <Helmet> <title>Blogs </title></Helmet>
           <h2 className=' text-info fs-1 fw-bolder text-center' style={{ margin:"12% 0px" }}> 
        
           
           
           <div className='text-center fs-2 fw-bold text-info my-3'>
         {
                 <Typewriter
                 words={[' New blogs', 'coming soon .......']}
                 loop={Infinity}
                 cursor
                 cursorStyle='_'
                 typeSpeed={70}
                 deleteSpeed={50}
                 delaySpeed={1000}
               />
            }
         </div>

           </h2>  
        </>
    );
};

export default Blogs;