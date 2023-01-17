import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { toast } from 'react-toastify';
import { authUser } from '../../authUser/authUser';
import { AuthProvider } from '../../UserContext/UserContext';

const Login = () => {
  const [loginLoad, setLoginLoad] = useState(false);
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const naviagate = useNavigate();
  const {
    loginUser, loginWithGoogle, loginWithGitHub,
  } = useContext(AuthProvider);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoginLoad(true);
    const email = event.target.email.value;
    const password = event.target.password.value;
    loginUser(email, password)
      .then((result) => {
        toast.success("Congrasulations you are login successfully !!");
        setLoginLoad(false);
        authUser(result.user?.email);
        naviagate(from, { replace: true });
      })
      .catch(error => { toast.error(error.message); setLoginLoad(false) })
  }
  //handle google login
  const handleGoogleLogin = () => {
    setLoginLoad(true);
    loginWithGoogle()
      .then((result) => {
        toast.success("Your are login successfully with Google account !!");
        setLoginLoad(false);
        authUser(result.user?.email);
        naviagate(from, { replace: true });
      })
      .catch(error => { toast.error(error.message); setLoginLoad(false) });

  }
  //handle github login
  const handleGitHubLogin = () => {
    setLoginLoad(true);
    loginWithGitHub()
      .then((result) => {
        toast.success("Your are login successfully with GitHub account !!");
        setLoginLoad(false);
        authUser(result.user?.email);
        naviagate(from, { replace: true });
      })
      .catch(error => { toast.error(error.message); setLoginLoad(false) });

  }

  return (
    <>
      <Helmet><title>Login</title></Helmet>
      <div className="my-5">
        <div className="bg-success text-white fs-2 text-center  m-auto text-uppercase fw-bolder py-3" style={{ width: "40%" }}> Login now</div>
        <form autoComplete='off' onSubmit={handleSubmit} className='mx-auto  p-4 bg-dark' style={{ width: "40%" }}>
          <div className="relative z-0 mb-6 w-full group">
            <input type="email" name="email" id="floating_email" className="form-control my-4" placeholder="Enter your email address" required />
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input type="password" name="password" id="floating_password" className="form-control my-4" placeholder="Enter your password " required />
          </div>

          <button type="submit" className="btn btn-outline-info w-100 my-2">
            {loginLoad ? <ClipLoader color='white' className='pb-3'></ClipLoader> : "Login "}
          </button>
          <p className='my-4 '>
            <NavLink to="/register" className="text-decoration-none">If you don't have account please <span className='text-info'>Register now</span> </NavLink>
          </p>
          <p className='my-4'>
            <NavLink to="/reset-password" className="text-decoration-none">If yo forgot password please <span className='text-info'>Reset password</span> </NavLink>
          </p>
          <p className='text-center fs-3 fw-bolder'> ---- Or you can ---- </p>
          <div className="d-flex flex-column my-2 w-full ">
            <div onClick={handleGoogleLogin} className="btn btn-outline-info text-white fw-bold my-2"> Register with Google </div>
            <div onClick={handleGitHubLogin} className="btn btn-outline-info text-white fw-bold my-2"> Register with GitHub </div>
          </div>
        </form>
      </div>

    </>
  );
};

export default Login;