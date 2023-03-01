import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "./Navbar.css" ;
import { AuthProvider } from '../../UserContext/UserContext';
const Navbar = () => {
    const { user, signOutUser, setUserData } = useContext(AuthProvider);
    const naviagate = useNavigate();
    const logout = () => {
        signOutUser();
        setUserData({});
        toast.success("Your account is log out successfully !! ");
        naviagate("/");
    }
    return (
        <>

            <nav className="navbar navbar-expand-lg navBg text-center">
                <NavLink className="navbar-brand text-uppercase fs-5 text-white mx-3" to="/">
                    <img src="https://i.ibb.co/DLcFkNd/mylogo.png" alt="logo" className='logo img-fluid' />
                </NavLink>
                <div className="container-fluid">

                    <button className="navbar-toggler text-white bg-success" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon text-white "></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto ">

                            <li className="nav-item">
                                <NavLink className="nav-link text-white active" aria-current="page" to="/">Home</NavLink>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link text-white" target="_blank" rel='noreferrer'
                                    href="https://shopping-mall-forever.netlify.app/">React.js website</a>
                            </li>


                            {
                                !user?.uid && <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link text-white" to="/register"> Register
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link text-white" to="/login">Login
                                        </NavLink>
                                    </li>
                                </>
                            }
                            <li className="nav-item">
                                <NavLink className="nav-link text-white" to="/contact">
                                    Contact me
                                </NavLink>
                            </li>
                            {
                                user?.email === "subrota45278@gmail.com" &&
                                <li className="nav-item">
                                    <NavLink className="nav-link text-white" to="/manage-users">
                                        Manage users
                                    </NavLink>
                                </li>

                            }
                            <li className="nav-item dropdown">
                                <a className="nav-link text-white dropdown-toggle" href="#dropdown" rel='noreferrer' role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    Show more
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" target="_blank" rel='noreferrer'
                                        href="http://subrotachandra.lovestoblog.com/login.html">PHP website</a></li>
                                    <li><NavLink className="dropdown-item" to="/about">About me </NavLink>
                                    </li>

                                    <li>
                                        <NavLink className="dropdown-item" to="/privacy">Privacy policy </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="dropdown-item" to="/blogs"> Blogs </NavLink>
                                    </li>
                                    {user?.uid && <li>
                                        <NavLink className="dropdown-item" to="/referral"> Referral </NavLink>
                                    </li>}
                                    <li className="dropdown-item">
                                        <a className="dropdown-link  text-decoration-none text-dark" target="_blank" rel='noreferrer'
                                            href="https://green-computers-1a8a8.firebaseapp.com/">Node.js website</a>
                                    </li>
                                    <li className="dropdown-item">
                                        <a className="dropdown-link text-decoration-none text-dark" target="_blank" rel='noreferrer'
                                            href="https://make-your-team-to-play-foot-ball.netlify.app/">JavaScript website</a>
                                    </li>
                                    <li>
                                        <NavLink className="dropdown-item " to="/certifications">
                                            Certifications
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="dropdown-item" to="/skill-marks">
                                            Skill marks
                                        </NavLink>
                                    </li>
                                    {
                                        user?.uid && <>
                                            <li>
                                                <NavLink className="dropdown-item " to="/userInformations">
                                                    Users
                                                </NavLink>
                                            </li>
                                        </>
                                    }
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>

                                    {
                                        !user?.uid && <>
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="/register"> Register
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="/login">Login
                                                </NavLink>
                                            </li>

                                        </>
                                    }

                                    {
                                        user?.uid && <>
                                            <li>
                                                <div className="dropdown-item btn btn-outline-info" onClick={() => logout()}>
                                                    <button className="btn btn-danger w-100 py-2">
                                                        Log out
                                                    </button>
                                                </div>
                                            </li>
                                        </>
                                    }


                                </ul>
                            </li>



                            <li className="nav-item">
                                {
                                    user?.uid && <>

                                        <NavLink className="nav-link text-white" to="/profile">
                                            <img src={user?.photoURL} alt="user" className='rounded-circle ms-5'
                                                style={{ height: "75px", width: "80px", border: "3px solid lime", marginTop: "-10px" }}
                                                title={user?.displayName}

                                            />
                                            <div style={{
                                                height: "12px", width: "12px",
                                                border: "2px solid white", marginTop: "20%", borderRadius: "50%",
                                                backgroundColor: "lime"
                                            }} className="d-none float-end mx-2 d-md-block" >

                                            </div>
                                        </NavLink>


                                    </>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    );
};

export default Navbar;