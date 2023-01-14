import React, { useState } from 'react';
import { useContext } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { BsFillTrash2Fill } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import HashLoader from 'react-spinners/HashLoader';
import { toast } from 'react-toastify';
import { AuthProvider } from '../../UserContext/UserContext';
const Projects = () => {
    const { user } = useContext(AuthProvider);
    const [projects, setProjects] = useState([]);
    const [pageLoad , setPageLoad] = useState(true) ;
    React.useEffect(() => {
        fetch("https://portfolio-lake-nu-82.vercel.app/projects")
            .then(res => res.json())
            .then(data => {setProjects(data); setPageLoad(false) ;})
            .catch(error => console.log(error))
    }, []);

    //delete project section

    const deleteProject = (id) => {

        const confirmation = window.confirm("Do you want to delete this data?");
        if (confirmation) {

            fetch(`http://localhost:3025/projects/${id}`, {
                method: "DELETE",
                headers: {
                    authentication: `Bearer ${localStorage.getItem("portfolio-token")} `
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.success("Your data is deleted !! ");
                        const restData = projects.filter(data => data._id !== id);
                        setProjects(restData);
                    }
                });
        } else {
            toast.info("Your data is safe now ");
        }
    }

    if(pageLoad){
        return <>
        <div className='text-center' style={{ margin:"20% 45%"}}>
            <HashLoader color='blue'></HashLoader>
        </div>
        </>
    }
    return (
        <>

            <div className="container">

                <div className='text-center mx-auto fs-2 fw-bold styleHeadOfContent p-4 rounded-2'>
                    {
                        //My best projects that I made in 20/10/2022
                        <Typewriter
                            words={['My best projects', 'that I made in ', '>>---- 20/10/2022 --->>']}
                            loop={Infinity}
                            cursor
                            cursorStyle='_'
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        />
                    }
                </div>
                <div className="row">
                    {
                        projects.map(project =>
                            <div className="col col-12 col-md-6  my-3" key={project._id}>
                                <div className="cardBackground h-100" >
                                    <img src={project?.projectImage} className="card-img-top myImage" alt="project" />
                                    <div className="card-body p-3 text-white">
                                        <h5 className="card-title"> <span className='text-info'>Project name:</span> {project?.projectName} </h5>
                                        <p className="card-text"><span className='text-info'> Project description: </span>  {project?.description}</p>
                                        <div className='text-info'>
                                           {
                                             project?.clientRepositoryCode ?
                                             <a href={project?.clientRepositoryCode} target="_blank" rel='noreferrer' className='my-3 showRightArrow py-3 mx-5 text-white text-decoration-none '> Client side code repository link  <i className="fa-solid fa-arrow-right hiddenArrow"></i> </a>
                                            : undefined }
                                        </div>
                                        <div>
                                            {
                                                project?.serverRepositoryCode ?
                                                <a href={project?.serverRepositoryCode} target="_blank" rel='noreferrer' className='my-3 showRightArrow py-3 mx-5 text-white text-decoration-none '> Server side code repository link <i className="fa-solid fa-arrow-right hiddenArrow"></i> </a>
                                                 : undefined
                                            }
                                            
                                        </div>
                                 
                                      <div >
                                        {
                                                project?.liveWebsiteLink ?
                                            <a href={project?.liveWebsiteLink} target="_blank" rel='noreferrer' className='my-3 showRightArrow py-3 mx-5 text-white text-decoration-none'> Live web side link  <i className="fa-solid fa-arrow-right hiddenArrow"></i> </a>
                                        : undefined}
                                        </div>
                                        <div className="d-flex">
                                            <img src={project.authorImage} className="authorImage rounded-circle d-block" alt="Author" />
                                            <p className="p-4">Author : {project.authorName} </p>
                                        </div>


                         
                                             <div className='text-center mt-5'>
                                        <div>
                                        {
                                            user?.uid ?
                                                <NavLink to={`/details/${project?.projectId ? project?.projectId : project?._id}`} className="btn btn-outline-primary w-auto mx-5 py-2 px-4 hideBtn" >Show details <i className="fa-solid fa-arrow-right showDetailsAnimation"></i> </NavLink>
                                                : undefined

                                        }
                                        </div>
                                        
                                       <div>
                                       {user?.email === "subrota45278@gmail.com" &&
                                            <div className="d-flex flex-column m-auto">
                                                <div className="text-center mt-5 mb-0 ">
                                                    <div>
                                                        <i className="fa-solid fa-angles-down mx-3 fs-2 fw-bolder my-2 resumeDirection"></i></div>
                                                    <NavLink to={`/add-new-project-section/${project?._id}`} className="text-decoration-none
      btn btn-outline-info fw-bold text-white hideBtn w-auto px-4">   Add new project section <i className="fa-solid fa-arrow-right showDetailsAnimation"></i> </NavLink>
                                                </div>

                                            </div>}
                                       </div>
                                      </div>

                                        <div className='text-center d-flex justify-content-around mt-5'>
                                         <div>
                                         {
                                                user?.email === "subrota45278@gmail.com" &&
                                                <BsFillTrash2Fill className='text-danger fs-3 fw-bold'
                                                    onClick={() => deleteProject(project?._id)}></BsFillTrash2Fill>

                                            }
                                         </div>
                                         <div>
                                         {
                                                user?.email === "subrota45278@gmail.com" &&
                                           <NavLink to={`/edit-project/${project?._id}`}>
                                                 <BiEditAlt className='text-danger fs-3 fw-bold'
                                                    ></BiEditAlt>
                                           </NavLink>

                                            }
                                         </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default Projects;