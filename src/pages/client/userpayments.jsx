import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import profileService from "../../appwrite/profileservices";
import { Query } from "appwrite";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";

function Userpayments() {
  const [paymentdata, setPaymentdata] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [selectedPayment, setSelectedPayment] = useState(null);
  const profiledata = useSelector((state) => state.profile.profiledata);
  const navigate = useNavigate();

  useEffect(() => {
    if (profiledata && profiledata.$id) {
      const query = [Query.equal("userid", profiledata.$id)];
      console.log(query); // Debug the query
      profileService.getpayments({ queries: query })
        .then((response) => {
          if (response && response.documents) {
            setPaymentdata(response.documents);
            console.log(response.documents);
          } else {
            console.log("No documents found in response");
          }
        })
        .catch((error) => console.log(error.message));
    }
  }, [profiledata]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleShowQr = (payment) => {
    setSelectedPayment(payment);
    document.getElementById("my_modal_3").showModal();
  };

  const handleCloseQr = () => {
    setSelectedPayment(null);
    document.getElementById("my_modal_3").close();
  };

  return (
    <div className="p-6 h-[70vh] overflow-auto bg-gray-100 relative">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Your Payments
      </h1>
      <div className="absolute top-6 right-6 text-lg font-semibold text-gray-800">
        {currentTime}
      </div>
      {paymentdata.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {paymentdata.map((payment) => {
            // Parse paymentdetails safely
            let paymentDetails = {};
            try {
              paymentDetails = JSON.parse(payment.paymentdetails);
            } catch (error) {
              console.error("Error parsing payment details:", error);
              // Handle error parsing JSON, perhaps set paymentDetails to an empty object or handle differently
            }

            return (
              <div key={payment.$id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                  <p className="text-lg text-gray-700">
                    To:{" "}
                    <span
                      onClick={() => navigate(`/resprofilepage/${payment.resid}`)}
                      className="text-blue-500 cursor-pointer"
                    >
                      {payment.resid}
                    </span>
                  </p>
                  <p className="text-lg text-gray-700">
                    <span className="font-semibold">Payment ID:</span> {payment.slug}
                  </p>
                  {payment.isvehicalbooked ? (
                    <>
                      <p className="text-lg text-gray-700">
                        <span className="font-semibold">Reservation ID:</span> {paymentDetails.reservationid}
                      </p>
                      <p className="text-lg text-gray-700 font-semibold">Chair Numbers:</p>
                      <div className="flex flex-wrap">
                        {/* Check if paymentDetails is an array */}
                        {Array.isArray(paymentDetails) && paymentDetails.map((details, index) => (
                          <p key={`${details}-${index}`} className="text-sm text-gray-600 mr-2 mb-2">
                            {details}
                          </p>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-lg text-gray-700">
                        <span className="font-semibold">Seat booked day:</span> {paymentDetails.date}
                      </p>
                      <p className="text-lg text-gray-700">
                        <span className="font-semibold">Slot:</span> {paymentDetails.slot}
                      </p>
                      <p className="text-lg text-gray-700">
                        <span className="font-semibold">Number of Chairs:</span> {paymentDetails.numberofchair}
                      </p>
                      <p className="text-lg text-gray-700">
                        <span className="font-semibold">Reservation ID:</span> {paymentDetails.reservationid}
                      </p>
                      <p className="text-lg text-gray-700 font-semibold">Chair Numbers:</p>
                      <div className="flex flex-wrap">
                        {/* Check if chairnumber is an array */}
                        {paymentDetails.chairnumber && paymentDetails.chairnumber.map((no, index) => (
                          <p key={`${no}-${index}`} className="text-sm text-gray-600 bg-gray-200 px-2 py-1 rounded mr-2 mb-2">
                            {no}
                          </p>
                        ))}
                      </div>
                    </>
                  )}
                  <p className="text-lg text-gray-700">
                    <span className="font-semibold">Payment Status:</span> <span className="text-green-500">Successful</span>
                  </p>
                </div>
                <div className="w-full flex items-center justify-between">
                  <p className="text-2xl border bg-primary text-tertiary p-2 rounded-md font-semibold text-primary-600">
                    Bill : {payment.amount}
                  </p>
                  {!payment.isvehicalbooked && (
                    <button
                      className="btn lg:btn-wide bg-primary text-tertiary lg:text-2xl p-2 rounded-md"
                      onClick={() => handleShowQr(payment)}
                    >
                      Get QR
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-600">No payment data available.</p>
      )}
      {selectedPayment && (
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleCloseQr}>
                ✕
              </button>
            </form>
            <div style={{ height: "400px", margin: "0 auto", maxWidth: 800, width: "100%" }}>
              <p className="w-full text-center mb-10 text-2xl text-primary mt-10">
                Scan QR Code For Details
              </p>
              <QRCode
                size={500}
                style={{ height: "10vw", maxWidth: "100%", width: "100%" }}
                value={`/https://table-tap.vercel.app/paymentdetails/${selectedPayment.slug}`}
                viewBox={`0 0 256 256`}
              />
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default Userpayments;
