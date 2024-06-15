import React from "react";

const LandingPage = () => {
  return (
    <div className="landing w-full h-[100vh] flex items-center justify-center ">
      <div className="w-[8vw] flex flex-col items-center justify-between h-full bg-black p-3 ">
        <h1 className="text-white ">LOGO</h1>
        <h1 className="text-white text-3xl mb-40 w-[20vw] -rotate-90  font-semibold">
          Effortless Dining Reservations
        </h1>
      </div>
      <div className="w-[95vw] h-full bg-white flex items-center justify-center ">
        <div className="rightContent w-full h-full flex items-center justify-center gap-5 p-8">
          <div className="videoContent relative w-1/3 h-[70vh] border shadow-lg">
            <div className="bg-primary -rotate-90 relative top-20 right-10 text-xl text-white font-semibold p-2 rounded-sm w-fit">
              RESERVE NOW
            </div>
            <div className="video absolute right-5 w-[45vh] h-[60vh] ">
              <video
                className="w-full h-full object-cover"
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
          <div className="detailsContent w-[55vw] p-10 flex flex-col items-center justify-center gap-10 h-[70vh] border shadow-lg">
            <h1 className="w-full text-3xl font-semibold text-center">
              TableTap
            </h1>

            <h1 className="text-5xl text-start leading-[1.4] font-bold w-[40vw]">
              Dine with Ease: Simple and Fast Table Reservations at Your
              Favorite Restaurant
            </h1>

            <p className="text-md text-tertiary font-semibold">
              Welcome to TableTap, your ultimate solution for effortless dining
              reservations. Our intuitive platform allows you to easily book
              your favorite restaurant tables in just a few clicks. No more long
              waits or last-minute hassles—simply choose your preferred date,
              time, and party size. Receive instant confirmations and manage
              your reservations seamlessly. Experience the joy of dining without
              the stress of booking, only with TableTap.
            </p>

            <div className="flex items-center gap-5">
              <button className="btn btn-wide bg-secondary text-primary">Join as Restaurant</button>
              <button className="btn btn-wide bg-secondary text-primary">Join as User</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
