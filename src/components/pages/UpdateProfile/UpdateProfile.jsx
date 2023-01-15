import React, { useCallback, useContext, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Helmet } from 'react-helmet';
import { BsCloudUploadFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { toast } from 'react-toastify';
import { AuthProvider } from '../../UserContext/UserContext';

const UpdateProfile = () => {
const {updateUser} = useContext(AuthProvider) ;
const [resetLoad , setResetLoad] = useState(false) ;
const [fileName, setFileName] = useState({});
const [fileStatus, setFileStatus] = useState(false);
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
// console.log(imageBbKey);
const handleSubmit = (event) => {
event.preventDefault() ;
setResetLoad(true) ;
const name = event.target.name.value ;
fetch(`https://api.imgbb.com/1/upload?key=${imageBbKey}`, {
  method: "POST",
  body: formData
})
.then(res => res.json())
.then(data => {
  const imageLink = data.data?.display_url;
  //update user profile
updateUser(name , imageLink )
.then(() => {
toast.success("Congrasulation your profile has been updated !!") ;
setResetLoad(false) ;
event.target.reset() ;
setFileName({}) ;
navigate("/profile") ;
})
.catch(error => {toast.error(error.message) ;
   setResetLoad(false) ; }) ;

} )
} 



    return (
        <>
            <Helmet><title> Update profile </title></Helmet>
<form autoComplete='off' className='was-validated bg-dark my-5 w-50 mx-auto rounded-2 p-3 text-white' onSubmit={handleSubmit}>
  <h2 className='fs-2 fw-bolder text-center text-info my-4 text-uppercase'> Update profile </h2>
  <div className="mb-6">
    <input type="text" name='name' id="name" className='form-control' placeholder="Enter your name" required/>
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

  <div>
    <div className="d-flex my-4">
      <input id="remember" type="checkbox" className='form-check-input' required/>
    <label for="remember" className="ml-2 mx-2 text-sm form-check-label"> Agree to update profile </label>
    </div>
  </div>

<button type="submit" className="text-white px-5 py-2 my-3 btn btn-outline-info"> 
{ resetLoad ?   <ClipLoader color='white' className='pb-3 text-center'></ClipLoader>  : "Update profile"}
  
  </button>

</form>

        </>
    );
};

export default UpdateProfile;