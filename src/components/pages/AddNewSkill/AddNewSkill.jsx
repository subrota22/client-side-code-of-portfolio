import React, { useCallback, useContext, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";
import { BsCloudUploadFill } from "react-icons/bs";
import { AuthProvider } from '../../UserContext/UserContext';
import { useNavigate } from 'react-router-dom';

const AddNewSkill = () => {
    const [fileName, setFileName] = useState({});
    const [fileStatus, setFileStatus] = useState(false);
    const [registerLoad, setRegisterLoad] = useState(false);
    const {user} = useContext(AuthProvider) ;
   const navigate = useNavigate() ;
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
  
        const technology = event.target.technology.value.trim();
        const startingDate = event.target.startingDate.value.trim();
        const experience = event.target.experience.value.trim();
        const usingFor = event.target.usingFor.value.trim();
        fetch(`https://api.imgbb.com/1/upload?key=${imageBbKey}`, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                        const technologyImage = data.data.display_url;
                        const postData = {
                            authorName: user?.displayName ,
                            authorEmail:user?.email,
                            authorImage:user?.photoURL,
                            technology: technology,
                            startingDate: startingDate,
                            realTimeExperience:usingFor ,
                            technologyImage: technologyImage,
                            experience : experience,
                            publishDate: new Date().toLocaleDateString() ,

                        }
                        fetch("https://subrota-server-subrota22.vercel.app/skills", {
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
                                      navigate("/login") ;
                                } else {
                                    return res.json();
                                }
                            })
                            .then(data => {
                                if (data.acknowledged) {
                                    toast.success("Congrasulations your new skill added sucessfully !! ");
                                    setRegisterLoad(false);
                                    event.target.reset() ;
                                    setFileName({}) ;
                                }
                            })
                    })
                    .catch(error => { toast.error(error.message); setRegisterLoad(false) });

    }


    return (
        <>
            <Helmet> <title> Add new skill  </title></Helmet>
           <div className="my-5">
           <div className="bg-success py-4 text-white fs-2 text-center w-50 m-auto text-uppercase fw-bolder ">Add new skill </div>
  
  <form autoComplete='off' onSubmit={handleSubmit} className='p-5  mx-auto bg-dark p-4' style={{ width: "50%" }}>
      <div className="relative  w-full ">
              <input type="text" name="technology" id="floating_technology" className="form-control my-4" placeholder='Enter technology name' required />
          </div>
      <div className="relative  w-full ">
          <select name="experience" id="experience" className='form-control' required>
             <option selected disabled>Select your experience</option>
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
   
      <div className="relative  w-full ">
          <textarea rows="5" cols="5" name="usingFor" id="usingFor" className="form-control my-4" placeholder='How and why you are use this technology' required />
      </div>

      <div>
     
          <div className="relative  w-full ">
              <label htmlFor="startingDate fw-bolder fs-5">Starting date</label>
              <input type="date" name="startingDate" id="startingDate" placeholder='Enter your starting date' className="form-control my-4" required />
          </div>
      </div>
      <div>

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
                                  <p>Drop the technology image here ...</p>

                              </>
                      }
                  </>
              }

          </div>
      </div>


      <button type="submit" className="text-white btn btn-success w-100">
          {registerLoad ? <ClipLoader color='white' className='pb-3'></ClipLoader> : "Add new skill"}
      </button>
  </form>

           </div>
        </>
    );
};

export default AddNewSkill;
