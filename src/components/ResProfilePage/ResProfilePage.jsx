import React from "react";
import Navbar from "../Navbar/Navbar";
import Button from "../Button/Button";
import { IoIosArrowDown } from "react-icons/io";
import FooterBtns from "../FooterBtns/FooterBtns";

const ResProfilePage = () => {
  return (
    <div>
   
      <div className="profilePage flex flex-col items-center justify-center gap-5">
        <div className="profile w-[80vw] flex items-center justify-around  gap-10 h-[20vw] rounded-lg border mt-5 shadow-md">
          <div className="profileImg">
            <img
              className="w-56 bg-red-500 h-56 rounded-full"
              src="https://images.unsplash.com/photo-1616921111011-888888888888?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
              alt=""
            />
          </div>
          <div className="ResInfo">
            <p className="text-2xl font-semibold m-2 text-secondary">
              Restaurant Name
            </p>
            <p className="text-2xl font-semibold m-2 text-secondary">
              Restaurant Location
            </p>
            <p className="text-2xl font-semibold m-2 text-secondary">
              Restaurant Email
            </p>
            <p className="text-2xl font-semibold m-2 text-secondary">
              Restaurant Contact
            </p>
          </div>
        </div>
        <div className="flex w-[80vw] items-center justify-between ">
          <Button details="btn-wide" info="Edit Profile" />
          <Button details="btn-wide" info="Edit Time" />
        </div>
      </div>

      <h1 className="w-full text-center text-4xl mt-10 text-tertiary">
        Table View
      </h1>

      <div className="w-full flex items-center justify-center">
        <div className="tableView w-[80vw] flex flex-col items-start justify-center p-3 m-3 gap-5 h-[40vw] rounded-lg border mt-5 shadow-md">
          <div>
            <details className="dropdown">
              <summary className="m-1 btn btn-wide bg-secondary text-primary">
                Select Room Type <IoIosArrowDown />
              </summary>
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-200 rounded-box w-52">
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
              </ul>
            </details>
          </div>
          <div className="w-full h-full rounded-lg bg-[#c5c5c5]"></div>
        </div>
      </div>

      <Button details="btn-wide absolute right-36" info="Edit Table" />

      <h1 className="w-full text-center text-4xl mt-20 text-tertiary">
        Analytics And Ratings
      </h1>

      <div className="Analytics w-full flex mt-5 items-center justify-center">
        <div className="w-[80vw] flex  items-start justify-center p-3 m-3 gap-5 h-[30vw] rounded-lg border mt-5 shadow-md">
          <div className="analytics w-3/4 rounded-lg shadow-sm h-full flex items-center justify-center border">
            <p className="text-4xl font-semibold text-tertiary">Analytics</p>
          </div>
          <div className="analytics w-1/4 rounded-lg shadow-sm h-full flex flex-col gap-5 items-center justify-center border">
            <p className="text-3xl font-semibold text-tertiary">Average Ratings</p>
            <div className="rating rating-lg">
              <input
                type="radio"
                name="rating-8"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-8"
                className="mask mask-star-2 bg-orange-400"
                checked
              />
              <input
                type="radio"
                name="rating-8"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-8"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-8"
                className="mask mask-star-2 bg-orange-400"
              />
            </div>
          </div>
        </div>
      </div>

      <FooterBtns />
    </div>
  );
};

export default ResProfilePage;
