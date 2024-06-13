import React from "react";
import ProfileNav from "../ProfileNav/ProfileNav";
import { IoIosArrowDown } from "react-icons/io";
import Button from "../Button/Button";

const RoomType = () => {
  return (
    <div>
      <div>
        <ProfileNav />
      </div>
      <div className="Roomtype flex flex-col gap-3 items-center justify-center">
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
        <div className="room w-[70vw] h-[63vh] rounded-xl bg-base-300"></div>
        <div className="Buttons mt-10  flex items-center   justify-center gap-20">
          <Button
            details="btn-wide border border-secondary bg-transparent text-secondary"
            info="Go Back"
          />
          <Button details="btn-wide " info="Save Changes" />
        </div>

        <div className="count flex items-center justify-center mt-2 gap-1">
          <div className="w-8 h-8 border cursor-pointer  border-gray-300 flex items-center justify-center rounded-lg">
            <p className="font-semibold">1</p>
          </div>
          <div className="w-8 h-8 border cursor-pointer  border-gray-300 flex items-center justify-center rounded-lg">
            <p className="font-semibold">2</p>
          </div>
          <div className="w-8 h-8 border cursor-pointer  border-gray-300 flex items-center justify-center rounded-lg">
            <p className="font-semibold">3</p>
          </div>
          <div className="w-8 h-8 border cursor-pointer bg-secondary text-primary border-gray-300 flex items-center justify-center rounded-lg">
            <p className="font-semibold">4</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomType;
