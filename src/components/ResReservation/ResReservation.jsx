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
          <Button details="btn-wide" info="Today" />
          <Button
            details="btn-wide bg-transparent border-primary text-secondary"
            info="Custom Dates"
          />
        </div>
        <div className="paymentSection w-full h-[75vh] overflow-auto p-3">
          <div className="paymentBox  flex flex-wrap w-full h-full p-3">
            <div className="paymentCard w-[calc(50%-0.5rem)] h-[25vh] flex  items-center justify-between px-5 py-3 rounded-lg border shadow-lg m-1">
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
              <p className="text-3xl btn bg-primary text-secondary">
                Bill : 69.69
              </p>
            </div>
            <div className="paymentCard w-[calc(50%-0.5rem)] h-[25vh] flex  items-center justify-between px-5 py-3 rounded-lg border shadow-lg m-1">
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
              <p className="text-3xl btn bg-primary text-secondary">
                Bill : 69.69
              </p>
            </div>
            <div className="paymentCard w-[calc(50%-0.5rem)] h-[25vh] flex  items-center justify-between px-5 py-3 rounded-lg border shadow-lg m-1">
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
              <p className="text-3xl btn bg-primary text-secondary">
                Bill : 69.69
              </p>
            </div>
            <div className="paymentCard w-[calc(50%-0.5rem)] h-[25vh] flex  items-center justify-between px-5 py-3 rounded-lg border shadow-lg m-1">
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
              <p className="text-3xl btn bg-primary text-secondary">
                Bill : 69.69
              </p>
            </div>
            <div className="paymentCard w-[calc(50%-0.5rem)] h-[25vh] flex  items-center justify-between px-5 py-3 rounded-lg border shadow-lg m-1">
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
              <p className="text-3xl btn bg-primary text-secondary">
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
