import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import profileService from "../../appwrite/profileservices";
import { Query } from "appwrite";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import Button from "../../components/Button/Button";


function Userreservation() {
  const [paymentData, setPaymentData] = useState([]);
  const [showToday, setShowToday] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
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

  let formattedDate = getCurrentDateFormatted();

  useEffect(() => {
    if (profileData && profileData.$id) {
      let query;
      if (showToday) {
        query = [Query.equal("userid", profileData.$id), Query.equal("date", formattedDate)];
      } else {
        query = [Query.equal("userid", profileData.$id)];
      }
      profileService
        .getpayments({ queries: query })
        .then((response) => {
          if (response && response.documents) {
            setPaymentData(response.documents);
            console.log(response.documents);
          } else {
            console.log("No documents found in response");
          }
        })
        .catch((error) => console.log(error.message));
    }
  }, [profileData, showToday]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
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
          {paymentData.map((payment) => (
            <div key={payment.$id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <p className="text-lg text-gray-700">
                  Restaurant Name:{" "}
                  <span
                    onClick={() => navigate(`/resprofilepage/${payment.resid}`)}
                    className="text-blue-500 cursor-pointer"
                  >
                    {payment.resid}
                  </span>
                </p>
                <p className="text-lg text-gray-700">Payment ID: {payment.slug}</p>
                <p className="text-lg text-gray-700">Date: {JSON.parse(payment.paymentdetails).date}</p>
                <p className="text-lg text-gray-700">Slot: {JSON.parse(payment.paymentdetails).slot}</p>
                <p className="text-lg text-gray-700">Number of Chairs: {JSON.parse(payment.paymentdetails).numberofchair}</p>
                <p className="text-lg text-gray-700">Reservation ID: {JSON.parse(payment.paymentdetails).reservationid}</p>
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
                <p className="text-lg text-gray-700">Payment Status: Successful</p>
              </div>
              <p className="text-2xl font-semibold text-primary-600">{payment.amount}</p>
              <button
                className="btn"
                onClick={() => document.getElementById(`modal_${payment.$id}`).showModal()}
              >
                Get QR
              </button>
              <dialog id={`modal_${payment.$id}`} className="modal">
                <div className="modal-box">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                  </form>
                  <div style={{ height: "auto", margin: "0 auto", maxWidth: 800, width: "100%" }}>
                    <QRCode
                      size={500}
                      style={{ height: "10vw", maxWidth: "100%", width: "100%" }}
                      value={`/paymentdetails/${payment.slug}`}
                      viewBox={`0 0 256 256`}
                    />
                    <p className="w-full text-center text-2xl text-primary mt-10">
                      Scan QR Code For Details
                    </p>
                  </div>
                </div>
              </dialog>
              <div className="mt-4">
                <Button
                  details="btn-wide"
                  info="Add Feedback"
                  onClick={() => navigate(`/UserReviewPage/${payment.resid}`)}
                />
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
