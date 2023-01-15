import React, { useCallback, useContext, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Helmet } from 'react-helmet';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthProvider } from '../../UserContext/UserContext';
import ClipLoader from "react-spinners/ClipLoader";
import { BsCloudUploadFill } from "react-icons/bs";
import { authUser } from '../../authUser/authUser';
const Register = () => {
    const [fileName, setFileName] = useState({});
    const [fileStatus, setFileStatus] = useState(false);
    const [registerLoad, setRegisterLoad] = useState(false);
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";
    const naviagate = useNavigate();
    //create user 
    const {
        createNewUser, sendEmailVerify, loginWithGoogle,
        loginWithGitHub, updateUser
    } = useContext(AuthProvider);
    // console.log(fileName);
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        setFileName(acceptedFiles[0]);
        setFileStatus(true);
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    //
    const formData = new FormData();
    formData.append("image", fileName);

    const imageBbKey = process.env.REACT_APP_imageBbKey;
    const handleSubmit = (event) => {
        event.preventDefault();
        setRegisterLoad(true);
        const email = event.target.email.value.trim();
        const password = event.target.password.value.trim();
        const repeat_password = event.target.repeat_password.value.trim();
        if (password !== repeat_password) {
            toast.warning("Mismatched your password please try agian");
            return;
        }
        const first_name = event.target.first_name.value.trim();
        const last_name = event.target.last_name.value.trim();
        const name = first_name + " " + last_name;
        const phone_number = event.target.phone_number.value.trim();
        const company_name = event.target.phone_number.value.trim();
        // console.log(email);
        fetch(`https://api.imgbb.com/1/upload?key=${imageBbKey}`, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                createNewUser(email, password)
                    .then((result) => {
                        authUser(result.user?.email);
                        const imageLink = data.data?.display_url;
                        const postData = {
                            name: name,
                            email: email,
                            profile: imageLink,
                            phoneNumber: phone_number,
                            companyName: company_name,
                        }
                        fetch("https://subrota-server.vercel.app/users", {
                            method: "POST",
                            headers: {
                            "Content-Type": "application/json",
                            },
                            body: JSON.stringify(postData)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.acknowledged) {
                                    toast.success("Congrasulations your account created sucessfully !! ");
                                    setRegisterLoad(false)
                                    //verify email
                                    sendEmailVerify()
                                        .then(() => {
                                            toast.info("Please check your inbox or spam to verify your email address.");
                                            updateUser(name, imageLink)
                                                .then(() => {
                                                    toast.success("Your data added successfully !! ");
                                                    return naviagate(from, { replace: true });
                                                })
                                        })
                                        .catch(error => toast.error(error.message));

                                }
                            })
                    })
                    .catch(error => { toast.error(error.message); setRegisterLoad(false) });

            })
            .catch(error => { console.log(error); setRegisterLoad(false) })

    }

    //handle google login
    const handleGoogleLogin = () => {
        setRegisterLoad(true);
        loginWithGoogle()
            .then((result) => {
                toast.success("Your are login successfully with Google account !!");
                setRegisterLoad(false);
                authUser(result.user?.email);
                return naviagate(from, { replace: true });
            })
            .catch(error => { toast.error(error.message); setRegisterLoad(false) });

    }
    //handle github login
    const handleGitHubLogin = () => {
        setRegisterLoad(true);
        loginWithGitHub()
            .then((result) => {
                toast.success("Your are login successfully with GitHub account !!");
                setRegisterLoad(false);
                authUser(result.user?.email);
                return naviagate(from, { replace: true });
            })
            .catch(error => { toast.error(error.message); setRegisterLoad(false) });

    }
    //naviagate 

    return (
        <>
            <Helmet> <title> Register </title></Helmet>
            <form autoComplete='off' onSubmit={handleSubmit} className='p-5 my-4 mx-auto bg-dark p-4' style={{ width: "50%" }}>
                <h2 className='text-3xl text-white text-center my-4'> Register now </h2>
                <div className="relative  w-full ">
                    <input type="email" name="email" id="floating_email" placeholder='Email address' className="form-control my-4" required />
                </div>
                <div className="relative  w-full ">
                    <input type="password" name="password" id="floating_password" className="form-control my-4" placeholder='Password' required />
                </div>
                <div className="relative  w-full ">
                    <input type="password" name="repeat_password" id="floating_repeat_password" placeholder='Confirm password' className="form-control my-4" required />
                </div>
                <div>
                    <div className="relative  w-full ">
                        <input type="text" name="first_name" id="floating_first_name" className="form-control my-4" placeholder='First name' required />
                    </div>
                    <div className="relative  w-full ">
                        <input type="text" name="last_name" id="floating_last_name" placeholder='Last name' className="form-control my-4" required />
                    </div>
                </div>
                <div>
                    <div className="relative  w-full ">
                        <input type="number" pattern='[0-9]' name="phone_number" placeholder='Phone number' id="floating_phone" className="form-control my-4" required />

                    </div>
                    <div className="relative w-full ">
                        <input type="text" name="company_name" id="floating_company" placeholder='Company (Ex. Google)' className="form-control my-4" required />

                    </div>
                </div>

                <div className="w-full">
                    <div {...getRootProps()} className="rounded-2 text-center p-3 my-3" style={{ border: "2px solid lime", cursor: "pointer" }}>
                        <input {...getInputProps()} />
                        {
                            fileStatus ? <p > Your file is selected file name is : {fileName.name} </p> : <>
                                {
                                    isDragActive ?
                                        <ClipLoader color='white' className='p-3 text-center'></ClipLoader> :
                                        <>
                                            <BsCloudUploadFill className='fs-bolder fs-3 my-2 text-info'></BsCloudUploadFill>
                                            <p>Drop the profile image here ...</p>

                                        </>
                                }
                            </>
                        }

                    </div>
                </div>


                <button type="submit" className="text-white btn btn-success w-100">
                    {registerLoad ? <ClipLoader color='white' className='pb-3'></ClipLoader> : "Register"}
                </button>
                <p className='my-4'>
                    <p className='text-center fs-3 fw-bolder'> ---- Or you can ---- </p>
                    <div className="d-flex flex-column my-2 w-full ">
                        <div onClick={handleGoogleLogin} className="btn btn-outline-info text-white fw-bold my-2"> Register with Google </div>
                        <div onClick={handleGitHubLogin} className="btn btn-outline-info text-white fw-bold my-2"> Register with GitHub </div>
                    </div>

                    <NavLink to="/login" className="text-decoration-none">Already have an account please <span className='text-info'> Login now</span> </NavLink>
                </p>
            </form>

        </>
    );
};

export default Register;