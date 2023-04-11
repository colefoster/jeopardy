import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

const Background = (props) => {
    const particlesInit = useCallback(async engine => {
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {

    }, []);

    
    if(!props.enabled) return null
    else if(props.mode === 'picture'){ 
        const backgroundStyle = {
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
             <div style={backgroundStyle}></div>

            );
        } else {
    return (
         <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                background: {
                    color: {
                        value: "#0d47a1",
                    },
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                        onHover: {
                            enable: true,
                            mode: "connect",
                            
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 1,
                        },
                        connect: {
                            distance: 200, //how far each particle will search for other particles
                            radius:200,//radius around mouse to affect
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
                        value: ["#ffffff","#060CE9", "#8D2AB5", "#115FF4"]
                    },
                    links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: false,
                        opacity: 0.5,
                        width: 1,
                    },
                    collisions: {
                        enable: false,
                        mode:"bounce"
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "out",
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

                        type: "polygon",
                    },
                    size: {
                        value: { min: 20, max: 35 },
                    },
                },
                detectRetina: true,
            }}
        />
    );}
};

export default Background;