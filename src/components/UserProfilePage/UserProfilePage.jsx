import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import FooterBtns from "../../components/FooterBtns/FooterBtns";
import InputBox from "../../components/InputBox/InputBox";
import { MdEdit } from "react-icons/md";
import DetailsBox from "../DetailsBox/DetailsBox";

const UserProfilePage = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="userProfile w-full h-full p-3">
        <div className="w-full h-[75vh] border rounded-lg flex flex-col items-center gap-10 shadow">
          <div className="userProfileImg w-[15vw] rounded-full mt-5 overflow-hidden">
            <img
              src="https://imgs.search.brave.com/jLTwrBSRPcoyhBJs1uPbMl500isS1N2O0JlI3BLUQoY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvY29vbC1wcm9m/aWxlLXBpY3R1cmUt/ODdoNDZnY29iamw1/ZTR4dS5qcGc"
              alt=""
            />
          </div>
          <div className="profileContent w-full flex flex-col items-center gap-5 h-[40vh]">
            <div className="flex items-center gap-5">
              <div>
                <p className="font-semibold text-tertiary">User Email</p>
                <DetailsBox />
              </div>
              <p className="mt-5 cursor-pointer text-primary text-3xl hover:text-secondary transition-all">
                <MdEdit />
              </p>
            </div>
            <div className="flex items-center gap-5">
              <div>
                <p className="font-semibold text-tertiary">Full Name</p>
                <DetailsBox />
              </div>
              <p className="mt-5 cursor-pointer text-primary text-3xl hover:text-secondary transition-all">
                <MdEdit />
              </p>
            </div>
            <div className="flex items-center gap-5">
              <div>
                <p className="font-semibold text-tertiary">Phone Number</p>
                <DetailsBox />
              </div>
              <p className="mt-5 cursor-pointer text-primary text-3xl hover:text-secondary transition-all">
                <MdEdit />
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <FooterBtns />
      </div>
    </div>
  );
};

export default UserProfilePage;
