import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { BiSend } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { toast } from 'react-toastify';
import { AuthProvider } from '../../UserContext/UserContext';

const Refferall = () => {
    const {user , setUserData} = useContext(AuthProvider) ;
    const [referallLoad, setreferallLoad] = useState(false);
    const naviagate = useNavigate() ;
    const submitReferenceData = (event) => {
     event.preventDefault() ;
     if(!user?.emailVerified){
        naviagate("/login") ;
        toast.info("You need to login and verify your email to give a reference.");
        return ;
    }
     const name= event.target.name.value.trim() ;
     const email= event.target.email.value.trim() ;
     const phone_number= event.target.phone_number.value.trim() ;
     const organization= event.target.organization.value.trim() ;
     const reference= event.target.reference.value.trim() ;
     const referenceSubmitedData = {
        name:name ,
        email:email ,
        image:user?.photoURL,
        phone_number:phone_number ,
        organization:organization ,
        referenceMessage : reference ,
        referenceDate :  new Date().toLocaleDateString() ,
        referenceTime: new Date().toLocaleTimeString() ,
     }
    // console.log(name);
    fetch(`https://subrota-server.vercel.app/references` , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authentication: `Bearer ${localStorage.getItem("portfolio-token")} `
        },
        body: JSON.stringify(referenceSubmitedData)
    })
    .then(res =>  {

        if (res.status === 403) {
            toast.warning("  😩 😩 You do have not access to reference right now. 😩 😩 ");
            setUserData({}) ;
            setreferallLoad(false) ;
       
        } else {
            return res.json();
        }
    })
    .then(data => {
        if(data?.acknowledged) {
            toast.success("You have given references successfully !!");
            naviagate("/") ;
        } else if(data.message === true ){
            toast.success(" You had given a reference !!");
            naviagate("/referral") ;
        }
    })
    } ;

    return (
        <>
            <Helmet><title>Reference</title></Helmet>
          <div className="my-5">
          <div className="bg-info text-white fs-2 text-center w-50 m-auto text-uppercase fw-bolder py-3 ">Give reference</div>
    <form  onSubmit={submitReferenceData} className="was-validated w-50 m-auto mb-5
     bg-dark p-5 rounded-0 text-white h-auto" data-aos="zoom-in" data-aos-anchor-placement="center-center "
        data-aos-duration="2000">
        <div className="mb-3">
            <label for="name" className="form-label">Name</label>
            <input type="text" name="name" className="form-control" id="name" placeholder="Enter your name here" required />
            <div className="invalid-feedback alert alert-danger">Please enter your valid name </div>
            <div className="valid-feedback alert alert-success">Name will be valid if you entered valid name.</div>
        </div>
        <div className="mb-3">
            <label for="email" className="form-label">Email address</label>
            <input type="email" name="email" className="form-control" id="email" placeholder="Enter your email here"
                required />
            <div className="invalid-feedback alert alert-danger">Please enter your valid email address </div>
            <div className="valid-feedback alert alert-success">Email address will be valid if you entered valid email
                address.</div>
        </div>
        <div className="mb-3">
            <label for="phone_number" className="form-label">Phone number </label>
            <input type="text" name="phone_number" className="form-control" id="phone_number"
                placeholder="Enter your phone number here" required />
            <div className="invalid-feedback alert alert-danger">Please enter your valid phone number </div>
            <div className="valid-feedback alert alert-success">Phone number will be valid if you entered valid phone
                number.</div>
        </div>

        <div className="mb-3">
            <label for="organization" className="form-label"> Organization / Company </label>
            <input type="text" name="organization" className="form-control" id="organization"
                placeholder="Enter your organization here" required />
            <div className="invalid-feedback alert alert-danger">Please enter your  Organization / Company name </div>
            <div className="valid-feedback alert alert-success">Organization will be valid if you entered valid Organization / Company name</div>
        </div>
        <div className="mb-3">
            <label for="messge" className="form-label"> Reference  </label>
            <textarea className="form-control" name="reference" placeholder="Enter your reference text" id="messge" rows="5"
                required></textarea>
        </div>
        <div>
            <button className="btn btn-outline-primary text-white w-100 fw-bold  pt-2 sendBtn">
              
            {referallLoad ? <ClipLoader color='white' className='pb-3'></ClipLoader> : <>
            Send reference
            <BiSend className='float-end fs-2 sendSign'></BiSend></>}
         
            </button>
        </div>
    </form>
          </div>
        </>
    );
};

export default Refferall;