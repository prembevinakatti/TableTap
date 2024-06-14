import React from "react";
import Navbar from "../Navbar/Navbar";
import FooterBtns from "../FooterBtns/FooterBtns";
import Button from "../Button/Button";

const PostPage = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="PostPage overflow-auto  w-full h-full p-2">
        <div className="flex w-full h-[70vh] flex-wrap  items-center gap-10">
          <div className="slidingImgs w-full h-[40vh] rounded-lg border">
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
          </div>

          <p className="w-full text-center  text-2xl  font-semibold">
            Select Your Tables And Chairs
          </p>
          <div className="TableView w-full h-[60vh] rounded-lg border"></div>
          <div className="TableView flex items-center gap-3 justify-center p-2 w-full h-[50vh] rounded-lg border">
            <div className="ResDetails w-3/4 h-full flex flex-col  justify-center border p-2">
              <p className="w-full text-center underline text-4xl font-semibold text-tertiary">
                Details
              </p>
              <div className="flex items-center justify-between">
                <div className="details mt-10 m-5">
                  <p className="text-2xl text-tertiary font-semibold">
                    Seat Selected : 0
                  </p>
                  <p className="text-2xl text-tertiary font-semibold">
                    Price Of One Seat : Rs 100
                  </p>
                  <p className="text-2xl text-tertiary font-semibold">
                    Total Price : 0 * 100 = 0
                  </p>
                </div>
                <div className="details mt-10 m-5">
                  <p className="text-2xl text-tertiary font-semibold">
                    Seat Numbers :-{" "}
                  </p>
                  <p className="text-2xl text-tertiary font-semibold">
                    A1 (1,2,3,4)
                  </p>
                </div>
              </div>
            </div>
            <div className="ResMap flex items-center justify-center w-1/4 h-full border p-2">
              <p>Map</p>
            </div>
          </div>

          <div className="w-full text-center">
            <Button details="btn-wide" info="Book Now" />
          </div>
        </div>
      </div>

      <div>
        <FooterBtns />
      </div>
    </div>
  );
};

export default PostPage;
