import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../../MainLayout/MainLayout';
import AdminRouter from '../AdminRouter/AdminRouter';
import About from '../pages/About/About';
import AddNewProject from '../pages/AddCategories/AddNewProject/AddNewProject';
import AddNewSection from '../pages/AddCategories/AddNewSection/AddNewSection';
import Blogs from '../pages/Blogs/Blogs';
import Contact from '../pages/Contact/Contact';
import Details from '../pages/Details/Details';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Certifications from '../pages/OtherPages/Certifications/Certifications';
import PageError from '../pages/PageError/PageError';
import PrivacyPolicy from '../pages/PrivacyPolicy/PrivacyPolicy';
import Profile from '../pages/Profile/Profile';
import ReferenceData from '../pages/ReferenceData/ReferenceData';
import Refferall from '../pages/Refferall/Refferall';
import Register from '../pages/Register/Register';
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import UpdateProject from '../pages/UpdateCategories/UpdateProject/UpdateProject';
import UpdateSection from '../pages/UpdateCategories/UpdateSection/UpdateSection';
import UpdateProfile from '../pages/UpdateProfile/UpdateProfile';
import PrivateRouter from '../PrivateRouter/PrivateRouter';

const routes = createBrowserRouter([
    {
        path: "/", element: <MainLayout />, children: [
            {
                path: "/", element: <Home></Home>
            },
            {
                path: "/details/:id",
                loader: async ({ params }) =>
                    fetch(`https://subrota-server.vercel.app/details/${params.id}`, {
                        method: "GET",
                        headers: {
                            authentication: `Bearer ${localStorage.getItem("portfolio-token")} `
                        }
                    })
                        .then(res => res.json())
                        .then(data => data),
                element: <Details></Details>
            },
            {
                path: "/contact/",

                element: <Contact></Contact>
            },
            {
                path: "/about/",

                element: <About></About>
            },
            {
                path: "/certifications",

                element: <Certifications></Certifications>
            },
            {
                path: "/privacy/",

                element: <PrivacyPolicy></PrivacyPolicy>
            },
            {
                path: "/blogs/",

                element: <Blogs></Blogs>
            },
            {
                path: "/reference", element: <PrivateRouter><Refferall></Refferall></PrivateRouter>
            },
            {
                path: "/add-new-project", element: <PrivateRouter>
                    <AdminRouter>
                        <AddNewProject></AddNewProject>
                    </AdminRouter>
                </PrivateRouter>
            },
            {
                path: "/register", element: <Register></Register>
            },
            {
                path: "/login", element: <Login></Login>
            },
            {
                path: "/update-profile", element: <PrivateRouter><UpdateProfile></UpdateProfile></PrivateRouter>
            },
            {
                path: "/add-new-project-section/:id",
                loader: ({ params }) =>
                    fetch(`https://subrota-server.vercel.app/projects/${params.id}`, {
                        method: "GET",
                        headers: {
                            authentication: `Bearer ${localStorage.getItem("portfolio-token")} `
                        }
                    }).then(res => res.json())
                        .then(data => data)
                , element: <PrivateRouter>
                    <AdminRouter>
                        <AddNewSection></AddNewSection>
                    </AdminRouter>
                </PrivateRouter>
            },
            {
                path: "/referral", element: <PrivateRouter><ReferenceData></ReferenceData></PrivateRouter>
            },
            {
                path: "/profile", element: <PrivateRouter><Profile></Profile></PrivateRouter>
            },
            {
                path: "/reset-password", element: <PrivateRouter><ResetPassword></ResetPassword></PrivateRouter>
            },
            {
                path: "/edit-project/:id",
                loader: ({ params }) =>
                    fetch(`https://subrota-server.vercel.app/projects/${params.id}`, {
                        method: "GET",
                        headers: {
                            authentication: `Bearer ${localStorage.getItem("portfolio-token")} `
                        }
                    }).then(res => res.json())
                        .then(data => data)
                , element: <PrivateRouter>
                    <AdminRouter>
                        <UpdateProject></UpdateProject>
                    </AdminRouter>
                </PrivateRouter>
            },

            {
                path: "/edit-section/:id",
                loader: ({ params }) =>
                    fetch(`https://subrota-server.vercel.app/projectSections/${params.id}`, {
                        method: "GET",
                        headers: {
                            authentication: `Bearer ${localStorage.getItem("portfolio-token")} `
                        }
                    }).then(res => res.json())
                        .then(data => data)
                , element: <PrivateRouter>
                    <AdminRouter>
                        <UpdateSection></UpdateSection>
                    </AdminRouter>
                </PrivateRouter>
            },
            {
                path: "*", element: <PageError></PageError>
            }
        ]
    }
])

export default routes;