import React, {  } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import {Helmet} from "react-helmet";
// import FadeLoader from "react-spinners/FadeLoader"; 
import Wave from 'react-wavify'
const Details = () => {
    // const [pageLoad , setPageLoad ] = useState(true) 
    const detailsInfo = useLoaderData();
    // const [details , setDetails] = useState([]) ;
    // console.log("==>" , details);
    // React.useEffect(() => {
    //     // if(!detailsInfo[0].projectId) return ;
    //     fetch(`https://portfolio-lake-nu-82.vercel.app/details/${detailsInfo[0].projectId}`)
    //     .then(res => res.json())
    //     .then( data => {setDetails(data) ; setPageLoad(false)} ) ;
    // }, [detailsInfo]);
     
    // if(pageLoad){
    //     return <div style={{margin:"20% 50%"}}><FadeLoader color="#36d7b7"  /></div>
    //  }

    return (
     <>
     <Helmet> <title> Project details </title></Helmet>
        <div>
    
    <div className='text-center fs-2 fw-bold text-info my-3'>
    {
            <Typewriter
            words={['Details information', 'about the', detailsInfo[0].projectName]}
            loop={Infinity}
            cursor
            cursorStyle='_'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
       }
    </div>
    <div className='my-5'>
    <Wave mask="url(#mask)" fill="#1277b0" >
            <h2> Hello </h2>
  <defs>
    <linearGradient id="gradient" gradientTransform="rotate(90)">
      <stop offset="0" stopColor="white" />
      <stop offset="0.5" stopColor="black" />
    </linearGradient>
    <mask id="mask">
      <rect x="0" y="0" width="2000" height="200" fill="url(#gradient)"  />
    </mask>
  </defs>
</Wave>
    </div>
       <div className="container">
           <div className="row">
 

               {
              
              detailsInfo.map(detail =>
                       <div className="col col-12 col-sm-12 col-md-6 col-lg-4 my-3" key={detail?._id}>
                           <div className="h-100 cardBackground text-white" data-aos="zoom-in" data-aos-delay="600"  data-aos-duration="2000" >
                               <img src={detail?.image} className="card-img-top myImage rounded-2" alt="detail" />
                               <div className="card-body p-3">
                                   <h5 className="card-title"> Project name: {detail?.projectName}</h5>
                                   <h5 className="card-title">Project section : {detail?.projectTitle}</h5>
                                   <p className="card-text">Project details : {detail?.details}</p>
                               </div>
                           </div>
                       </div>
                   )
               }
           </div>
       </div>
   </div></>
    );
};

export default Details;