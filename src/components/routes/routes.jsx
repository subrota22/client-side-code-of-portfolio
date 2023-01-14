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
import Login from '../pages/Login/Login';
import PageError from '../pages/PageError/PageError';
import PrivacyPolicy from '../pages/PrivacyPolicy/PrivacyPolicy';
import ReferenceData from '../pages/ReferenceData/ReferenceData';
import Refferall from '../pages/Refferall/Refferall';
import Register from '../pages/Register/Register';
import UpdateProject from '../pages/UpdateCategories/UpdateProject/UpdateProject';
import UpdateSection from '../pages/UpdateCategories/UpdateSection/UpdateSection';
const routes =  createBrowserRouter([
{
    path:"/" , element : <MainLayout/> , children:[
        {
            path:"/" , element:<Home></Home>
        },
        {
            path:"/details/:id" ,
            loader: async ({params}) => 
            fetch(`http://localhost:3025/details/${params.id}` , {
                method:"GET" , 
               headers:{
                authentication: `Bearer ${localStorage.getItem("portfolio-token")} `
               }
            })
            .then(res => res.json())
            .then(data => data ) , 
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
            path:"/register"  , element:<Register></Register>
            },
            {
            path:"/login"  , element:<Login></Login>
            },
        {
            path:"/add-new-project-section/:id"  ,
            loader: ({params}) => 
            fetch(`http://localhost:3025/projects/${params.id}` , {
               method:"GET" , 
               headers:{
                authentication: `Bearer ${localStorage.getItem("portfolio-token")} `
               }
            }).then(res => res.json())
            .then(data => data )
            ,element:<AddNewSection></AddNewSection>
            },
            {
              path:"/referral" , element:<ReferenceData></ReferenceData>
            } ,
            {
                path:"/edit-project/:id" ,
                loader:({params}) => 
                fetch(`http://localhost:3025/projects/${params.id}` , {
                    method:"GET" , 
                    headers:{
                     authentication: `Bearer ${localStorage.getItem("portfolio-token")} `
                    }
                 }).then(res => res.json())
                 .then(data => data )
                ,element:<UpdateProject></UpdateProject>
              } ,
              
            {
                path:"/edit-section/:id" ,
                loader:({params}) => 
                fetch(`http://localhost:3025/projectSections/${params.id}` , {
                    method:"GET" , 
                    headers:{
                     authentication: `Bearer ${localStorage.getItem("portfolio-token")} `
                    }
                 }).then(res => res.json())
                 .then(data => data )
                ,element:<UpdateSection></UpdateSection>
              } ,
        {
            path:"*" , element:<PageError></PageError>
        }
    ]
}
])

export default routes;