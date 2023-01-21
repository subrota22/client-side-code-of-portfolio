import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Typewriter } from 'react-simple-typewriter';
import { toast } from 'react-toastify';
import PageLoad from '../../../share/PageLoad/PageLoad';
const UserInformation = () => {
    const [usersUpdateLoad, setUserUpdateLoad] = useState(false);
    const [users, setUsers] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(6);
    const pages = Math.ceil(count / pageSize);

    React.useEffect(() => {
        fetch(`https://subrota-server-subrota22.vercel.app/usersInfo?page=${page}&size=${pageSize}`, {
            headers: {
                authentication: `Bearer ${localStorage.getItem("portfolio-token")} `
            }
        })
            .then(res => {
                if (res.status === 403) {
                    toast.warning("  😩 😩 You need to login first to see our users. 😩 😩 ");
                    setUserUpdateLoad(false);
                } else {
                    return res.json();
                }
            })
            .then(data => {
                setUsers(data?.data);
                setCount(data?.count);
            })
            .catch(error => console.log(error))
    }, [page, pageSize]);

    if (usersUpdateLoad) {
        return <PageLoad></PageLoad>
    }
    return (
        <>
            <Helmet>  Users info </Helmet>
{
 users?.length !== 0 &&

            <div className="container bg-dark h-auto w-auto rounded-2 p-2 my-5">
                <div className='text-center mx-auto fs-2 fw-bold  p-4 rounded-2'>
                    {
                        <Typewriter
                            words={['Our all', 'users information', 'they are already join', 'with us so why not', "you.", " Let's start"]}
                            loop={Infinity}
                            cursor
                            cursorStyle='_'
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        />
                    }
                </div>
                <div className="row mx-auto">
                    {
                        users.map(user =>
                            <div className="col-12  my-3 userInfoCard" key={user._id}>
                                <div className="card h-100 bg-dark text-white">

                                    <PhotoProvider>
                                        <PhotoView src={user?.profile ? user?.profile : "https://i.ibb.co/RSCmwXf/imagenot.jpg"}>
                                            <img src={user?.profile ? user?.profile : "https://i.ibb.co/RSCmwXf/imagenot.jpg"}
                                                className="w-100 projectImage" style={{ height: "250px" }}
                                                alt={user?.name ? user?.name : "name not found"}
                                                title="Click on this image to see the full image"
                                            />
                                        </PhotoView>
                                    </PhotoProvider>

                                    <div className="card-body">

                                        <h5 className="card-title"> Name : {user?.name}</h5>
                                        <p className="card-text"> Company name: {user?.companyName ? user?.companyName : "company n ame not found"}</p>
                                        <p className="card-text"> Joining date: {user?.joiningDate ? user?.joiningDate : "00/00/00"}</p>
                                        <div className='text-center d-flex justify-content-around mt-5'>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        )
                    }

                </div>
                {/* pagination start  */}
                <div className="text-center">

                    {
                        //page + 1 >=
                        page + 1 >= [...Array(pages).keys()].length &&
                        <button className={`btn btn-primary text-white fs-5 fw-bold py-2 px-3 mx-3 ${pages === 1 && 'd-none'}`}
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
                        <button className={`btn btn-primary text-white fs-5 fw-bold py-2 px-3 mx-3 ${pages === 1 && 'd-none'}`}
                            onClick={() => setPage(page + 1)}>

                            <i class="fa-solid fa-angle-right text-white fs-4 fw-bold"></i>
                            <i class="fa-solid fa-angle-right text-white fs-4 fw-bold"></i>
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
}

{
  users?.length === 0 &&   
   <div style={{margin:"158px 78px"}} className='text-center mx-auto fs-2 fw-bold styleHeadOfContent p-4 rounded-2'>
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

export default UserInformation;