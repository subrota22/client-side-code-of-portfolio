import React from 'react';
import { Helmet } from 'react-helmet';
import { Typewriter } from 'react-simple-typewriter';
import "./Certifications.css" ;
const Certifications = () => {
    return (
        <>
          <Helmet><title>Certifications</title></Helmet>  
   <div className="container my-4 certificateLink fs-2 fw-bold">
  <div className='text-center mx-auto fs-2 fw-bold styleHeadOfCertificate p-4 rounded-2'>
  <img src="https://i.ibb.co/thnpV23/certificate-logo.png" alt="certificate logo" className='certificateImage float-start mx-2' />
     
  <img src="https://i.ibb.co/thnpV23/certificate-logo.png" alt="certificate logo" className='certificateImage float-end mx-2' />
       
                   
                    {
                        //My best projects that I made in 20/10/2022
                        <Typewriter
                            words={['Here I have my', 'some certificates link', 'that I am achive' , 'from free courses']}
                            loop={Infinity}
                            cursor
                            cursorStyle='_'
                            typeSpeed={90}
                            deleteSpeed={80}
                            delaySpeed={1000}
                        />
                    }
                </div>
          <ul className='certificateBg'>
            <li>
            <a href="https://drive.google.com/file/d/1qsa8bKqNuBTWnG5vt2K26bnWhNC15y9w/view?usp=sharing" rel="noreferrer" target="_blank"> 
          Full stack web development
          </a>
            </li>
            <li>
    
            <a href="https://drive.google.com/file/d/1TfAyyyIdNamGyjp_O87t8MI0_txF75QX/view?usp=sharing" rel="noreferrer" target="_blank"> 
      Web designing quiz
          </a>
            </li>
            <li>
            <a href="https://drive.google.com/file/d/1_HrJiIW0r0PNZGoQmrXV1-Gzitg7V9bt/view?usp=sharing" rel="noreferrer" target="_blank"> 
          MongoDB Tutorial
          </a>
            </li>
            <li>
            <a href="https://drive.google.com/file/d/19wfcXzof46KILyjyKeA0FHyRpBIpCA7p/view?usp=sharing" rel="noreferrer" target="_blank"> 
        Front End Development - HTML
          </a>
            </li>
            <li>
            <a href="https://drive.google.com/file/d/1MoVMGlPajCZQIYC9jVKE6ylO8oUZmP8g/view?usp=sharing" rel="noreferrer" target="_blank"> 
         JavaScript Projects
          </a>

            </li>
            <li>
                
          <a href="https://drive.google.com/file/d/17yrZMWVtL0IPUMfReBI994zoijS5oEH7/view?usp=sharing" rel="noreferrer" target="_blank"> 
          React Js Tutorial
          </a>
   
            </li>
            <li>
                
          <a href="https://drive.google.com/file/d/1OuwMNi6-HkCwfO9Ym4gni7CVN-bv4rf3/view?usp=sharing" rel="noreferrer" target="_blank"> 
         Computer network
          </a>

            </li>
            <li>
                      
          <a href="https://drive.google.com/file/d/1THwTGwLzwPyhNzN3KHS6tC2E1mLl9dqY/view?usp=sharing" rel="noreferrer" target="_blank"> 
        CSS Tutorial
          </a>
            </li>
            <li>
                
          <a href="https://drive.google.com/file/d/1xF2HAOnr-tT1s7xXNnEZ7KnQGyBjt32_/view?usp=sharing" rel="noreferrer" target="_blank"> 
          Basics Of JavaScript Programming
          </a>


   
            </li>
          </ul>
   </div>
        </>
    );
};

export default Certifications;