import React from "react";
import Navbar from "../Navbar/Navbar";
import Button from "../Button/Button";
import FooterBtns from "../FooterBtns/FooterBtns";

const ResPayment = () => {
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
            info="All Payments"
          />
        </div>
        <div className="paymentSection w-full xl:h-[75vh] overflow-auto p-3">
          <div className="paymentBox md:flex md:flex-wrap xl:flex xl:flex-wrap w-full h-full p-3">
            <div className="paymentCard xl:w-[calc(50%-0.5rem)] xl:h-[25vh] xl:flex  items-center justify-between px-5 py-3 rounded-lg border shadow-lg m-1">
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
                  Payment Status : Successfull.
                </p>
              </div>
              <p className="xl:text-3xl text-xl mt-5 btn bg-primary text-secondary">Rs 69.69</p>
            </div>
            <div className="paymentCard xl:w-[calc(50%-0.5rem)] xl:h-[25vh] xl:flex  items-center justify-between px-5 py-3 rounded-lg border shadow-lg m-1">
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
                  Payment Status : Successfull.
                </p>
              </div>
              <p className="xl:text-3xl text-xl mt-5 btn bg-primary text-secondary">Rs 69.69</p>
            </div>
            <div className="paymentCard xl:w-[calc(50%-0.5rem)] xl:h-[25vh] xl:flex  items-center justify-between px-5 py-3 rounded-lg border shadow-lg m-1">
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
                  Payment Status : Successfull.
                </p>
              </div>
              <p className="xl:text-3xl text-xl mt-5 btn bg-primary text-secondary">Rs 69.69</p>
            </div>
            <div className="paymentCard xl:w-[calc(50%-0.5rem)] xl:h-[25vh] xl:flex  items-center justify-between px-5 py-3 rounded-lg border shadow-lg m-1">
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
                  Payment Status : Successfull.
                </p>
              </div>
              <p className="xl:text-3xl text-xl mt-5 btn bg-primary text-secondary">Rs 69.69</p>
            </div>
          </div>
        </div>
      </div>

      <FooterBtns />
    </div>
  );
};

export default ResPayment;
