import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Helmet } from 'react-helmet';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import ClipLoader from "react-spinners/ClipLoader";
import { BsCloudUploadFill } from "react-icons/bs";
const UpdateProject = () => {
    const [fileName, setFileName] = useState({});
    const [fileStatus, setFileStatus] = useState(false);
    const [projectUpdateLoad, setProjectUpdateLoad] = useState(false);
    const projectsData = useLoaderData();
    const [info, Setinfo] = useState(projectsData);
    const naviagate = useNavigate();

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
        setProjectUpdateLoad(true);

        fetch(`https://api.imgbb.com/1/upload?key=${imageBbKey}`, {
            method: "POST",
            body: formData
        })
            .then(res => {
                if (res.status === 403) {
                    toast.warning("  😩 😩 You do have not access to delete this data. 😩 😩 ");
                } else {
                    return res.json();
                }
            })
            .then(data => {
                const projectImage = data.data?.display_url ? data.data?.display_url : projectsData?.projectImage;

                fetch(`https://subrota-server.vercel.app/projects/${info._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        authentication: `Bearer ${localStorage.getItem("portfolio-token")} `
                    },
                    body: JSON.stringify({
                        ...info,
                        projectImage: projectImage
                    })
                })
                    .then(res => {
                        if (res.status === 403) {
                            toast.warning("  😩 😩 You do have not access to delete this data. 😩 😩 ");
                            setProjectUpdateLoad(false) ;
                        } else {
                            return res.json();
                        }
                    })
                    .then(data => {
                        if (data.acknowledged) {
                            toast.success("Congrasulations your project data is updated sucessfully !! ");
                            setProjectUpdateLoad(false);
                            naviagate("/");
                        }
                    })
            })
            .catch(error => { toast.error(error.message); setProjectUpdateLoad(false) });

    }

    const handleSubmitedInputData = (event) => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        let newUpdateProject = { ...info };
        newUpdateProject[name] = value;
        Setinfo(newUpdateProject);
    }

    return (
        <>
            <Helmet> <title> Update project  </title></Helmet>
            <form autoComplete='off' onSubmit={handleSubmit} className='p-5 my-4 mx-auto bg-dark p-4' style={{ width: "50%" }}>
                <h2 className='fs-3 fw-bolder text-uppercase text-white text-center my-4'> Update {projectsData?.projectName ?
                    info?.projectName : "project name not found"}   </h2>
                <div className="relative  w-full ">
                    <input type="text" name="projectName" onChange={handleSubmitedInputData}
                        defaultValue={projectsData?.projectName ?
                            info?.projectName : "project name not found"}
                        id="floating_project_name" placeholder='project name ' className="form-control my-4" required />
                </div>
                <div className="relative  w-full ">
                    <textarea rows="5" cols="5" name="description" onChange={handleSubmitedInputData}
                        defaultValue={info?.description ?
                            info?.description : "Description not found"}

                        id="floating_project_description" className="form-control my-4" placeholder='project description' required />
                </div>

                <div>
                    <div className="relative  w-full ">
                        <input type="text" name="clientRepositoryCode" onChange={handleSubmitedInputData}
                            defaultValue={info?.clientRepositoryCode ?
                                info?.clientRepositoryCode : "Client repository code not found"}
                            id="floating_client_side_link" className="form-control my-4" placeholder='Client side code link' required />
                    </div>
                    <div className="relative  w-full ">
                        <input type="text" name="serverRepositoryCode" onChange={handleSubmitedInputData}
                            defaultValue={info?.serverRepositoryCode ?
                                info?.serverRepositoryCode : "Server repository code  not found"}
                            id="floating_server_side_link" placeholder='Server side link' className="form-control my-4" required />
                    </div>
                </div>
                <div>
                    <div className="relative  w-full">
                        <input type="text" name="liveWebsiteLink" onChange={handleSubmitedInputData}
                            defaultValue={info?.liveWebsiteLink ?
                                info?.liveWebsiteLink : "Live website link  not found"}
                            placeholder='Live websitelink' id="live_website_link" className="form-control my-4" required />

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
                                            <p>Drop the project image here ...</p>
                                            <img src={projectsData?.projectImage? projectsData?.projectImage: "https://i.ibb.co/RSCmwXf/imagenot.jpg" }  alt="section" className='rounded-circle' style={{height:"60px" , width:"60px" , border:"2px solid lime"}}/>
                                        </>
                                }
                            </>
                        }

                    </div>
                </div>


                <button type="submit" className="text-white text-uppercase btn btn-success w-100">
                    {projectUpdateLoad ? <ClipLoader color='white' className='pb-3'></ClipLoader> : "Update project"}
                </button>
            </form>

        </>
    );
};

export default UpdateProject;
