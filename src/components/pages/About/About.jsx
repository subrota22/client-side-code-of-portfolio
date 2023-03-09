
import React, { useCallback, useContext, useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { useDropzone } from 'react-dropzone';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";
import { BsCloudUploadFill } from "react-icons/bs";
import PageLoad from '../../share/PageLoad/PageLoad';
import { AuthProvider } from '../../UserContext/UserContext';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
const About = () => {
    const [pageLoad, setPageLoad] = useState(true);
    const [aboutData, setAboutData] = useState([]);
    const [fileName, setFileName] = useState({});
    const [fileStatus, setFileStatus] = useState(false);
    const [updateLoad, setUpdateLoad] = useState(false);
    const {user} = useContext(AuthProvider) ;
    const [info, Setinfo] = useState();
    // console.log(sectionData);
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

    const getAboutinfo = (id) => {
        fetch(`https://subrota-server-subrota22.vercel.app/abouts/${id}`, {
            headers: {
                authentication: `Bearer ${localStorage.getItem("portfolio-token")} `
            }
        })
            .then(res => res.json())
            .then(data =>  Setinfo(data)
            )} ;

    const handleSubmit = (event) => {
        event.preventDefault();
        setUpdateLoad(true);
        fetch(`https://api.imgbb.com/1/upload?key=${imageBbKey}`, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                const adminImage = data.data?.display_url; //? data.data?.display_url //: sectionData?.projectImage;

                fetch(`https://subrota-server-subrota22.vercel.app/abouts/${info._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        authentication: `Bearer ${localStorage.getItem("portfolio-token")} `
                    },
                    body: JSON.stringify({
                        ...info,
                        adminImage: adminImage ? adminImage : info?.adminImage
                    })
                })
                    .then(res => {
                        if (res.status === 403) {
                            toast.warning("  😩 😩 You do have not access to edit this data. 😩 😩 ");
                         setUpdateLoad(false) ;
                        } else {
                            return res.json();
                        }
                    })
                    .then(data => {
                        if (data.acknowledged) {
                            toast.success("Congrasulations your about information is updated sucessfully !! ");
                            setUpdateLoad(false);
                           setAboutData([{...info , adminImage: adminImage ? adminImage : info?.adminImage}]) ;
                        }
                    })
            })
            .catch(error => { toast.error(error.message); setUpdateLoad(false) });

    }

    const handleSubmitedInputData = (event) => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        let newUpdateProject = { ...info };
        newUpdateProject[name] = value;
        Setinfo(newUpdateProject);
    }
    // console.log(aboutData);
    React.useEffect(() => {
        fetch(`https://subrota-server-subrota22.vercel.app/abouts`)
            .then(res => res.json())
            .then(data => {
                setAboutData(data);
                setPageLoad(false);
            });
    }, []);
    const particlesInit = useCallback(async engine => {
        await loadFull(engine);
       }, []);
       
       const particlesLoaded = useCallback(async container => {
           await console.log(container);
       }, []);

    <Particles
    id="tsparticles"
    init={particlesInit}
    loaded={particlesLoaded}
    options={{
        fpsLimit: 80,
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: "repulse",
                },
             },
            modes: {
                push: {
                    quantity: 8,
                },
                repulse: {
                    distance: 300,
                    duration: 2000,
                },
            },
        },
        particles: {
            color: {
                value: "#E30952",
            },
            links: {
                color: "#0F63B2",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 2,
            },
            collisions: {
                enable: true,
            },
            move: {
                directions: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: true ,
                speed: 2.6,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 80,
            },
            opacity: {
                value: 0.5,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 5 },
            },
        },
         detectRetina: true,
    }}
/>

    if (pageLoad) {
        return <PageLoad></PageLoad>
    }
    return (
        <>
            <Helmet> <title> About me </title></Helmet>
            <div className='aboutPage'>
                <div className='text-center fs-2 fw-bold text-info styleHeadOfContent my-5 px-5 py-2 text-uppercase'>
                    {
                        <Typewriter
                            words={['Welcome in ', 'my about ', 'page thanks', 'for your interest', 'to know about me !!']}
                            loop={Infinity}
                            cursor
                            cursorStyle='_'
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        />
                    }
                </div>
                {
                    aboutData?.map(data =>
                        <div className="card  h-auto bg-dark" key={data?._id}>
                            <img src={data?.adminImage ? data?.adminImage : "https://i.ibb.co/RSCmwXf/projectImagenot.jpg"} className="card-img-top rounded" alt="Subrota chandra" style={{height:"340px" , width:"100%"}}/>
                            <div className="card-body">
                                <h5 className="card-title">Name : {data?.name ? data?.name : "name not found"} </h5>
                                <p className="card-text"> Skills and qualifications : {data?.aboutText ? data?.aboutText : "text not found"} </p>
                                <p className="card-text"> Publish date : {data?.saveDate ? data?.saveDate : "save date not found"} </p>

                                <div className="d-flex justify-content-around my-4">
                                    <div>
                                        <a href={data?.websiteLink ? data?.websiteLink : "websiteLink not found"}
                                            target="_blank" rel='noreferrer' className='mx-2 btn btn-outline-primary'> Visit my website  <i className="fa-solid fa-arrow-right mx-5"></i> </a>

                                    </div>
                             {    user?.email === "subrota45278@gmail.com" &&   <div>
                                        <button className="btn btn-outline-success px-5" data-bs-toggle="modal" data-bs-target="#aboutModal"
                                            onClick={() => getAboutinfo(data?._id)} >
                                              Edit
                                            </button>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
{/* Edit about information */}
            <div className="modal fade" id="aboutModal" tabindex="-2" aria-labelledby="aboutModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-success text-white">
                            <h1 className="modal-title fs-5" id="aboutModalLabel"> Update about information </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body bg-dark ">
                            <form autoComplete='off' onSubmit={handleSubmit}>

                                <div className="w-full ">
                                    <textarea rows="5" cols="5" name="aboutText" onChange={handleSubmitedInputData}
                                        defaultValue={info?.aboutText}

                                        id="details" className="form-control my-4" placeholder='details description' required />
                                </div>

                                <div>
                                    <div className="relative  w-full ">
                                        <input type="text" name="name" onChange={handleSubmitedInputData}
                                            defaultValue={info?.name }
                                            id="projectTitle" className="form-control my-4" placeholder='Client side code link' required />
                                    </div>


                                </div>
                                <div>
                                    <div className="relative  w-full ">
                                        <input type="text" name="saveDate" onChange={handleSubmitedInputData}
                                            defaultValue={info?.saveDate }
                                            id="projectTitle" className="form-control my-4" placeholder='Enter your save data' required />
                                    </div>


                                </div>
                                {
                                    console.log(info?.aboutText)
                                }
                                <div>
                                    <div className="relative  w-full ">
                                        <input type="text" name="websiteLink" onChange={handleSubmitedInputData}
                                            defaultValue={info?.websiteLink}
                                            id="projectTitle" className="form-control my-4" placeholder='Enter your website link' required />
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
                                                            <p>Drop the image here ...</p>
                                                            <img src={info?.adminImage ? info?.adminImage : "https://i.ibb.co/RSCmwXf/imagenot.jpg"} alt="section" className='rounded-circle' style={{ height: "60px", width: "60px", border: "2px solid lime" }} />
                                                        </>
                                                }
                                            </>
                                        }

                                    </div>
                                </div>


                                <button type="submit" className="text-white my-2 text-uppercase btn btn-outline-success w-100">
                                    {updateLoad ? <ClipLoader color='white' className='pb-3'></ClipLoader> : "SAVE"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
export default About;