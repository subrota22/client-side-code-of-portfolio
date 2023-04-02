import './App.css';
import { RouterProvider } from 'react-router-dom';
import routes from './components/routes/routes';
import { ToastContainer } from 'react-toastify';
import CustomCursor from 'custom-cursor-react';
import 'custom-cursor-react/dist/index.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-photo-view/dist/react-photo-view.css';
import AOS from "aos" ;
//import 'react-slider-awesome/dist/index.css';
import 'react-phone-number-input/style.css';

import FadeLoader from 'react-spinners/FadeLoader';
import React from 'react';
//NOTE : simply install react-particles and tsparticles to use tsparticles
function App() {
//animated cards
React.useEffect(() => {
 AOS.init({
    duration:1500 , 
 });
}, []);

  return (
    <>
  <ToastContainer />

<CustomCursor
      targets={['.nav-link' , '.hideBtn' , ".cursorEffect"]}
      customClass='custom-cursor'
      dimensions={40}
      strokeColor="#DFDFDF"
      fill='#DFDFDF'
      smoothness={{
        movement: 0.2,
        scale: 0.1,
        opacity: 0.1,
      }}
      targetOpacity={0.5}
    />

    <RouterProvider router={routes} fallbackElement={ 

<div style={{margin:"20% 50%"}}><FadeLoader color="#36d7b7"  /></div>
    }></RouterProvider>
    </>
  );
}

export default App;
