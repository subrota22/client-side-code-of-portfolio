import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Helmet } from 'react-helmet';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";
import { BsCloudUploadFill } from "react-icons/bs";
import PhoneInput from 'react-phone-number-input';

const UpdateUsers = () => {
    const [fileName, setFileName] = useState({});
    const [fileStatus, setFileStatus] = useState(false);
    const [updateLoad, setUpdateLoad] = useState(false);
    const usersData = useLoaderData() ;
    const [info, Setinfo] = useState(usersData);
    const naviagate = useNavigate();

    const [phoneNumber, setPhoneNumber] = useState();
    const onDrop = useCallback(acceptedFiles => {
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
        setUpdateLoad(true);
        fetch(`https://api.imgbb.com/1/upload?key=${imageBbKey}`, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                        const imageLink = data?.data?.display_url;
                      
                        fetch(`https://subrota-server-subrota22.vercel.appusersInfo/${usersData?._id}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                                authentication: `Bearer ${localStorage.getItem("portfolio-token")} `,
                            },
                            body: JSON.stringify({
                                ...info , 
                                profile: imageLink ? imageLink : usersData?.profile,
                                phoneNumber: phoneNumber ? phoneNumber : usersData?.phoneNumber,
                            })
                        })
                            .then(res =>
                                {
                                    if (res.status === 403) {
                                        toast.warning(" 😩 😩 You do have not access to update this data. 😩 😩 ");
                                        setUpdateLoad(false) ;
                                    } else {
                                        return res.json();
                                    }
                                }
                                
                                )
                            .then(data => {
                                if (data.acknowledged) {
                                    toast.success("Congrasulations your user information updated sucessfully !! ");
                                    setUpdateLoad(false);
                                    naviagate("/manage-users") ;
                                } 
                            })
            })
            .catch(error => { console.log(error); setUpdateLoad(false) })

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
            <Helmet> <title> Update user  </title></Helmet>
            <div className="my-5">
                <div className="bg-success text-white fs-2 text-center  m-auto text-uppercase fw-bolder py-3" style={{ width: "44%" }}> Update user  </div>
                <form autoComplete='off' onSubmit={handleSubmit} className='p-5  mx-auto bg-dark p-4' style={{ width: "44%" }}>
              
                        <div className="relative  w-full ">
                            <input type="text" name="first_name" onChange={handleSubmitedInputData} defaultValue={usersData?.name} id="floating_first_name" className="form-control my-4" placeholder='First name'/>
                        </div>
                     
                 
                    <div className="relative  w-full ">
                        <input type="email" name="email" onChange={handleSubmitedInputData} defaultValue={usersData?.email} id="floating_email" placeholder='Email address' className="form-control my-4"/>
                    </div>

                    <div>
                        <div className="w-full">   
                            <PhoneInput autoComplete='off'
                                name="phone_number" placeholder='Enter your phone number'
                                id="floating_phone" className="form-control my-4"
                                value={phoneNumber}
                                onChange={setPhoneNumber}  />
                               {
                                usersData?.phoneNumber &&  <p className='text-white'>PH number : {phoneNumber? phoneNumber : usersData?.phoneNumber }</p>
                               }
                               {
                                !usersData?.phoneNumber&& <p> Phone number not found </p>
                               }
                        </div>
                  
                        <div className="relative w-full ">
                            <input type="text" name="companyName" onChange={handleSubmitedInputData} defaultValue={usersData?.companyName} id="floating_company" placeholder='Company (Ex. Google)' className="form-control my-4" />

                        </div>

                        
                        <div className="relative w-full ">
                            <input type="date" name="joiningDate" onChange={handleSubmitedInputData} defaultValue={usersData?.joiningDate} id="floating_date" placeholder='Enter your joining date ' className="form-control my-4" />
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
                                                <img src={usersData?.profile ?usersData?.profile: "https://i.ibb.co/RSCmwXf/imagenot.jpg" }  alt="section" className='rounded-circle' style={{height:"60px" , width:"60px" , border:"2px solid lime"}}/>
                                            </>
                                    }
                                </>
                            }

                        </div>
                    </div>


                    <button type="submit" className="text-white btn btn-outline-success w-100">
                        {updateLoad ? <ClipLoader color='white' className='pb-3'></ClipLoader> : "Save"}
                    </button>
            
                </form>

            </div>
        </>
    );
};

export default UpdateUsers;