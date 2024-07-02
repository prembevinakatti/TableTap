import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png"

const LandingPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="landing w-full h-[100vh] xl:flex items-center justify-center">
      <div className="xl:w-[8vw] h-[10vh] flex xl:flex-col items-center justify-between xl:h-full bg-black p-3">
        <div className="w-[7vw]">
          <img className="w-full h-full object-cover" src={Logo} alt="" />
        </div>
        <h1 className="text-white xl:text-3xl xl:mb-40 md:w-[20vw] w-[30vw] xl:-rotate-90 font-semibold">
          Effortless Dining Reservations
        </h1>
      </div>
      <div className="w-[95vw] h-full bg-white flex items-center justify-center">
        <div className="rightContent w-full h-full xl:flex items-center justify-center gap-5 p-8">
          <div className="videoContent relative xl:w-1/3 h-[70vh] border shadow-lg">
            <div className="bg-primary md:rotate-0 xl:-rotate-90 relative xl:top-20 mr-2 xl:right-10 text-xl text-white font-semibold p-2 rounded-sm w-fit">
              RESERVE NOW
            </div>
            <div className="video md:w-[80vw] xl:w-[40vh] h-full xl:h-[60vh]">
              <video
                className="w-full xl:ml-16 lg:ml-16 h-full md:h-[60vh] object-cover"
                src="src/assets/TableTap.mp4"
                autoPlay
                loop
                muted
              ></video>
            </div>
            <div className="w-[10vw] absolute bottom-0 -rotate-12 right-0 h-[10vw] overflow-hidden z-20">
              <img
                className="w-full object-cover"
                src="src/assets/videoimage.png"
                alt=""
              />
            </div>
          </div>
          <div className="detailsContent xl:w-[55vw] w-fit h-fit p-10 flex flex-col mt-16 xl:mt-0 items-center justify-center gap-10 xl:h-[70vh] border shadow-xl">
            <h1 className="w-full text-3xl font-semibold text-center">
              TableTap
            </h1>
            <h1 className="md:text-5xl xl:w-[45vw] lg:w-[60vw] lg:text-center md:text-start text-center text-2xl leading-[1.4] font-bold md:w-[40vw]">
              Dine with Ease: Simple and Fast Table Reservations at Your
              Favorite Restaurant
            </h1>
            <p className="text-md lg:text-center md:text-center text-tertiary font-semibold">
              Welcome to TableTap, your ultimate solution for effortless dining
              reservations. Our intuitive platform allows you to easily book
              your favorite restaurant tables in just a few clicks. No more long
              waits or last-minute hassles—simply choose your preferred date,
              time, and party size. Receive instant confirmations and manage
              your reservations seamlessly. Experience the joy of dining without
              the stress of booking, only with TableTap.
            </p>
            <div className="flex items-center justify-center gap-5">
              <button onClick={() => navigate(`Ressinguppage`)} className="btn xl:btn-wide bg-secondary text-primary">
                Join as Restaurant
              </button>
              <button onClick={() => navigate(`usersinguppage`)} className="btn xl:btn-wide bg-secondary text-primary">
                Join as User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
