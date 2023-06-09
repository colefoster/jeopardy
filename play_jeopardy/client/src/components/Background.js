import React from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import HiddenMenu from './HiddenMenu';
import BackButton from 'components/BackButton';
import { useSelector } from 'react-redux';



  
function Background  (props) {


  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  const particlesLoaded = async (container) => {};



  const particleOptions = {
    background: {
      color: {
        value: '#0d47a1',
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: 'push',
        },
        onHover: {
          enable: true,
          mode: 'connect',
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 1,
        },
        connect: {
          distance: 200,
          radius: 200,
          links: {
            opacity: 0.5,
          },
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: ['#ffffff', '#060CE9', '#8D2AB5', '#115FF4'],
      },
      links: {
        color: '#ffffff',
        distance: 150,
        enable: false,
        opacity: 0.5,
        width: 1,
      },
      collisions: {
        enable: false,
        mode: 'bounce',
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: {
          default: 'out',
        },
        random: false,
        speed: 3,
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
        options: {
          polygon: {
            nb_sides: 4,
          },
        },
        type: 'polygon',
      },
      size: {
        value: { min: 20, max: 35 },
      },
    },
    detectRetina: true,
  };

  const imageStyle = {
    backgroundImage: `url("https://parade.com/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_1240/MTkwNTgxMTE3NzUxOTkzNDY5/jeopardy-board.webp")`,
    backgroundSize: '100% 100%',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
  };

  return (
    <>
      <BackButton />
    <HiddenMenu 

          
        />
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particleOptions}
        style={{ display: useSelector(state => state.settings.backgroundMode) === 'particles' ? 'block' : 'none' }}
      />

      <div style={{ display: useSelector(state => state.settings.backgroundMode) === 'picture' ? 'block' : 'none' }}>
        <div style={imageStyle}></div>
      </div>
    </>
  );
};

export default Background;
