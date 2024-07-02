import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import profileService from "../../appwrite/profileservices";
import { Query } from "appwrite";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { FaMapMarkerAlt } from "react-icons/fa";

const Usertravlingbookedpage = React.memo(() => {
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  const profileData = useSelector((state) => state.profile.profiledata);
  const navigate = useNavigate();

  const handleNavigate = useCallback((index) => {
    profileService.getres({ slug: paymentData[index].resid })
      .then((res) => {
        const url = `https://www.google.com/maps/search/?api=1&query=${res.latitude},${res.longitude}`;
        window.open(url, "_blank");
      })
      .catch((err) => setError("Failed to fetch restaurant details."));
  }, [paymentData]);



  const getCurrentDateFormatted = () => {
    const date = new Date();
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  };

  let formattedDate = getCurrentDateFormatted();

  useEffect(() => {
    if (profileData && profileData.$id) {
      const query = [
        Query.equal("userid", profileData.$id),
        Query.equal("isvehicalbooked", true),
      ];

      profileService.getpayments({ queries: query })
        .then((response) => {
          if (response && response.documents) {
            setPaymentData(response.documents);
          } else {
            setError("No documents found.");
          }
        })
        .catch((error) => setError(error.message))
        .finally(() => setLoading(false));
    }
  }, [profileData, formattedDate]);

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
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : paymentData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paymentData.map((payment, index) => {
            const paymentDetails = JSON.parse(payment.paymentdetails);
            return (
              <div
                key={payment.$id}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="mb-4">
                  <button
                    className="w-full text-primary flex items-center justify-end gap-2 font-semibold mb-2"
                    onClick={() => handleNavigate(index)}
                  >
                    Direction <FaMapMarkerAlt />
                  </button>
                  <button
                    className="w-full text-primary flex items-center justify-end gap-2 font-semibold mb-2"
                    onClick={() => handleRide(index)}
                  >
                    Check for Ride <FaMapMarkerAlt />
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
                    Date: {paymentDetails.date}
                  </p>
                  <p className="text-lg text-gray-700">
                    Reservation ID: {paymentDetails.reservationid}
                  </p>
                  <p className="text-lg text-gray-700">Chair Numbers:</p>
                  <div className="flex flex-wrap">
                    {paymentDetails.chairNumbers?.map((no) => (
                      <p
                        key={no}
                        className="text-sm text-gray-600 bg-gray-200 px-2 py-1 rounded mr-2 mb-2"
                      >
                        {no}
                      </p>
                    )) || <p className="text-sm text-gray-600">No chair numbers available.</p>}
                  </div>
                </div>
                <p className="text-2xl border p-1 bg-primary rounded-md w-fit font-semibold text-primary-600">
                  Bill: {payment.amount}
                </p>
                <div className="flex mt-5 cursor-pointer items-center justify-between">
                  <QRCode value={`/https://table-tap.vercel.app/${selectedPayment.slug}`} size={64} />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-600">No payment data available.</p>
      )}
    </div>
  );
});

export default Usertravlingbookedpage;
