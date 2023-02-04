import './App.css';
import { RouterProvider } from 'react-router-dom';
import routes from './components/routes/routes';
import { ToastContainer } from 'react-toastify';
import CustomCursor from 'custom-cursor-react';
import 'custom-cursor-react/dist/index.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-photo-view/dist/react-photo-view.css';
import 'react-slider-awesome/dist/index.css';
import 'react-phone-number-input/style.css';
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import FadeLoader from 'react-spinners/FadeLoader';
//NOTE : simply install react-particles and tsparticles to use tsparticles
function App() {
  const particlesInit = useCallback(async engine => {
 await loadFull(engine);
}, []);

const particlesLoaded = useCallback(async container => {
    await console.log(container);
}, []);

//animated card

  return (
    <>
        <ToastContainer />
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
