import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import profileService from "../../appwrite/profileservices";
import { Query } from "appwrite";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import Button from "../../components/Button/Button";
import { FaMapMarkerAlt } from "react-icons/fa";

function Userreservation() {
  const [paymentData, setPaymentData] = useState([]);
  const [showToday, setShowToday] = useState(true);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const profileData = useSelector((state) => state.profile.profiledata);
  const navigate = useNavigate();

  function getCurrentDateFormatted() {
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    let formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
  }

  function handelnavigate(index) {
    console.log("hi");
    console.log(paymentData[index]);
    profileService.getres({ slug: paymentData[index].resid }).then((res) => {
      console.log(res);
      const url = `https://www.google.com/maps/search/?api=1&query=${res.latitude},${res.longitude}`;
      window.open(url, "_blank");
    });
  }

  let formattedDate = getCurrentDateFormatted();

  useEffect(() => {
    if (profileData && profileData.$id) {
      let query;
      if (showToday) {
        query = [
          Query.equal("userid", profileData.$id),
          Query.equal("dateonbook", formattedDate),
        ];
      } else {
        query = [Query.equal("userid", profileData.$id)];
      }
      profileService
        .getpayments({ queries: query })
        .then((response) => {
          if (response && response.documents) {
            setPaymentData(response.documents);
          } else {
            console.log("No documents found in response");
          }
        })
        .catch((error) => console.log(error.message));
    }
  }, [profileData, showToday, formattedDate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 bg-gray-100 lg:h-[80vh] overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Your Reservations</h1>
        <div className="text-lg font-semibold text-gray-800">{currentTime}</div>
      </div>
      <div className="flex justify-center mb-6">
        <Button
          details="btn-wide mx-2"
          info="Today"
          onClick={() => setShowToday(true)}
          disabled={showToday}
        />
        <Button
          details="btn-wide mx-2"
          info="All Reservations"
          onClick={() => setShowToday(false)}
          disabled={!showToday}
        />
      </div>
      {paymentData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paymentData.map((payment, index) => (
            <div
              key={payment.$id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="mb-4">
                <button
                  className="w-full text-primary flex items-center justify-end gap-2 font-semibold"
                  onClick={() => handelnavigate(index)}
                >
                  Direction <FaMapMarkerAlt />
                </button>
                <p className="text-lg text-gray-700">
                  Restaurant Name:{" "}
                  <span
                    onClick={() => navigate(`/resprofilepage/${payment.resid}`)}
                    className="text-blue-500 cursor-pointer"
                  >
                    {payment.resid}
                  </span>
                </p>
                <p className="text-lg text-gray-700">
                  Payment ID: {payment.slug}
                </p>
                <p className="text-lg text-gray-700">
                  Date: {JSON.parse(payment.paymentdetails).date}
                </p>
                <p className="text-lg text-gray-700">
                  Slot: {JSON.parse(payment.paymentdetails).slot}
                </p>
                <p className="text-lg text-gray-700">
                  Number of Chairs:{" "}
                  {JSON.parse(payment.paymentdetails).numberofchair}
                </p>
                <p className="text-lg text-gray-700">
                  Reservation ID:{" "}
                  {JSON.parse(payment.paymentdetails).reservationid}
                </p>
                <p className="text-lg text-gray-700">Chair Numbers:</p>
                <div className="flex flex-wrap">
                  {JSON.parse(payment.paymentdetails).chairnumber.map((no) => (
                    <p
                      key={no}
                      className="text-sm text-gray-600 bg-gray-200 px-2 py-1 rounded mr-2 mb-2"
                    >
                      {no}
                    </p>
                  ))}
                </div>
                <p className="text-lg text-gray-700">
                  Payment Status:{" "}
                  <span className="text-green-500">Successful</span>
                </p>
              </div>
              <p className="text-2xl border p-1 bg-primary rounded-md w-fit font-semibold text-primary-600">
                Bill :{payment.amount}
              </p>
              <div className="flex mt-5  cursor-pointer items-center justify-between">
                <div>
                  <p
                    className="text-primary font-semibold"
                    onClick={() =>
                      document
                        .getElementById(`modal_${payment.$id}`)
                        .showModal()
                    }
                  >
                    Get QR
                  </p>
                  <dialog id={`modal_${payment.$id}`} className="modal">
                    <div className="modal-box">
                      <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                        </button>
                      </form>
                      <div
                        style={{
                          height: "auto",
                          margin: "0 auto",
                          maxWidth: 800,
                          width: "100%",
                        }}
                      >
                        <QRCode
                          size={500}
                          style={{
                            height: "10vw",
                            maxWidth: "100%",
                            width: "100%",
                          }}
                          value={`/paymentdetails/${payment.slug}`}
                          viewBox={`0 0 256 256`}
                        />
                        <p className="w-full text-center text-2xl text-primary mt-10">
                          Scan QR Code For Details
                        </p>
                      </div>
                    </div>
                  </dialog>
                </div>
                <div>
                  <p
                    className="cursor-pointer text-primary font-semibold"
                    onClick={() => navigate(`/UserReviewPage/${payment.resid}`)}
                  >
                    Add Feedback
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No payment data available.</p>
      )}
    </div>
  );
}

export default Userreservation;
