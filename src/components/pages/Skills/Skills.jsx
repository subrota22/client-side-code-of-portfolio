import { Typewriter } from 'react-simple-typewriter';
import React, { useContext, useEffect, useState } from 'react';
import HashLoader from 'react-spinners/HashLoader';
import { NavLink } from 'react-router-dom';
import { AuthProvider } from '../../UserContext/UserContext';
import { BsFillTrash2Fill } from 'react-icons/bs';
import { BiEditAlt } from 'react-icons/bi';
import { toast } from 'react-toastify';
import DeleteConformation from '../../share/DeleteConformation/DeleteConformation';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import errorDeleteMessage from '../../share/deleteMessage/errorDeleteMessage';
import successDeleteMessage from '../../share/deleteMessage/successDeleteMessage';
const Skills = () => {
    const [skills, setSkills] = useState([]);
    const [pageLoad, setPageLoad] = useState(true);
    const { user } = useContext(AuthProvider);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(6);
    const pages = Math.ceil(count / pageSize);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setmodalData] = useState();

//    console.log( page +1 >=[...Array(2).keys()]); => make array by number
    useEffect(() => {
        //  if(!page || !pageSize) return ;
        fetch(`https://subrota-server-subrota22.vercel.app/skills?page=${page}&size=${pageSize}`)
            .then(res => res.json())
            .then(data => {
                setSkills(data.data);
                setPageLoad(false);
                setCount(data?.count)
            })
            .catch(error => console.log(error))
    }, [page, pageSize]);


    //delete project section

    const deleteSkill = (id) => {
        fetch(`https://subrota-server-subrota22.vercel.app/skills/${id}`, {
            method: "DELETE",
            headers: {
                authentication: `Bearer ${localStorage.getItem("portfolio-token")} `
            }
        })
            .then(res => {
                if (res.status === 403) {
                    toast.warning("  😩 😩 You do have not access to delete this data. 😩 😩 ");
                } else {
                    return res.json();
                }
            })
            .then(data => {
                if (data?.deletedCount > 0) {
                    const restData = skills.filter(data => data._id !== id);
                    setSkills(restData);
                    successDeleteMessage() ;
                };
            })
            .catch(error => errorDeleteMessage(error));
    }
    //set data 
    const setData = (reciveData) => {
        setmodalData(reciveData);
        setShowModal(true);
    }


    if (pageLoad) {
        return <>
            <div className='text-center' style={{ margin: "20% 45%" }}>
                <HashLoader color='blue'></HashLoader>
            </div>
        </>
    }

    if(skills?.length === 0) {
        return setPageLoad(false) ;
        }
    return (
        <>

         {
          skills?.length !== 0 &&  <div>
                   {showModal &&
                <DeleteConformation
                    modalData={modalData}
                    setShowModal={setShowModal}
                    deleteFunction={deleteSkill}
                >
                </DeleteConformation>}

            <div className="container">
                <div className='text-center mx-auto fs-2 fw-bold styleHeadOfContent p-4 rounded-2'>
                    {
                        <Typewriter
                            words={['My skill', 'in programming languages', 'thanks to visit', 'this website']}
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
                    user?.email === "subrota45278@gmail.com" &&
                    <div className="my-2">
                    <div className='ms-5'><i className="fa-solid fa-angles-down mx-3 fs-2 fw-bolder my-2 resumeDirection"></i></div>
                    <NavLink to="/add-new-skill" className="text-decoration-none
  btn btn-outline-info px-4 py-2 fw-bold text-white hideBtn"> Add-new-skill  <i className="fa-solid fa-arrow-right showDetailsAnimation"></i> </NavLink>
                </div>
                 }


                    {
                        skills.map(skill =>
                            <div className="col col-12 col-sm-12 col-md-6 col-lg-4 my-3" key={skill._id}>
                                <div className="card h-100 bg-dark text-white">

                                    <PhotoProvider>
                                        <PhotoView src={skill?.technologyImage ? skill?.technologyImage : "https://i.ibb.co/RSCmwXf/imagenot.jpg"}>
                                            <img src={skill?.technologyImage ? skill?.technologyImage : "https://i.ibb.co/RSCmwXf/imagenot.jpg"}
                                            className="w-100 projectImage" style={{height:"250px"}}
                                            alt={skill?.technology ? skill?.technology : "technology not found"}
                                            title="Click on this image to see the full image"
                                            />
                                        </PhotoView>
                                    </PhotoProvider>

                                    <div className="card-body">
                                        <h5 className="card-title"> Technology : {
                                            skill?.technology ? skill?.technology : "technology not found"
                                        }</h5>
                                        <h5 className="card-title"> Experience: {skill?.experience}</h5>
                                        <p className="card-text"> Real time experience: {skill?.realTimeExperience.length > 250 ? skill?.realTimeExperience.slice(0 , 250) + "..." : skill?.realTimeExperience}</p>
                                        <p className="card-text"> Starting date: {skill?.startingDate ? skill?.startingDate : "starting date not found"}</p>
                                        <div className='text-center d-flex justify-content-around mt-5'>
                                            <div>
                                                {
                                                    user?.email === "subrota45278@gmail.com" &&
                                                    <BsFillTrash2Fill style={{ cursor: "pointer" }} className='text-danger  fs-3 fw-bold' title={`Click on this icon to delete your  ${skill?.technology} project data`}
                                               onClick={() => setData(skill)}></BsFillTrash2Fill>

                                                }
                                            </div>
                                            <div>
                                                {
                                                    user?.email === "subrota45278@gmail.com" &&
                                                    <NavLink to={`/edit-skill/${skill?._id}`} title={`Click on this icon to update your  ${skill?.technology} project data`}>
                                                        <BiEditAlt className='text-success fs-3 fw-bold'
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
                {/* pagination  */}
                <div className="text-center">

                    {
                        //page + 1 >=
                        page + 1 >= [...Array(pages).keys()].length &&
                        <button   className={`btn btn-primary text-white fs-5 fw-bold py-2 px-3 mx-3 ${pages===1  && 'd-none'}`}
                         onClick={() => setPage(page - 1)}>
                            <i class="fa-solid fa-angle-left text-white fs-4 fw-bold"></i>
                            <i class="fa-solid fa-angle-left text-white fs-4 fw-bold"></i>
                        </button>
                    }

                    {
                        [...Array(pages).keys()].map(pageNumber =>
                            <button className={pageNumber === page ? ' activeButton  mx-2 px-4 py-2 fs-5 fw-bold my-3' : 'btn px-4 fs-5 fw-bold py-2 btn-success mx-2'}
                                onClick={() => setPage(pageNumber)}
                            >{pageNumber + 1}</button>
                        )
                    }

                    {

                        [...Array(pages).keys()].length > page + 1 &&
                        <button  className={`btn btn-primary text-white fs-5 fw-bold py-2 px-3 mx-3 ${pages===1  && 'd-none'}`}
                         onClick={() => setPage(page + 1)}>

                            <i class="fa-solid fa-angle-right text-white fs-4 fw-bold"></i>
                            <i class="fa-solid fa-angle-right text-white fs-4 fw-bold"></i>
                        </button>
                    }


                    {/* page size set  */}
                    <select className='btn btn-success text-white fs-5 fw-bold py-2 px-4 mx-3' onChange={(e) => setPageSize(e.target.value)}>
                    <option className='text-info fw-bold' disabled> Select page size. </option>
                         <option value="2">2</option>
                         <option value="4">4</option>
                         <option value="6" 
                                  selected>6</option>
                         <option value="8">8</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                        <option value="60">60</option>
                        <option value="70">70</option>
                        <option value="80">80</option>
                        <option value="90">90</option>
                        <option value="100">100</option>
                        <option value="110">110</option>
                        <option value="120">120</option>
                        <option value="300">130</option>
                   </select>

                </div>
            </div>
            </div>
         }
        </>
    );
};

export default Skills;