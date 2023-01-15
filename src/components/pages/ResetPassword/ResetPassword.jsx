import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import ClipLoader from 'react-spinners/ClipLoader';
import { toast } from 'react-toastify';
import { AuthProvider } from '../../UserContext/UserContext';

const ResetPassword = () => {
const {resetPassword} = useContext(AuthProvider) ;
const [resetLoad , setResetLoad] = useState(false) ;
const handleSubmit = (event) => {
event.preventDefault() ;
setResetLoad(true) ;
const email = event.target.email.value ;
resetPassword(email)
.then(() => {
toast.success("Please check your inbox or spam to reset your password.") ;
setResetLoad(false) ;
})
.catch(error => {toast.error(error.message) ; setResetLoad(false) ; }) ;

}
    return (
        <>
            <Helmet><title>Reset password </title></Helmet>
<form autoComplete='off' className='was-validated bg-dark my-5 w-50 mx-auto rounded-2 p-3 text-white' onSubmit={handleSubmit}>
  <h2 className='fs-2 fw-bolder text-center text-info my-4'> Reset your password </h2>
  <div className="mb-6">
    <input type="email" name='email' id="email" className='form-control' placeholder="Enter your valid email address" required/>
  </div>


  <div>
    <div className="d-flex my-4">
      <input id="remember" type="checkbox" className='form-check-input' required/>
    <label for="remember" className="ml-2 mx-2 text-sm form-check-label"> Agree to change password </label>
    </div>
  </div>

<button type="submit" className="text-white px-5 py-2 my-3 btn btn-outline-info"> 
{ resetLoad ?   <ClipLoader color='white' className='pb-3 text-center'></ClipLoader>  : "Send reset password request"}
  
  </button>

</form>

        </>
    );
};

export default ResetPassword;