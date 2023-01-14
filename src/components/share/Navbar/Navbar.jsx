import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthProvider } from '../../UserContext/UserContext';
const Navbar = () => {
    const {user , signOutUser , setUserData} = useContext(AuthProvider) ;
    const naviagate = useNavigate() ;
    const logout = ()=>{
        signOutUser() ;
        setUserData({}) ;
        toast.success("Your account is log out successfully !! ") ;
        naviagate("/") ;
    }
    return (
        <>
 
            <nav className="navbar navbar-expand-lg navBg">
                <div className="container-fluid">
                    <a className="navbar-brand text-uppercase text-white" href="/">
                        Portfolio Of Subrota Chandra 
                    </a>
                    <button className="navbar-toggler text-white bg-success" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon text-white "></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link text-white active" aria-current="page" to="/">Home</NavLink>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link text-white" target="_blank" rel='noreferrer'
                                    href="https://shopping-mall-forever.netlify.app/">React.js website</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" target="_blank" rel='noreferrer'
                                    href="https://green-computers-1a8a8.firebaseapp.com/">Node.js website</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" target="_blank" rel='noreferrer'
                                    href="https://make-your-team-to-play-foot-ball.netlify.app/">JavaScript website</a>
                            </li>
                            <li className="nav-item">
                                <NavLink  className="nav-link text-white" to="/contact">Contact me
                                </NavLink>
                            </li>

                         {
                          !user?.uid &&  <>
                               <li className="nav-item">
                                <NavLink  className="nav-link text-white" to="/register"> Register
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink  className="nav-link text-white" to="/login">Login
                                </NavLink>
                            </li>
                            </>
                         }

                            <li className="nav-item dropdown">
                                <a className="nav-link text-white dropdown-toggle" href="#dropdown"  rel='noreferrer' role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    More link
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" target="_blank" rel='noreferrer'
                                            href="http://subrotachandra.lovestoblog.com/login.html">PHP website</a></li>
                                    <li><NavLink className="dropdown-item"  to="/about">About me </NavLink>
                                    </li>
                               
                                    <li>
                                    <NavLink className="dropdown-item"  to="/privacy">Privacy policy </NavLink>
                                            </li>
                                            <li>
                                    <NavLink className="dropdown-item"  to="/blogs"> Blogs </NavLink>
                                            </li>
                                            <li>
                                    <NavLink className="dropdown-item"  to="/referral"> Referral </NavLink>
                                            </li>
                                            <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                            <li>
                                      <button className="dropdown-item btn btn-outline-info" onClick={logout}>  Log out  </button>
                                            </li>
                                            {
                                             !user?.uid &&   <>
                                                   <li className="nav-item">
                                <NavLink  className="nav-link" to="/register"> Register
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink  className="nav-link" to="/login">Login
                                </NavLink>
                            </li>
                                                </>
                                            }
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
                                 
        </>
    );
};

export default Navbar;