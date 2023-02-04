import React from 'react';
import { Helmet } from "react-helmet";
import { BiPhoneCall, BiSend } from "react-icons/bi";
import { TfiEmail, TfiLinkedin, TfiTwitter } from "react-icons/tfi";
import { IoLocation } from "react-icons/io5";
const Contact = () => {
    return (
        <>
            <Helmet> <title> Contact me </title></Helmet>
            <div className="my-5">
                <div className="container">
                    <div className="row">
                        <div className="d-flex flex-column flex-md-row justify-content-around">
                            <div className='my-5 contactInfo'>
                                <ul>
                                    <li> <span><BiPhoneCall></BiPhoneCall> </span> Phone number : +8801977975618 </li>
                                    <li> <span><TfiEmail></TfiEmail></span> Email: subrota45278@gmail.com </li>
                        
                                    <li>
                                <span>      <TfiLinkedin></TfiLinkedin> </span>
                               <a href="https://www.linkedin.com/in/subrota-chandra-sarker-full-stack-developer/" target="_blank"  rel="noreferrer">
                               LinkedIn
                               </a>
                                    </li>
                                    <li>
                                <span>      <TfiTwitter></TfiTwitter> </span>
                               <a href="https://twitter.com/Subrota21087778" target="_blank"  rel="noreferrer">
                               Twitter
                               </a>
                                    </li>

                                    <li>
                                       <span><IoLocation></IoLocation></span> <a href="https://goo.gl/maps/wv8q4SvXCMXK2cGN7"  target="_blank"  rel="noreferrer">
                                            Address: Bangladesh, Rajshahi, Joypurhat
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <div className="bg-info text-white fs-2 text-center w-100 m-auto text-uppercase fw-bolder py-3 ">contact me</div>
                                <form action="https://formsubmit.co/ranimu233@gmail.com" method="post" className="was-validated w-100 m-auto mb-5
     bg-dark p-5 rounded-0 text-white h-auto" data-aos-anchor-placement="center-center"
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
                                        <label for="messge" className="form-label">Message</label>
                                        <textarea className="form-control" name="messge" placeholder="Enter your message here" id="messge" rows="5"
                                            required></textarea>
                                    </div>
                                    <div>
                                        <button className="btn btn-outline-primary w-100 pt-2 sendBtn">Send message
                                            <BiSend className='float-end fs-2 sendSign'></BiSend>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </>
    );
};

export default Contact;