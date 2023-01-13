import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
const Projects = () => {
    const [projects, setProjects] = useState([]);
    React.useEffect(() => {
        fetch("https://portfolio-lake-nu-82.vercel.app/projects")
            .then(res => res.json())
            .then(data =>setProjects(data))
            .catch(error => console.log(error))
    }, []);
    return (
        <>
    
            <div className="container">
                
         <div className='text-center fs-2 fw-bold text-info my-5 bg-dark text-white w-auto p-4 rounded-2'>
         {
            //My best projects that I made in 20/10/2022
                 <Typewriter
                 words={['My best projects', 'that I made in ' , '>>---- 20/10/2022 --->>']}
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
                            <div className="col col-12 col-md-6  my-3" data-aos="zoom-in" data-aos-delay="600"  data-aos-duration="2000"  key={project._id}>
                                <div className="cardBackground h-100" >
                                    <img src={project?.projectImage} className="card-img-top myImage" alt="project" />
                                    <div className="card-body p-3 text-white">
                                        <h5 className="card-title"> Project name: {project?.projectName} </h5>
                                        <p className="card-text"> Project description: {project?.description}</p>
                                      <div>
                                      <a href={project?.clientRepositoryCode} target="_blank" rel='noreferrer' className='my-3 showRightArrow py-3 mx-5 text-white text-decoration-none '> Client side code repository link  <i className="fa-solid fa-arrow-right hiddenArrow"></i> </a>
                                      </div>
                                       <div>
                                       <a href={project?.serverRepositoryCode} target="_blank" rel='noreferrer' className='my-3 showRightArrow py-3 mx-5 text-white text-decoration-none '> Server side code repository link <i className="fa-solid fa-arrow-right hiddenArrow"></i> </a>
                                       </div>
                                       <div>
                                       <a href={project?.liveWebsiteLink} target="_blank" rel='noreferrer' className='my-3 showRightArrow py-3 mx-5 text-white text-decoration-none'> Live web side link  <i className="fa-solid fa-arrow-right hiddenArrow"></i> </a>
                                       
                                       </div>
                                        <div className="d-flex">
                                            <img src={project.authorImage} className="authorImage rounded-circle d-block" alt="Author" />
                                            <p className="p-4">Author : {project.authorName} </p>
                                        </div>
                                        <NavLink to={`/details/${project?.projectId}`} className="btn btn-outline-primary w-50 mx-5 py-2 hideBtn" >Show details <i className="fa-solid fa-arrow-right showDetailsAnimation"></i> </NavLink>
<div className="d-flex flex-column m-auto">
  <div className="text-center mt-5 mb-0 ">
      <div>
         <i className="fa-solid fa-angles-down mx-3 fs-2 fw-bolder my-2 resumeDirection"></i></div>
         <NavLink to="/add-new-project-section" className="text-decoration-none
      btn btn-outline-info fw-bold text-white hideBtn w-100">   Add new project section <i className="fa-solid fa-arrow-right showDetailsAnimation"></i> </NavLink>
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