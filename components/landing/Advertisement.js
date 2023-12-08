import React, { useContext } from 'react';
import Marquee from "react-fast-marquee";

// import './advertisement.css';

import { advertisementtData } from '../../data/advertisementData';


const Advertisement = () => {

  // const { theme } = useContext(ThemeContext);

  const skillBoxStyle = {
    backgroundColor: 'white',
    boxShadow: `0px 0px 30px 30px`
  }

  return (
    <section id='advertisement' className='relative isolate overflow-hidden'>
      <div className="relative isolate overflow-hidden">
        <div className="">
          <div className="text-center text-lg">
            <div className="flex flex-col items-center justify-start px-2" >
              <div className="flex items-center justify-center">
                <h2 className="font-primary font-bold text-5xl text-center">Advertisements</h2>
              </div>
              <div className="flex items-center justify-center w-full mt-14 px-8">
                <div className="w-full mx-8">
                  <Marquee
                    gradient={false}
                    speed={100}
                    pauseOnHover={true}
                    pauseOnClick={true}
                    delay={0}
                    play={true}
                    direction="left"
                  >
                    {advertisementtData.map(({ name, position, image }) => (
                      <div className="shadow-lg rounded-lg w-60 h-70 m-8 flex flex-col items-center justify-center p-8 transition-transform ease-in-out duration-300 hover:scale-125 shadow-purple-400/50 hover:shadow-lg hover:shadow-purple-400/50" key={name}>
                        {/* <img src={image} alt="image" className='w-40 p-6'/> */}
                        <div className="w-40 h-40 flex items-center justify-center">
                          <img src={image} alt="logo"/>
                        </div>
                        <h3 className=''>
                          {name}
                        </h3>
                        <h4 className='font-bold pt-3'>
                          {position}
                        </h4>
                      </div>
                    ))}
                  </Marquee>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Advertisement