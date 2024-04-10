import React from "react";
import { NavLink } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <div>
        {/* Section 2 */}
        <section className="px-2 py-32 bg-white md:px-0">
          <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
            <div className="flex flex-wrap items-center sm:-mx-3">
              <div className="w-full md:w-1/2 md:px-3">
                <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                  
                  <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">
                    Vighnaharata Trust's Shivajirao S. Jondhle College of Engg.
                    & Technology, Asangaon. Department of Electronics &
                    Telecommunication Engg.
                  </p>
                  
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkWR7vG_pc_G82S2e3SWD0bmnuoEQJzF75Y0L_TxVY&s" alt="college pic" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="w-full flex justify-center items-center" >
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkWR7vG_pc_G82S2e3SWD0bmnuoEQJzF75Y0L_TxVY&s" alt="" />
        </div>
        <div className="flex justify-center items-center">
          <h1>SOme info about College here!</h1>
        </div>
       
      </div>
    </div>
  );
};

export default Landing;
