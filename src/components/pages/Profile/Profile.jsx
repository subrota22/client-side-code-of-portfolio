import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { toast } from 'react-toastify';
import { AuthProvider } from '../../UserContext/UserContext';
const Profile = () => {
    const {user} = useContext(AuthProvider) ;
    // console.log(user);
    const {sendEmailVerify} = useContext(AuthProvider) ;
const [emailVerifyLoad , setEmailVerifyLoad] = useState(false) ;

const handleVerifyEmail = (event) => {
event.preventDefault() ;
setEmailVerifyLoad(true) ;
sendEmailVerify()
.then(() => {
toast.success("Please check your inbox or spam to verify your email") ;
setEmailVerifyLoad(false) ;
})
.catch(error => {toast.error(error.message) ; setEmailVerifyLoad(false) ; }) ;

}

    return (
        <>
            <Helmet><title>Profile</title></Helmet>
            <div className="card mx-auto text-dark my-5" style={{width: "40%"}}>
  <img src={user?.photoURL ?  user?.photoURL : "https://i.ibb.co/RSCmwXf/imagenot.jpg"} 
  className="card-img-top"
   style={{height: "280px"}}
    alt="profile_image"/>
  
  <div className="card-body bg-dark text-info fs-4 fw-bolder">
    <p className="card-text"> Name: {user?.displayName ? user?.displayName : "Name not found"}</p>
    <p className="card-text"> Email : {user?.email ? user?.email : "Name not found"}</p>
    <div className="card-text"> 
<div className="container">
    <div className="row">
        <div className="d-flex flex-column flex-md-row">
        <div className='my-2'>
{user?.emailVerified ?
     <button className="btn btn-success mx-2">
        Well done email is verified
    </button> :

<button type="submit" onClick={handleVerifyEmail} className="text-white px-5 py-2 my-3 btn btn-outline-info"> 
{ emailVerifyLoad ?   <ClipLoader color='white' className='pb-3 text-center'></ClipLoader>  : "Verify email"}
  
  </button>
}

</div>

<div className='mt-2'>
<NavLink to="/update-profile" className="btn btn-success mx-2 mt-3">
    Update profile
</NavLink>
</div>
        </div>
    </div>
</div>

    </div>
  </div>
</div>
        </>
    );
};

export default Profile;