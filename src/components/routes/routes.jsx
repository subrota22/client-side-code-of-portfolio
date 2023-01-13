import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../../MainLayout/MainLayout';
import About from '../pages/About/About';
import AddNewProject from '../pages/AddCategories/AddNewProject/AddNewProject';
import AddNewSection from '../pages/AddCategories/AddNewSection/AddNewSection';
import Blogs from '../pages/Blogs/Blogs';
import Contact from '../pages/Contact/Contact';
import Details from '../pages/Details/Details';
import Home from '../pages/Home/Home';
import PageError from '../pages/PageError/PageError';
import PrivacyPolicy from '../pages/PrivacyPolicy/PrivacyPolicy';
import Refferall from '../pages/Refferall/Refferall';
const routes =  createBrowserRouter([
{
    path:"/" , element : <MainLayout/> , children:[
        {
            path:"/" , element:<Home></Home>
        },
        {
            path:"/details/:id" ,
            loader: async ({params}) => fetch(`https://portfolio-lake-nu-82.vercel.app/details/${params.id}`) , 
            element:<Details></Details>
        } ,
        {
            path:"/contact/" ,
          
            element:<Contact></Contact>
        } ,
        {
            path:"/about/" ,
          
            element:<About></About>
        } ,
        {
            path:"/privacy/" ,
          
            element:<PrivacyPolicy></PrivacyPolicy>
        } ,
        {
            path:"/blogs/" ,
          
            element:<Blogs></Blogs>
        } ,
        {
        path:"/reference"  , element:<Refferall></Refferall>
        },
        {
        path:"/add-new-project"  , element:<AddNewProject></AddNewProject>
        },
        {
            path:"/add-new-project-section"  , element:<AddNewSection></AddNewSection>
            },
        {
            path:"*" , element:<PageError></PageError>
        }
    ]
}
])

export default routes;