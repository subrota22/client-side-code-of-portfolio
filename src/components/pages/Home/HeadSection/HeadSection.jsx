import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthProvider } from '../../../UserContext/UserContext';
import {ImClock} from "react-icons/im" ;
const HeadSection = () => {
    const {user} = useContext(AuthProvider) ;
    //show current time 

    setInterval(() => {
     let time = new Date().toLocaleTimeString() ;
     let displayTime = document.getElementById("time") ;
     displayTime.innerText = time ;
    } , 1000)

    return (
        <>
 
     <div className="container">
  
  <div className="d-flex flex-column flex-md-row justify-content-md-around">
  <div className="text-center my-2 ">
     <div><i className="fa-solid fa-angles-down mx-3 fs-2 fw-bolder my-2 resumeDirection"></i></div>
     <a href="Resume of Subrota chandra sarker.pdf" className='btn btn-outline-primary text-uppercase fw-bold py-2 m-2 w-auto'  download="Resume of Subrota chandra sarker.pdf"> Download resume  </a>
     </div>
     <div className='d-flex flex-row justify-content-between mt-4' style={{height:"80px" , width:"320px"}}>
       <span className='fs-2 mx-4 mt-2'>
       <ImClock></ImClock>
       </span>
<span id="time" className='fs-2 fw-bolder my-2 text-center' style={{color:"white" ,
fontFamily: "Georgia, serif"}}>   </span>
 
     </div>

      <div className="text-center my-2 ">
      <div><i className="fa-solid fa-angles-down mx-3 fs-2 fw-bolder my-2 resumeDirection"></i></div>
      <NavLink to="/reference" className="text-decoration-none
      btn btn-outline-info fw-bold text-white hideBtn"> Give me refference  <i className="fa-solid fa-arrow-right showDetailsAnimation"></i> </NavLink>
      </div>
 
     </div>
 </div>   
 
{
      user?.email ===  "subrota45278@gmail.com" && <>
  <div className="container">
  
  <div className="d-flex flex-column m-auto">
  <div className="text-center my-2 ">
      <div>
         <i className="fa-solid fa-angles-down mx-3 fs-2 fw-bolder my-2 resumeDirection"></i></div>
         <NavLink to="/add-new-project" className="text-decoration-none
      btn btn-outline-info fw-bold text-white hideBtn">   Add new project  <i className="fa-solid fa-arrow-right showDetailsAnimation"></i> </NavLink>
      </div>
 
     </div>
 </div>  
    </>
}  
        </>
    );
};

export default HeadSection;