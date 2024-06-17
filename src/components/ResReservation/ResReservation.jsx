import React from "react";
import Navbar from "../Navbar/Navbar";
import Button from "../Button/Button";
import FooterBtns from "../FooterBtns/FooterBtns";

const ResReservation = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="ResPayment">
        <div className="flex mt-5 px-3 gap-10">
          <Button details="xl:btn-wide" info="Today" />
          <Button
            details="xl:btn-wide bg-transparent border-primary text-secondary"
            info="Custom Dates"
          />
        </div>
        <div className="paymentSection w-full h-[75vh] overflow-auto p-3">
          <div className="paymentBox md:h-full md:flex md:flex-wrap xl:flex xl:flex-wrap w-full xl:h-full p-3">
            <div className="paymentCard relative xl:w-[calc(50%-0.5rem)] xl:h-[25vh] xl:flex  items-center justify-between px-5 py-3 rounded-lg border shadow-lg m-1">
              <div>
                <p className="text-xl text-tertiary font-semibold">
                  Onkar S Bevinakatti
                </p>
                <p className="text-xl text-tertiary font-semibold">
                  3rd Cross, Hudco Colony , Gadag-582101
                </p>
                <p className="text-xl text-tertiary font-semibold">
                  8660465213
                </p>
                <p className="text-xl text-tertiary font-semibold">
                  Party Room
                </p>
                <p className="text-xl text-tertiary font-semibold">
                  Table Booked : 1
                </p>
                <p className="text-xl text-tertiary font-semibold">
                  Chairs Booked : 4
                </p>
              </div>
              <p className="xl:text-3xl text-xl mt-5  btn  bg-primary text-secondary">
                Bill : 69.69
              </p>
            </div>
            <div className="paymentCard relative xl:w-[calc(50%-0.5rem)] xl:h-[25vh] xl:flex  items-center justify-between px-5 py-3 rounded-lg border shadow-lg m-1">
              <div>
                <p className="text-xl text-tertiary font-semibold">
                  Onkar S Bevinakatti
                </p>
                <p className="text-xl text-tertiary font-semibold">
                  3rd Cross, Hudco Colony , Gadag-582101
                </p>
                <p className="text-xl text-tertiary font-semibold">
                  8660465213
                </p>
                <p className="text-xl text-tertiary font-semibold">
                  Party Room
                </p>
                <p className="text-xl text-tertiary font-semibold">
                  Table Booked : 1
                </p>
                <p className="text-xl text-tertiary font-semibold">
                  Chairs Booked : 4
                </p>
              </div>
              <p className="xl:text-3xl text-xl mt-5  btn  bg-primary text-secondary">
                Bill : 69.69
              </p>
            </div>
            <div className="paymentCard relative xl:w-[calc(50%-0.5rem)] xl:h-[25vh] xl:flex  items-center justify-between px-5 py-3 rounded-lg border shadow-lg m-1">
              <div>
                <p className="text-xl text-tertiary font-semibold">
                  Onkar S Bevinakatti
                </p>
                <p className="text-xl text-tertiary font-semibold">
                  3rd Cross, Hudco Colony , Gadag-582101
                </p>
                <p className="text-xl text-tertiary font-semibold">
                  8660465213
                </p>
                <p className="text-xl text-tertiary font-semibold">
                  Party Room
                </p>
                <p className="text-xl text-tertiary font-semibold">
                  Table Booked : 1
                </p>
                <p className="text-xl text-tertiary font-semibold">
                  Chairs Booked : 4
                </p>
              </div>
              <p className="xl:text-3xl text-xl mt-5  btn  bg-primary text-secondary">
                Bill : 69.69
              </p>
            </div>
            <div className="paymentCard relative xl:w-[calc(50%-0.5rem)] xl:h-[25vh] xl:flex  items-center justify-between px-5 py-3 rounded-lg border shadow-lg m-1">
              <div>
                <p className="text-xl text-tertiary font-semibold">
                  Onkar S Bevinakatti
                </p>
                <p className="text-xl text-tertiary font-semibold">
                  3rd Cross, Hudco Colony , Gadag-582101
                </p>
                <p className="text-xl text-tertiary font-semibold">
                  8660465213
                </p>
                <p className="text-xl text-tertiary font-semibold">
                  Party Room
                </p>
                <p className="text-xl text-tertiary font-semibold">
                  Table Booked : 1
                </p>
                <p className="text-xl text-tertiary font-semibold">
                  Chairs Booked : 4
                </p>
              </div>
              <p className="xl:text-3xl text-xl mt-5  btn  bg-primary text-secondary">
                Bill : 69.69
              </p>
            </div>
          </div>
        </div>
      </div>

      <FooterBtns />
    </div>
  );
};

export default ResReservation;
