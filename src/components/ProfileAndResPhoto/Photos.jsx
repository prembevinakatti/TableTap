import React from "react";
import ProfileNav from "../ProfileNav/ProfileNav";
import { FaPlus } from "react-icons/fa6";
import Button from "../Button/Button";

const Photos = () => {
  return (
    <div>
      <div>
        <ProfileNav />
      </div>
      <div className="flex flex-col items-center gap-5 justify-center">
        <div className="profileImg">
          <div className="relative flex flex-col items-center">
            <img
              className="w-52 rounded-full overflow-hidden"
              src="https://imgs.search.brave.com/jLTwrBSRPcoyhBJs1uPbMl500isS1N2O0JlI3BLUQoY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvY29vbC1wcm9m/aWxlLXBpY3R1cmUt/ODdoNDZnY29iamw1/ZTR4dS5qcGc"
              alt=""
            />
            <button className="btn absolute bottom-3 right-2 rounded-full border-none cursor-pointer bg-secondary text-primary ">
              <FaPlus />
            </button>
          </div>
        </div>
        <div className="ResImg">
          <div className="w-[60vw] h-[40vh] flex items-center justify-center rounded-xl bg-[#c5c5c5]">
            <button className="btn btn-wide bg-secondary text-primary border-none">
              <div className="text-2xl">
                <FaPlus />
              </div>
              Add Restaurant Images
            </button>
          </div>
          <div>
            <p className="text-tertiary font-semibold mt-2 text-xl">
              Number Of Images Selected : 0
            </p>
          </div>
        </div>

        <div className="Buttons w-full mt-1  flex items-center  justify-evenly">
          <Button
            details="btn-wide border border-secondary bg-transparent text-secondary"
            info="Go Back"
          />
          <Button details="btn-wide " info="Save Changes" />
        </div>
        <div className="count flex items-center mt-5 gap-1">
          <div className="w-8 h-8 border cursor-pointer  border-gray-300 flex items-center justify-center rounded-lg">
            <p className="font-semibold">1</p>
          </div>
          <div className="w-8 h-8 border cursor-pointer bg-secondary text-primary border-gray-300 flex items-center justify-center rounded-lg">
            <p className="font-semibold">2</p>
          </div>
          <div className="w-8 h-8 border cursor-pointer border-gray-300 flex items-center justify-center rounded-lg">
            <p className="font-semibold">3</p>
          </div>
          <div className="w-8 h-8 border cursor-pointer border-gray-300 flex items-center justify-center rounded-lg">
            <p className="font-semibold">4</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Photos;
