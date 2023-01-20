import React, { useCallback, useContext, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";
import { BsCloudUploadFill } from "react-icons/bs";
import { AuthProvider } from '../../../UserContext/UserContext';
import { Navigate } from 'react-router-dom';
const AddNewProject = () => {
    const [fileName, setFileName] = useState({});
    const [fileStatus, setFileStatus] = useState(false);
    const [addProjectLoad, setaddProjectLoad] = useState(false);
    const {user} = useContext(AuthProvider) ;
   
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
        setaddProjectLoad(true);
  
        const client_side_link = event.target.client_side_link.value.trim();
        const server_side_link = event.target.server_side_link.value.trim();
        const live_website_link = event.target.live_website_link.value.trim();
        const project_name = event.target.project_name.value.trim();
        const project_description = event.target.project_description.value.trim();
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
                            clientRepositoryCode: client_side_link,
                            serverRepositoryCode: server_side_link,
                            description:project_description ,
                            projectName: project_name,
                            projectImage: projectImage,
                            liveWebsiteLink : live_website_link,
                            publishDate: new Date().toLocaleDateString() ,

                        }
                        fetch("https://subrota-server.vercel.app/projects", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                authentication: `Bearer ${localStorage.getItem("portfolio-token")} `
                            },
                            body: JSON.stringify(postData)
                        })
                            .then(res =>  {

                                if (res.status === 403) {
                                    toast.warning(" 😩 😩 You do have not access to manipulate this data. 😩 😩 ");
                                    setaddProjectLoad(false) ;
                                    return <Navigate to="/"></Navigate>
                                } else {
                                    return res.json();
                                }
                            })
                            .then(data => {
                                if (data.acknowledged) {
                                    toast.success("Congrasulations your new project added sucessfully !! ");
                                    setaddProjectLoad(false);
                                    event.target.reset() ;
                                    setFileName({}) ;
                                }
                            })
                    })
                    .catch(error => { toast.error(error.message); setaddProjectLoad(false) });

    }


    return (
        <>
            <Helmet> <title> Add new project  </title></Helmet>
            <form autoComplete='off' onSubmit={handleSubmit} className='p-5 my-4 mx-auto bg-dark p-4' style={{ width: "50%" }}>
                <h2 className='text-3xl text-white text-center my-4'> Add new project </h2>
                <div className="relative  w-full ">
                    <input type="text" name="project_name" id="floating_project_name" placeholder='project name ' className="form-control my-4" required />
                </div>
                <div className="relative  w-full ">
                    <textarea rows="5" cols="5" name="project_description" id="floating_project_description" className="form-control my-4" placeholder='project description' required />
                </div>
             
                <div>
                    <div className="relative  w-full ">
                        <input type="text" name="client_side_link" id="floating_client_side_link" className="form-control my-4" placeholder='Client side code link' required />
                    </div>
                    <div className="relative  w-full ">
                        <input type="text" name="server_side_link" id="floating_server_side_link" placeholder='Server side link' className="form-control my-4" required />
                    </div>
                </div>
                <div>
                    <div className="relative  w-full">
                        <input type="text" name="live_website_link" placeholder='Live websitelink' id="live_website_link" className="form-control my-4" required />

                    </div>
 
                </div>

                <div className="w-full">
                    <div {...getRootProps()} className="rounded-2 text-center p-5 my-3" style={{ border: "2px solid lime", cursor: "pointer" }}>
                        <input {...getInputProps()} />
                        {
                                    fileStatus ? <div> { fileName?.name && <p>  Your file is selected file name is : </p> }  {fileName?.name ? fileName?.name :<>
                                        <p> File name not found  please select another file</p>
                                        <BsCloudUploadFill className='fs-bolder fs-3 my-2 text-info'></BsCloudUploadFill>
                                        </>} </div> : <>
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
                    {addProjectLoad ? <ClipLoader color='white' className='pb-3'></ClipLoader> : "Add project"}
                </button>
            </form>

        </>
    );
};

export default AddNewProject;
