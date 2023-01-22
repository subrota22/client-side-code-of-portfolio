import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { BiEditAlt, BiTrashAlt } from 'react-icons/bi';
import { AiOutlineSend } from 'react-icons/ai';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { NavLink, useNavigate } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import DeleteConformation from '../../../share/DeleteConformation/DeleteConformation';
import errorDeleteMessage from '../../../share/deleteMessage/errorDeleteMessage';
import successDeleteMessage from '../../../share/deleteMessage/successDeleteMessage';
import PageLoad from '../../../share/PageLoad/PageLoad';
import { AuthProvider } from '../../../UserContext/UserContext';
import ButtonLoader from '../../../share/ButtonLoader/ButtonLoader';
const ManageUsers = () => {
    const [usersUpdateLoad, setUserUpdateLoad] = useState(false);
    const [users, setUsers] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(6);
    const pages = Math.ceil(count / pageSize);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setmodalData] = useState();
    const [deleteConfirm, setDeleteConfirm] = useState("");
    const [singleUserData, setSingleUserData] = useState({});
    const [allUsers , setAllUsers] = useState([]) ;
    const [sentLoad, setSentLoad] = useState(false);
    const navigate = useNavigate();
    const { user } = useContext(AuthProvider);
    React.useEffect(() => {

        fetch(`https://subrota-server-subrota22.vercel.app/usersInfo?page=${page}&size=${pageSize}`, {
            headers: {
                authentication: `Bearer ${localStorage.getItem("portfolio-token")} `
            }
        })
            .then(res => {
                if (res.status === 403) {
                    toast.warning("  😩 😩 You do have not access to get this data. 😩 😩 ");
                    setUserUpdateLoad(false);
                    navigate("/");
                } else {
                    return res.json();
                }
            })
            .then(data => {
                setUsers(data?.data);
                setCount(data?.count);
            })
            .catch(error => console.log(error))
    }, [page, pageSize, count, navigate]);

    //delete single user 

    const deleteSingleUser = (id) => {
        fetch(`https://subrota-server-subrota22.vercel.app/usersInfo/${id}`, {
            method: "DELETE",
            headers: {
                authentication: `Bearer ${localStorage.getItem("portfolio-token")} `
            }
        })
            .then(res => {
                if (res.status === 403) {
                    toast.warning("  😩 😩 You do have not access to delete this data. 😩 😩 ");
                    navigate("/");
                } else {
                    return res.json();
                }
            })
            .then(data => {
                if (data?.deletedCount > 0) {
                    const restData = users.filter(data => data._id !== id);
                    setUsers(restData);
                    successDeleteMessage();
                };
            })
            .catch(error => errorDeleteMessage(error));
    }
    //set data 
    const setData = (reciveData) => {
        setmodalData(reciveData);
        setShowModal(true);
    }

    //delete all users
    const deleteAllUsers = () => {
        fetch(`https://subrota-server-subrota22.vercel.app/deleteAllUsers/`, {
            method: "DELETE",
            headers: {
                authentication: `Bearer ${localStorage.getItem("portfolio-token")} `
            }
        })
            .then(res => {
                if (res.status === 403) {
                    toast.warning("  😩 😩 You do have not access to delete this data. 😩 😩 ");
                    navigate("/");
                } else {
                    return res.json();
                }
            })
            .then(data => {
                if (data?.acknowledged) {
                    setUsers([]);
                    Swal.fire({
                        icon: "success",
                        title: "All users deleted",
                        text: "Your all users information has beeen deleted!!",
                        timer: 4000,
                    });
                    window.location = "/";
                };
                console.log(data);
            })
            .catch(error => errorDeleteMessage(error));
    };

  
    //get single user data 

    const getUserInfo = (id) => {
        fetch(`https://subrota-server-subrota22.vercel.app/usersInfo/${id}`, {
            method: "GET",
            headers: {
                authentication: `Bearer ${localStorage.getItem("portfolio-token")} `
            }
        })
            .then(res => {
                if (res.status === 403) {
                    toast.warning("  😩 😩 You do have not access to delete this data. 😩 😩 ");
                    navigate("/");
                } else {
                    return res.json();
                }
            })
            .then(data => setSingleUserData(data))
            .catch(error => console.log(error));
    }

    //send single mail

    const singleEmailSent = (event) => {
        setSentLoad(true);
        event.preventDefault();
        const subject = event.target.subject.value;
        const message = event.target.message.value;
        const postData = {
            to: singleUserData?.email,
            subject: subject,
            message: message,
        }

        fetch(`https://subrota-server-subrota22.vercel.app/sendSingleMail`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authentication: `Bearer ${localStorage.getItem("portfolio-token")} `
            },
            body: JSON.stringify(postData)
        })
            .then(res => {
                if (res.status === 403) {
                    toast.warning("  😩 😩 You do have not access to delete this data. 😩 😩 ");
                    navigate("/");
                } else {
                    return res.json();
                }
            })
            .then(data => {
                console.log(data);
                if (data?.message === "sended") {
                    toast.success("Your mail successfully sent to " + singleUserData?.email);
                    event.target.reset();
                    setSentLoad(false);
                }
                else if (data?.message === "failed") {
                    toast.success("Your mail failed to sent ");
                }
            })
            .catch(error => toast.error(error));
    }

 //get all users informations

 React.useEffect(() => {
    fetch(`https://subrota-server-subrota22.vercel.app/all-users`, {
            method: "GET",
            headers: {
                authentication: `Bearer ${localStorage.getItem("portfolio-token")} `
            }
        })
            .then(res => {
                if (res.status === 403) {
                    toast.warning("  😩 😩 You do have not access to delete this data. 😩 😩 ");
                    navigate("/");
                } else {
                    return res.json();
                }
            })
            .then(data => setAllUsers(data))
            .catch(error => console.log(error));
 }, [navigate]);

    //send multile mail
    const multipleEmailSent = (event) => {
        setSentLoad(true);
        event.preventDefault();
        const subject = event.target.subject.value;
        const message = event.target.message.value;
        const postData = {
            to: allUsers.map(emails => emails?.email),
            subject: subject,
            message: message,
        }

        fetch(`https://subrota-server-subrota22.vercel.app/sendMultipleleMail`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authentication: `Bearer ${localStorage.getItem("portfolio-token")} `
            },
            body: JSON.stringify(postData)
        })
            .then(res => {
                if (res.status === 403) {
                    toast.warning("  😩 😩 You do have not access to delete this data. 😩 😩 ");
                    navigate("/");
                } else {
                    return res.json();
                }
            })
            .then(data => {
                console.log(data);
                if (data?.message === "sended") {
                    toast.success("Your mail successfully sent to " + allUsers.map(emails => emails?.email));
                    event.target.reset();
                    setSentLoad(false);
                }
                else if (data?.message === "failed") {
                    toast.success("Your mail failed to sent ");
                }
            })
            .catch(error => toast.error(error));
    }

 //set all users emails

  if (usersUpdateLoad) {
        return <PageLoad></PageLoad>
    }
    return (
        <>
            <Helmet>  Manage user  </Helmet>

            {showModal &&
                <DeleteConformation
                    modalData={modalData}
                    setShowModal={setShowModal}
                    deleteFunction={deleteSingleUser}
                >
                </DeleteConformation>}

            {
                users?.length !== 0 &&
                <>
                    <div className="container h-auto w-auto  rounded-2 p-2 my-5" style={{ backgroundColor: "rgb(9, 5, 61 )" }}>
                   <div className="d-flex flex-sm-column flex-md-row justify-content-between">
                   <button className="btn btn-outline-danger mt-4" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete all users</button>
                        <button type="button" className="btn btn-outline-primary mx-2 mt-4"
                        data-bs-toggle="modal" data-bs-target="#multipleEmailSedingModal">
                                  Mail all users
                                 </button>
                   </div>
                        <div className="d-flex justify-around">
                             {
                                <div>

                                    <div className="modal" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header bg-dark text-white">
                                                    <h1 className="modal-title  text-primary fs-5" id="deleteModalLabel"> You can not revert this all data after deleted</h1>
                                                    <button type="button" className="btn btn-outline-primary  fs-6 fw-bolder" data-bs-dismiss="modal" aria-label="Close">
                                                        <i class="fa-solid fa-xmark px-1"></i>
                                                    </button>
                                                </div>
                                                <div className="modal-body bg-dark text-primary">
                                                    If you want to delete all users please type here :
                                                    <p className='text-danger fs-6 fw-bolder'> Yes I want to delete all users  </p>
                                                    <form autoComplete='off'>
                                                        <input type="text" placeholder='Enter the confirm text here' className='form-control text-danger'
                                                            onChange={(e) => setDeleteConfirm(e.target.value)} />
                                                    </form>
                                                </div>
                                                <div className="modal-footer bg-dark text-white">
                                                    <button type="button" className="btn btn-outline-primary" data-bs-dismiss="modal">Cancel</button>
                                                    <button type="button"
                                                        className="btn btn-outline-danger"
                                                        onClick={() => deleteAllUsers()}
                                                        id={deleteConfirm !== "Yes I want to delete all users" ? "deleteUsersButtonHide" : "deleteUsersButtonShow"}>
                                                        Delete all users
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            }

                            {/* email sending modal */}

                            {
                                <div>

                                    <div className="modal rounded" id="singleEmailSedingModal" tabindex="-1" aria-labelledby="singleEmailSedingModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header bg-dark text-white">
                                                    <h1 className="modal-title  text-primary fs-5" id="singleEmailSedingModalLabel"> Send mail to {singleUserData?.name}</h1>
                                                    <button type="button" className="btn btn-outline-primary  fs-6 fw-bolder" data-bs-dismiss="modal" aria-label="Close">
                                                        <i class="fa-solid fa-xmark px-1"></i>
                                                    </button>
                                                </div>
                                                <form onSubmit={singleEmailSent} autoComplete='off'>

                                                    <div className="modal-body bg-dark text-primary">

                                                        <div className='my-4'>
                                                            <input type="text" placeholder='Enter the subject' className='form-control'
                                                                autoComplete='off' name="subject" required />
                                                        </div>
                                                        <div className="mt-3">
                                                            <textarea placeholder='Enter your message' cols="5" rows="5" className='form-control '
                                                                name="message" autoComplete='off' required />
                                                        </div>

                                                    </div>
                                                    <div className="bg-dark py-3 pb-3 text-center text-white">
                                                        <button type="button" className="btn btn-outline-primary mx-2" data-bs-dismiss="modal">Cancel</button>
                                                        <button type="submit"
                                                            className="btn btn-outline-success w-50 text-center mx-2">
                                                        <span className='d-flex justify-content-around'><span> Send mail</span> 
                                                        <span><AiOutlineSend className='text-primary fs-3 mx-2'></AiOutlineSend></span>
                                                     <span>  {sentLoad !== true ? undefined :  <ButtonLoader></ButtonLoader> }</span>
                                                       </span> 
                                                        </button>
                                                      </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            }

  {/* multiple email sending modal */}

  {
                                <div>

                                    <div className="modal rounded" id="multipleEmailSedingModal" tabindex="-1" aria-labelledby="multipleEmailSedingModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header bg-dark text-white">
                                                    <h1 className="modal-title  text-primary fs-5" id="multipleEmailSedingModalLabel"> Send mail to all users </h1>
                                                    <button type="button" className="btn btn-outline-primary  fs-6 fw-bolder" data-bs-dismiss="modal" aria-label="Close">
                                                        <i class="fa-solid fa-xmark px-1"></i>
                                                    </button>
                                                </div>
                                                <form onSubmit={multipleEmailSent} autoComplete='off'>

                                                    <div className="modal-body bg-dark text-primary">

                                                        <div className='my-4'>
                                                            <input type="text" placeholder='Enter the subject' className='form-control'
                                                                autoComplete='off' name="subject" required />
                                                        </div>
                                                        <div className="mt-3">
                                                            <textarea placeholder='Enter your message' cols="5" rows="5" className='form-control '
                                                                name="message" autoComplete='off' required />
                                                        </div>

                                                    </div>
                                                    <div className="bg-dark py-3 pb-3 text-center text-white">
                                                        <button type="button" className="btn btn-outline-primary mx-2" data-bs-dismiss="modal">Cancel</button>

                                                     <button type="submit"
                                                            className="btn btn-outline-success w-50 text-center mx-2">
                                                        <span className='d-flex justify-content-around'><span> Send mail</span> 
                                                        <span><AiOutlineSend className='text-primary fs-3 mx-2'></AiOutlineSend></span>
                                                     <span>  {sentLoad !== true ? undefined :  <ButtonLoader></ButtonLoader> }</span>
                                                       </span> 
                                                        </button>
                                                   </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            }
                          <div className='text-center mx-auto fs-2 fw-bold  p-4 rounded-2'>
                                {
                                    <Typewriter
                                        words={[`Welcome ${user?.displayName ? user?.displayName : "admin"}`, 'You can manage all', 'users information', 'from here', 'click edit icon to edit', 'click delete icon to delete', " Let's start"]}
                                        loop={Infinity}
                                        cursor
                                        cursorStyle='_'
                                        typeSpeed={70}
                                        deleteSpeed={50}
                                        delaySpeed={1000}
                                    />
                                }
                            </div>
                        </div>

                        <table className="table table-dark text-center align-middle table-striped table-hover">
                            <thead className='py-4 fs-6 fw-bolder '>
                                <tr className='table-success py-4'>
                                    <th>Serial </th>
                                    <th>Profile </th>
                                    <th>Name </th>
                                    <th>Email </th>
                                    <th>Phone number </th>
                                    <th>Company</th>
                                    <th>Joining date  </th>
                                    <th>Send message</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    users.map((user, serial) =>
                                        <tr key={user?._id}>
                                            <td>{serial + 1}</td>
                                            <td>
                                                <PhotoProvider>
                                                    <PhotoView src={user?.profile ? user?.profile : "https://i.ibb.co/RSCmwXf/imagenot.jpg"}>
                                                        <img src={user?.profile ? user?.profile : "https://i.ibb.co/RSCmwXf/imagenot.jpg"}
                                                            className="rounded-circle border-2" style={{ height: "80px", width: "80px", border: "2px solid lime" }}
                                                            alt={user?.name ? user?.name : "name not found"}
                                                            title="Click on this image to see the full image"
                                                        />
                                                    </PhotoView>
                                                </PhotoProvider>
                                            </td>
                                            <td>{user?.name ? user?.name : "name not found"}</td>
                                            <td>{user?.email ? user?.email : "email not found"}</td>
                                            <td>{user?.phoneNumber ? user?.phoneNumber : "phone number not found"}</td>
                                            <td>{user?.companyName ? user?.companyName : "company name not found"}</td>
                                            <td>{user?.joiningDate ? user?.joiningDate : "00/00/00"}</td>
                                            <td>
                                                <AiOutlineSend onClick={() => getUserInfo(user?._id)}
                                                    style={{ cursor: "pointer" }}
                                                    className='text-primary fs-3  fw-bold'
                                                    data-bs-toggle="modal" data-bs-target="#singleEmailSedingModal"
                                                ></AiOutlineSend></td>
                                            <td>

                                                <NavLink to={`/update-user-informations/${user?._id}`}>
                                                    <BiEditAlt className='fs-4 fw-bold text-success'></BiEditAlt>
                                                </NavLink>
                                            </td>
                                            <td style={{ cursor: "pointer" }} onClick={() => setData(user)}>
                                                <BiTrashAlt className='fs-4 fw-bold text-danger'></BiTrashAlt></td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>


                        {/* pagination start  */}
                        <div className="text-center">

                            {
                                //page + 1 >=
                                page + 1 >= [...Array(pages).keys()].length &&
                                <button className={`btn btn-primary text-white fs-5 fw-bold py-2 px-3 mx-3 ${pages === 1 && 'd-none'}`}
                                    onClick={() => setPage(page - 1)}>
                                    <i className="fa-solid fa-angle-left text-white fs-4 fw-bold"></i>
                                    <i className="fa-solid fa-angle-left text-white fs-4 fw-bold"></i>
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
                                <button className={`btn btn-primary text-white fs-5 fw-bold py-2 px-3 mx-3 ${pages === 1 && 'd-none'}`}
                                    onClick={() => setPage(page + 1)}>

                                    <i className="fa-solid fa-angle-right text-white fs-4 fw-bold"></i>
                                    <i className="fa-solid fa-angle-right text-white fs-4 fw-bold"></i>
                                </button>
                            }


                            {/* page size set  */}
                            <select className='btn btn-success text-white fw-bold py-2 px-4 mx-3' onChange={(e) => setPageSize(e.target.value)}>
                                <option className='text-info fw-bold' selected disabled> Select page size. </option>
                                <option value="2">2</option>
                                <option value="4">4</option>
                                <option value="6">6</option>
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
                        {/* pagination end  */}
                    </div>

                </>
            }
            {
                users?.length === 0 &&
                <div style={{ margin: "158px 78px" }} className='text-center mx-auto fs-2 fw-bold styleHeadOfContent p-4 rounded-2'>
                    {
                        //My best projects that I made in 20/10/2022
                        <Typewriter
                            words={['There is no', 'user', 'yet !!']}
                            loop={Infinity}
                            cursor
                            cursorStyle='_'
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        />
                    }
                </div>
            }
        </>
    );
};

export default ManageUsers;