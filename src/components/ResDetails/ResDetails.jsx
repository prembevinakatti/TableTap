import React from "react";
import ProfileNav from "../ProfileNav/ProfileNav";
import InputBox from "../InputBox/InputBox";
import SmallInput from "../SmallInput/SmallInput";
import Button from "../Button/Button";

const ResDetails = () => {
  return (
    <div>
      <div>
        <ProfileNav />
      </div>
      <form>
        <div className="ResDetails w-full flex flex-col items-center justify-center">
          <div className="flex items-center gap-2">
            <p className="text-tertiary font-semibold text-lg">
              Number Of Rooms For Reservation
            </p>
            <SmallInput />
          </div>

          {/* Group 1 */}
          <div>
            <div className="flex items-center mt-5 gap-5">
              <label className="text-tertiary font-semibold text-lg">
                Rooms Includes AC
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <p className="text-tertiary font-semibold text-lg">Yes</p>
                  <input
                    type="radio"
                    name="radio-group-1"
                    className="radio radio-warning"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-tertiary font-semibold text-lg">No</p>
                  <input
                    type="radio"
                    name="radio-group-1"
                    className="radio radio-warning"
                  />
                </div>
              </div>
            </div>
            <div className="border mt-2 p-3 px-10 rounded-lg flex gap-20 items-center">
              <div className="flex items-center gap-3">
                <p className="text-tertiary font-semibold">Number Of Tables</p>
                <SmallInput />
              </div>
              <div className="flex items-center gap-3">
                <p className="text-tertiary font-semibold">
                  Number Of Chairs Per Table
                </p>
                <SmallInput />
              </div>
            </div>
          </div>

          {/* Group 2 */}
          <div>
            <div className="flex items-center mt-5 gap-5">
              <label className="text-tertiary font-semibold text-lg">
                Room Includes Normal Room
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <p className="text-tertiary font-semibold text-lg">Yes</p>
                  <input
                    type="radio"
                    name="radio-group-2"
                    className="radio radio-warning"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-tertiary font-semibold text-lg">No</p>
                  <input
                    type="radio"
                    name="radio-group-2"
                    className="radio radio-warning"
                  />
                </div>
              </div>
            </div>
            <div className="border mt-2 p-3 px-10 rounded-lg flex gap-20 items-center">
              <div className="flex items-center gap-3">
                <p className="text-tertiary font-semibold">Number Of Tables</p>
                <SmallInput />
              </div>
              <div className="flex items-center gap-3">
                <p className="text-tertiary font-semibold">
                  Number Of Chairs Per Table
                </p>
                <SmallInput />
              </div>
            </div>
          </div>

          {/* Group 3 */}
          <div>
            <div className="flex items-center mt-5 gap-5">
              <label className="text-tertiary font-semibold text-lg">
                Room Includes Party Room{" "}
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <p className="text-tertiary font-semibold text-lg">Yes</p>
                  <input
                    type="radio"
                    name="radio-group-3"
                    className="radio radio-warning"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-tertiary font-semibold text-lg">No</p>
                  <input
                    type="radio"
                    name="radio-group-3"
                    className="radio radio-warning"
                  />
                </div>
              </div>
            </div>
            <div className="border mt-2 p-3 px-10 rounded-lg flex gap-20 items-center">
              <div className="flex items-center gap-3">
                <p className="text-tertiary font-semibold">Number Of Tables</p>
                <SmallInput />
              </div>
              <div className="flex items-center gap-3">
                <p className="text-tertiary font-semibold">
                  Number Of Chairs Per Table
                </p>
                <SmallInput />
              </div>
            </div>
          </div>

          {/* Group 4 */}
          <div>
            <div className="flex items-center mt-5 gap-5">
              <label className="text-tertiary font-semibold text-lg">
                Room Include Custom Room{" "}
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <p className="text-tertiary font-semibold text-lg">Yes</p>
                  <input
                    type="radio"
                    name="radio-group-4"
                    className="radio radio-warning"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-tertiary font-semibold text-lg">No</p>
                  <input
                    type="radio"
                    name="radio-group-4"
                    className="radio radio-warning"
                  />
                </div>
              </div>
            </div>
            <div className="border mt-2 p-3 px-10 rounded-lg flex gap-20 items-center">
              <div className="flex items-center gap-3">
                <p className="text-tertiary font-semibold">Number Of Tables</p>
                <SmallInput />
              </div>
              <div className="flex items-center gap-3">
                <p className="text-tertiary font-semibold">
                  Number Of Chairs Per Table
                </p>
                <SmallInput />
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className="Buttons mt-10  flex items-center   justify-center gap-20">
        <Button
          details="btn-wide border border-secondary bg-transparent text-secondary"
          info="Go Back"
        />
        <Button details="btn-wide " info="Save Changes" />
      </div>

      <div className="count flex items-center justify-center mt-20 gap-1">
        <div className="w-8 h-8 border cursor-pointer  border-gray-300 flex items-center justify-center rounded-lg">
          <p className="font-semibold">1</p>
        </div>
        <div className="w-8 h-8 border cursor-pointer  border-gray-300 flex items-center justify-center rounded-lg">
          <p className="font-semibold">2</p>
        </div>
        <div className="w-8 h-8 border cursor-pointer bg-secondary text-primary border-gray-300 flex items-center justify-center rounded-lg">
          <p className="font-semibold">3</p>
        </div>
        <div className="w-8 h-8 border cursor-pointer border-gray-300 flex items-center justify-center rounded-lg">
          <p className="font-semibold">4</p>
        </div>
      </div>
    </div>
  );
};

export default ResDetails;
