

//AddNewSection;

import React, { useCallback, useContext, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Helmet } from 'react-helmet';
import {useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';

import ClipLoader from "react-spinners/ClipLoader";
import { BsCloudUploadFill } from "react-icons/bs";
import { AuthProvider } from '../../../UserContext/UserContext';
const AddNewSection = () => {
    const [fileName, setFileName] = useState({});
    const [fileStatus, setFileStatus] = useState(false);
    const [registerLoad, setRegisterLoad] = useState(false);
    const {user} = useContext(AuthProvider) ;
    const detailsData = useLoaderData() ;
    console.log(detailsData);
    // const naviagate = useNavigate();

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
  
        const projectTitle = event.target.projectTitle.value.trim();
        const details = event.target.details.value.trim();
        fetch(`https://api.imgbb.com/1/upload?key=${imageBbKey}`, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                        const projectImage = data.data.display_url;
                        const postData = {
                            authorName: user?.displayName ,
                            authorEmail:user?.email,
                            authorImage:user?.photoURL,
                            projectTitle: projectTitle,
                            details:details ,
                            projectName: detailsData?.projectName,
                            image: projectImage,
                            projectId:detailsData?._id,
                            publishDate: new Date().toLocaleDateString() ,
                        }
                        fetch("http://localhost:3025/details", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                authentication: `Bearer ${localStorage.getItem("portfolio-token")} `
                            },
                            body: JSON.stringify(postData)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.acknowledged) {
                                    toast.success("Congrasulations your new section added sucessfully !! ");
                                    setRegisterLoad(false);
                                    // naviagate("/") ;
                                }
                            })
                    })
                    .catch(error => { toast.error(error.message); setRegisterLoad(false) });

    }


    return (
        <>
            <Helmet> <title> Add new section </title></Helmet>

          
                                        <div className='text-center'>
                                        {   user?.uid && detailsData.length !== 0?
                                                <a href={`/details/${detailsData?._id }`} className="btn btn-outline-info w-50 mx-5 py-2 
                                                my-5 hideBtn" >See  Your All Added section  <i className="fa-solid fa-arrow-right showDetailsAnimation"></i> </a>
                                                : undefined
                                            }
                                        </div>

                                   

            <form autoComplete='off' onSubmit={handleSubmit} className='p-5 my-4 mx-auto bg-dark p-4' style={{ width: "50%" }}>
                <h2 className='text-3xl text-white text-center my-4'> Add new section for {detailsData?.projectName} </h2>
       
                    <div className="relative  w-full ">
                        <input type="text" name="projectTitle" id="floating_projectTitle" placeholder='Project section title' className="form-control my-4" required />
                    </div>
             
                    <div className="relative  w-full">
                        <textarea rows="5" cols="10" name="details" placeholder='Project details' id="details" className="form-control my-4" required />

                    </div>

                <div className="w-full">
                    <div {...getRootProps()} className="rounded-2 text-center p-5 my-3" style={{ border: "2px solid lime", cursor: "pointer" }}>
                        <input {...getInputProps()} />
                        {
                            fileStatus ? <p > Your file is selected file name is : {fileName.name} </p> : <>
                                {
                                    isDragActive ?
                                        <ClipLoader color='white' className='p-3 text-center'></ClipLoader> :
                                        <>
                                            <BsCloudUploadFill className='fs-bolder fs-3 my-2 text-info'></BsCloudUploadFill>
                                            <p>Drop the project image here ...</p>

                                        </>
                                }
                            </>
                        }

                    </div>
                </div>


                <button type="submit" className="text-white btn btn-success w-100">
                    {registerLoad ? <ClipLoader color='white' className='pb-3'></ClipLoader> : "Add section"}
                </button>
            </form>

        </>
    );
};

export default AddNewSection;
