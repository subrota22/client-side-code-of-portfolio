import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Helmet } from 'react-helmet';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import ClipLoader from "react-spinners/ClipLoader";
import { BsCloudUploadFill } from "react-icons/bs";
const UpdateSkill = () => {
    const [fileName, setFileName] = useState({});
    const [fileStatus, setFileStatus] = useState(false);
    const [projectUpdateLoad, setProjectUpdateLoad] = useState(false);
    const skilltsData = useLoaderData();
    const [info, Setinfo] = useState(skilltsData);
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
                    toast.warning(" 😩 😩 You do have not access to manipulate this data. 😩 😩 ");
                    naviagate("/login") ;
                } else {
                    return res.json();
                }

            })
            .then(data => {
                const technologyImage = data.data?.display_url ? data.data?.display_url : skilltsData?.projectImage;

                fetch(`https://subrota-server-subrota22.vercel.app/skills/${info._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        authentication: `Bearer ${localStorage.getItem("portfolio-token")} `
                    },
                    body: JSON.stringify({
                        ...info,
                        technologyImage: technologyImage ? technologyImage : info?.technologyImage 
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.acknowledged) {
                            toast.success("Congrasulations your skill data is updated sucessfully !! ");
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
        let newUpdateData = { ...info };
        newUpdateData[name] = value;
        Setinfo(newUpdateData);
    }
    console.log(info);

    return (
        <>
            <Helmet> <title> Update skill  </title></Helmet>
            <div className="my-5">
           <div className="bg-success py-4 text-white fs-2 text-center w-50 m-auto text-uppercase fw-bolder ">Update skill     {info?.technology ? info?.technology : "Skill name not found" }  </div>
  
            <form autoComplete='off' onSubmit={handleSubmit} className='p-5  mx-auto bg-dark p-4' style={{ width: "50%" }}>
                    <div>
                    <div className="relative  w-full">
                        <textarea rows="5" cols="5" name="realTimeExperience" onChange={handleSubmitedInputData}
                            defaultValue={info?.realTimeExperience ?
                                info?.realTimeExperience : "Real Time Experience not found"}
                            id="realTimeExperience" className="form-control my-4" placeholder='Enter your real time experience' required />
                    </div>
                    <div className="relative  w-full ">
                        <input type="text" name="startingDate" onChange={handleSubmitedInputData}
                            defaultValue={info?.technology ?
                                info?.technology : "technology not found"}
                            id="technology" placeholder='Enter your technology name' className="form-control my-4" required />
                    </div>
                    <div className="relative  w-full ">
                        <input type="text" name="startingDate" onChange={handleSubmitedInputData}
                            defaultValue={info?.startingDate ?
                                info?.startingDate : "starting date not found"}
                            id="startingDate" placeholder='Enter your starting date' className="form-control my-4" required />
                    </div>
                </div>
     

          <div className="relative  w-full ">
          <select name="experience" id="experience" onChange={handleSubmitedInputData} className='form-control' required>
             <option  disabled>Select your experience</option>
             <option className='text-info'  selected value={ info?.experience ? info?.experience : "experience   not found"}>
            Your current experience :  {info?.experience ? info?.experience : "experience  not found"}
             </option>
              <option value="Less then 1 year">Less then 1 year</option>
              <option value="1 year"> 1 year</option>
              <option value="2 years">2 years</option>
              <option value="3 years">3 years</option>
              <option value="4 years">4 years</option>
              <option value="5 years">5 years</option>
              <option value="6 years">6 years</option>
              <option value="7 years">7 years</option>
              <option value="8 years">8 years</option>
              <option value="9 years">9 years</option>
              <option value="10 years">10 years</option>
          </select>
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
                                            <p>Drop the technology image here ...</p>
                                            <img src={skilltsData?.technologyImage? skilltsData?.technologyImage: "https://i.ibb.co/RSCmwXf/imagenot.jpg" }  alt="section" className='rounded-circle' style={{height:"60px" , width:"60px" , border:"2px solid lime"}}/>
                                        </>
                                }
                            </>
                        }

                    </div>
                </div>


                <button type="submit" className="text-white text-uppercase btn btn-success w-100">
                    {projectUpdateLoad ? <ClipLoader color='white' className='pb-3'></ClipLoader> : "Update skill"}
                </button>
            </form>
</div>

        </>
    );
};

export default UpdateSkill;
