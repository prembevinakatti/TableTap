import React from "react";
import Navbar from "../Navbar/Navbar";
import FooterBtns from "../FooterBtns/FooterBtns";
import { IoIosArrowDown } from "react-icons/io";
import InputBox from "../InputBox/InputBox";
import Button from "../Button/Button";
import { FaArrowRight } from "react-icons/fa6";

const UserHomePage = () => {
  return (
    <div>
      <div className="UserHome">
        <div className="HomenavBtns m-2 flex flex-wrap items-center xl:gap-10 gap-3">
          <div>
            <select className="select w-44 btn text-lg bg-primary text-secondary  max-w-xs">
              <option disabled selected>
                Location
              </option>
              <option>Gadag</option>
              <option>Benglore</option>
              <option>Goa</option>
              <option>Mumbai</option>
              <option>Channai</option>
              <option>Maisur</option>
              <option>Laxmeshwar</option>
            </select>
          </div>
          <div className="btn w-44 bg-primary text-secondary">
            <input type="date" className="bg-transparent" />
          </div>
          <div className="btn w-44 bg-primary text-secondary">
            <input type="time" className="bg-transparent" />
          </div>
          <div>
            <select className="select w-44 btn text-lg bg-primary text-secondary  max-w-xs">
              <option disabled selected>
                Type
              </option>
              <option>Normal Room</option>
              <option>AC Room</option>
              <option>Party Room</option>
            </select>
          </div>
        </div>

        <div className="homeContent w-full h-[70vh] overflow-auto   ">
          <div className="xl:flex md:flex md:flex-wrap lg:flex lg:flex-wrap xl:flex-wrap items-center justify-center w-full my-3 h-full gap-10 rounded-lg p-5">
            <div className="HomeBox flex flex-col items-start  xl:w-1/4 h-[55vh] rounded-lg p-4 border m-3 shadow-lg">
              <div className="cardImg w-full h-[25vh] rounded-lg overflow-hidden border">
                <img
                  className="w-full h-full"
                  src="https://imgs.search.brave.com/43-9GycyCFFxlMTV1L14F9-sv28r6aAiPNnVaK5TclI/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9y/ZXN0YXVyYW50LWlu/dGVyaW9yXzExMjct/MzM5NC5qcGc_c2l6/ZT02MjYmZXh0PWpw/Zw"
                  alt=""
                />
              </div>
              <div className="cardContent">
                <p className="font-semibold text-xl mt-2">
                  Villegio Restaurant and Bar
                </p>
                <p className="text-tertiary  mt-5 text-sm leading-[1.2]">
                  1760 Sawgrass Mills <br />
                  CircleSunrise, FL 33213-3912
                </p>
                <p className="text-tertiary mt-10 font-semibold">
                  10:00 AM To 10:00 PM
                </p>
              </div>
              <div className="btn w-full text-center hover:border-secondary hover:text-secondary mt-10 bg-secondary text-primary">
                <p>More Details</p>

                <FaArrowRight />
              </div>
            </div>
            <div className="HomeBox flex flex-col items-start  xl:w-1/4 h-[55vh] rounded-lg p-4 border m-3 shadow-lg">
              <div className="cardImg w-full h-[25vh] rounded-lg overflow-hidden border">
                <img
                  className="w-full h-full"
                  src="https://imgs.search.brave.com/43-9GycyCFFxlMTV1L14F9-sv28r6aAiPNnVaK5TclI/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9y/ZXN0YXVyYW50LWlu/dGVyaW9yXzExMjct/MzM5NC5qcGc_c2l6/ZT02MjYmZXh0PWpw/Zw"
                  alt=""
                />
              </div>
              <div className="cardContent">
                <p className="font-semibold text-xl mt-2">
                  Villegio Restaurant and Bar
                </p>
                <p className="text-tertiary  mt-5 text-sm leading-[1.2]">
                  1760 Sawgrass Mills <br />
                  CircleSunrise, FL 33213-3912
                </p>
                <p className="text-tertiary mt-10 font-semibold">
                  10:00 AM To 10:00 PM
                </p>
              </div>
              <div className="btn w-full text-center hover:border-secondary hover:text-secondary mt-10 bg-secondary text-primary">
                <p>More Details</p>

                <FaArrowRight />
              </div>
            </div>
            <div className="HomeBox flex flex-col items-start  xl:w-1/4 h-[55vh] rounded-lg p-4 border m-3 shadow-lg">
              <div className="cardImg w-full h-[25vh] rounded-lg overflow-hidden border">
                <img
                  className="w-full h-full"
                  src="https://imgs.search.brave.com/43-9GycyCFFxlMTV1L14F9-sv28r6aAiPNnVaK5TclI/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9y/ZXN0YXVyYW50LWlu/dGVyaW9yXzExMjct/MzM5NC5qcGc_c2l6/ZT02MjYmZXh0PWpw/Zw"
                  alt=""
                />
              </div>
              <div className="cardContent">
                <p className="font-semibold text-xl mt-2">
                  Villegio Restaurant and Bar
                </p>
                <p className="text-tertiary  mt-5 text-sm leading-[1.2]">
                  1760 Sawgrass Mills <br />
                  CircleSunrise, FL 33213-3912
                </p>
                <p className="text-tertiary mt-10 font-semibold">
                  10:00 AM To 10:00 PM
                </p>
              </div>
              <div className="btn w-full text-center hover:border-secondary hover:text-secondary mt-10 bg-secondary text-primary">
                <p>More Details</p>

                <FaArrowRight />
              </div>
            </div>
            <div className="HomeBox flex flex-col items-start  xl:w-1/4 h-[55vh] rounded-lg p-4 border m-3 shadow-lg">
              <div className="cardImg w-full h-[25vh] rounded-lg overflow-hidden border">
                <img
                  className="w-full h-full"
                  src="https://imgs.search.brave.com/43-9GycyCFFxlMTV1L14F9-sv28r6aAiPNnVaK5TclI/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9y/ZXN0YXVyYW50LWlu/dGVyaW9yXzExMjct/MzM5NC5qcGc_c2l6/ZT02MjYmZXh0PWpw/Zw"
                  alt=""
                />
              </div>
              <div className="cardContent">
                <p className="font-semibold text-xl mt-2">
                  Villegio Restaurant and Bar
                </p>
                <p className="text-tertiary  mt-5 text-sm leading-[1.2]">
                  1760 Sawgrass Mills <br />
                  CircleSunrise, FL 33213-3912
                </p>
                <p className="text-tertiary mt-10 font-semibold">
                  10:00 AM To 10:00 PM
                </p>
              </div>
              <div className="btn w-full text-center hover:border-secondary hover:text-secondary mt-10 bg-secondary text-primary">
                <p>More Details</p>

                <FaArrowRight />
              </div>
            </div>
            <div className="HomeBox flex flex-col items-start  xl:w-1/4 h-[55vh] rounded-lg p-4 border m-3 shadow-lg">
              <div className="cardImg w-full h-[25vh] rounded-lg overflow-hidden border">
                <img
                  className="w-full h-full"
                  src="https://imgs.search.brave.com/43-9GycyCFFxlMTV1L14F9-sv28r6aAiPNnVaK5TclI/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9y/ZXN0YXVyYW50LWlu/dGVyaW9yXzExMjct/MzM5NC5qcGc_c2l6/ZT02MjYmZXh0PWpw/Zw"
                  alt=""
                />
              </div>
              <div className="cardContent">
                <p className="font-semibold text-xl mt-2">
                  Villegio Restaurant and Bar
                </p>
                <p className="text-tertiary  mt-5 text-sm leading-[1.2]">
                  1760 Sawgrass Mills <br />
                  CircleSunrise, FL 33213-3912
                </p>
                <p className="text-tertiary mt-10 font-semibold">
                  10:00 AM To 10:00 PM
                </p>
              </div>
              <div className="btn w-full text-center hover:border-secondary hover:text-secondary mt-10 bg-secondary text-primary">
                <p>More Details</p>

                <FaArrowRight />
              </div>
            </div>
            <div className="HomeBox flex flex-col items-start  xl:w-1/4 h-[55vh] rounded-lg p-4 border m-3 shadow-lg">
              <div className="cardImg w-full h-[25vh] rounded-lg overflow-hidden border">
                <img
                  className="w-full h-full"
                  src="https://imgs.search.brave.com/43-9GycyCFFxlMTV1L14F9-sv28r6aAiPNnVaK5TclI/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9y/ZXN0YXVyYW50LWlu/dGVyaW9yXzExMjct/MzM5NC5qcGc_c2l6/ZT02MjYmZXh0PWpw/Zw"
                  alt=""
                />
              </div>
              <div className="cardContent">
                <p className="font-semibold text-xl mt-2">
                  Villegio Restaurant and Bar
                </p>
                <p className="text-tertiary  mt-5 text-sm leading-[1.2]">
                  1760 Sawgrass Mills <br />
                  CircleSunrise, FL 33213-3912
                </p>
                <p className="text-tertiary mt-10 font-semibold">
                  10:00 AM To 10:00 PM
                </p>
              </div>
              <div className="btn w-full text-center hover:border-secondary hover:text-secondary mt-10 bg-secondary text-primary">
                <p>More Details</p>

                <FaArrowRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;
