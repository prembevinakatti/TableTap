import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";
import profileService from "../../appwrite/profileservices";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import StripeCheckout from "react-stripe-checkout";
import { useSelector } from "react-redux";
import { ID } from "appwrite";
import toast from "react-hot-toast";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(
  "pk_test_51PT4pOAM7tB5pG0HD581QBg3nRbKadN9taCSabrmIuQNCX08wF6GOrUFUlVMGx5PVsxoF99xAoE13PfXjkIFCiew004JzB7cCt"
);

function UserBookingPage() {
  const { slug } = useParams();
  const [resdata, setResdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedType, setSelectedType] = useState("Room Includes Normal Room");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomData, setRoomData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reservedData, setReservedData] = useState([]);
  const [slots, setSlots] = useState([]);
  const [selectedChairs, setSelectedChairs] = useState([]);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [newReservation, setNewReservation] = useState({});
  const [selectedSlot, setSelectedSlot] = useState(null);

  const stripe = useStripe();
  const elements = useElements();
  const userdata = useSelector((state) => state.profile.profiledata);
  const selectData = [
    "Rooms Includes AC",
    "Room Includes Normal Room",
    "Room Includes Party Room",
    "Room Include Custom Room",
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const profileData = await profileService.getUser(slug);
        if (profileData) {
          setResdata(profileData);
          setRoomData(JSON.parse(profileData.roomdetaisl || "[]"));
          setSlots(JSON.parse(profileData.slots || "[]"));
          setReservedData(JSON.parse(profileData.reservation || "[ ]"));
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data. Please try again later.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [slug]);

  useEffect(() => {
    setPaymentAmount(calculatePayment(selectedChairs));
    setNewReservation({
      date: selectedDate.toLocaleDateString(),
      slot: selectedSlot
        ? `${selectedSlot.starttime} to ${selectedSlot.endtime}`
        : "",
      chairnumber: selectedChairs,
      reservationid: ID.unique(),
    });
  }, [selectedChairs, selectedDate, selectedSlot]);

  const handleSelectChange = (e) => {
    setSelectedType(e.target.value);
    setSelectedRoom(null);
    setSelectedChairs([]);
  };

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setSelectedChairs([]);
  };

  const handleChairClick = (chairCode) => {
    if (selectedChairs.includes(chairCode)) {
      setSelectedChairs((prevChairs) =>
        prevChairs.filter((chair) => chair !== chairCode)
      );
    } else {
      setSelectedChairs((prevChairs) => [...prevChairs, chairCode]);
    }
  };

  const handleSlotClick = (slot) => {
    const currentDateTime = new Date();
    const selectedSlotTime = new Date(selectedDate);
    const [hours, minutes] = slot.starttime.split(":").map(Number);
    selectedSlotTime.setHours(hours, minutes);

    if (selectedSlotTime < currentDateTime) {
      toast.error("Cannot select a slot before the current date and time.");
      return;
    }

    setSelectedSlot(slot);
    setSelectedChairs([]);
  };

  const isSlotReserved = (slot) => {
    return reservedData.some(
      (reservation) =>
        reservation.date === selectedDate.toLocaleDateString() &&
        reservation.slot === `${slot.starttime} to ${slot.endtime}` &&
        reservation.chairnumber.some((chair) => selectedChairs.includes(chair))
    );
  };

  const calculatePayment = (chairs) => {
    let totalPayment = 0;
    chairs.forEach((chairCode) => {
      const chairPrice = findChairPrice(chairCode);
      totalPayment += chairPrice;
    });
    return totalPayment;
  };

  const findChairPrice = (chairCode) => {
    const chairPrice = 10;
    return chairPrice;
  };
  function getCurrentDateFormatted() {
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    let formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
  }

  const handleToken = async (token) => {
    console.log("Stripe Token:", token);
    console.log(reservedData);

    const reservedata = [...reservedData, newReservation];
    console.log(newReservation);
    console.log(reservedata);
    profileService
      .updatereservations({
        slug: slug,
        reservation: JSON.stringify(reservedata),
      })
      .then((data) => {
        if (data) {
          profileService.createpayment({
            amount: JSON.stringify(paymentAmount),
            paymentdetails: JSON.stringify(newReservation),
            resid: resdata.$id,
            slug: token.id,
            userid: userdata.$id,
            date: getCurrentDateFormatted(),
            dateonbook: newReservation.date,
            type:0
          });
        }
      });
    toast.success("Payment Successful!");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      console.log("Received Stripe PaymentMethod:", paymentMethod);
      handlePaymentConfirmation(paymentMethod.id);
    }
  };

  const handlePaymentConfirmation = async (paymentMethodId) => {
    const paymentIntent = await stripe.confirmCardPayment(
      "sk_test_51PT4pOAM7tB5pG0Hfe0bSHOLAVKlGwchTm9NawLiIXXKSU7cx0NCVMyNYyxll57JZkWALMOy1M7VfsAzHn1msAPs001yUnbLMC",
      {
        payment_method: paymentMethodId,
      }
    );

    if (paymentIntent.error) {
      console.error("Payment confirmation error:", paymentIntent.error);
    } else if (paymentIntent.paymentIntent.status === "succeeded") {
      console.log("Payment successful:", paymentIntent.paymentIntent);
    }
  };

  const handleDateChange = (date) => {
    const currentDate = new Date();
    const maxDate = new Date();
    maxDate.setDate(currentDate.getDate() + 7);

    if (date < currentDate) {
      toast.error("Cannot select a date before the current date.");
      return;
    }

    if (date > maxDate) {
      toast.error("Cannot book more than 7 days in advance.");
      return;
    }

    setSelectedDate(date);
    setSelectedSlot(null);
    setSelectedChairs([]);
  };

  return (
    <div className="flex h-[70vh] overflow-auto pt-72 flex-col items-center justify-center p-4">
      <div>
        <select
          className="m-1 p-2 border border-gray-300 rounded bg-secondary text-primary"
          onChange={handleSelectChange}
          value={selectedType}
        >
          {selectData.map((data, index) => (
            <option key={index} value={data} className="text-black">
              {data}
            </option>
          ))}
        </select>
      </div>
      <div className="lg:flex lg:flex-row flex flex-col">
        <div className="room lg:w-[70vw] w-full my-10 h-[63vh] rounded-xl bg-gray-100 p-4 overflow-y-auto mt-4">
          {loading ? (
            <div className="text-black">Loading...</div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : roomData.length === 0 ? (
            <div className="text-black">
              No rooms available for reservations
            </div>
          ) : (
            <div>
              {roomData.groups.map((subgroup, index) => {
                if (subgroup.name !== selectedType) return null;
                const numRooms = parseInt(subgroup.numRooms) || 0;
                const numTables = parseInt(subgroup.numTables) || 0;
                const numChairsPerTable =
                  parseInt(subgroup.numChairsPerTable) || 0;

                return (
                  <div
                    key={index}
                    className="room-item bg-white p-10 m-2 rounded-xl shadow-md"
                  >
                    <h2 className="text-xl font-bold mb-4">
                      Room Details: {subgroup.name}
                    </h2>
                    <div className="flex flex-wrap gap-4">
                      {[...Array(numRooms)].map((_, roomIndex) => (
                        <button
                          key={roomIndex}
                          className={`p-2 border border-gray-300 rounded ${
                            selectedRoom === roomIndex + 1
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-black"
                          }`}
                          onClick={() => handleRoomClick(roomIndex + 1)}
                        >
                          {subgroup.name.split(" ")[2]} Room {roomIndex + 1}
                        </button>
                      ))}
                    </div>
                    {selectedRoom !== null && (
                      <>
                        <div className="mt-4">
                          <h3 className="text-lg font-semibold">
                            Select Date:
                          </h3>
                          <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            className="m-1 p-2 border border-gray-300 rounded bg-secondary text-primary"
                          />
                        </div>
                        <div className="mt-4">
                          <h3 className="text-lg font-semibold">
                            Select Slot:
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {slots.map((slot, slotIndex) => (
                              <button
                                key={slotIndex}
                                className={`slot-button p-2 border border-gray-300 rounded ${
                                  selectedSlot === slot
                                    ? "bg-blue-500 text-white"
                                    : "bg-green-500 text-white"
                                }`}
                                onClick={() => handleSlotClick(slot)}
                              >
                                {slot.starttime} - {slot.endtime}
                              </button>
                            ))}
                          </div>
                        </div>
                        {selectedSlot && (
                          <div className="mt-4">
                            <h3 className="text-lg font-semibold">
                              Select Chairs:
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {[...Array(numTables)].map((_, tableIndex) => (
                                <div
                                  key={tableIndex}
                                  className={`table relative p-4 rounded-lg shadow-sm w-52 h-40 ${
                                    selectedChairs.some((chair) =>
                                      chair.includes(
                                        `${
                                          subgroup.name.split(" ")[2][0]
                                        }${selectedRoom}${tableIndex + 1}`
                                      )
                                    )
                                      ? "bg-blue-500"
                                      : "bg-gray-200"
                                  }`}
                                >
                                  <div className="table-top w-full h-full bg-gray-300 rounded-lg flex items-center justify-center">
                                    Table {tableIndex + 1}
                                  </div>
                                  <div className="chairs absolute top-6 left-8 flex flex-wrap gap-10">
                                    {[...Array(numChairsPerTable)].map(
                                      (_, chairIndex) => {
                                        const chairCode = `${
                                          subgroup.name.split(" ")[2][0]
                                        }${selectedRoom}${tableIndex + 1}${
                                          chairIndex + 1
                                        }`;
                                        const isReserved = reservedData.some(
                                          (reservation) =>
                                            reservation.date ===
                                              selectedDate.toLocaleDateString() &&
                                            reservation.slot ===
                                              `${selectedSlot.starttime} to ${selectedSlot.endtime}` &&
                                            reservation.chairnumber.includes(
                                              chairCode
                                            )
                                        );
                                        return (
                                          <div
                                            key={chairIndex}
                                            className={`chair w-fit h-fit p-2 border border-black rounded-lg ${
                                              isReserved
                                                ? "bg-green-500 cursor-not-allowed"
                                                : selectedChairs.includes(
                                                    chairCode
                                                  )
                                                ? "bg-red-500 text-white"
                                                : "bg-gray-200"
                                            }`}
                                            onClick={() =>
                                              !isReserved &&
                                              handleChairClick(chairCode)
                                            }
                                          >
                                            {chairCode}
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="table-section ml-4 lg:w-1/3 w-full h-[65vh] rounded-md overflow-auto border p-2">
          <div className="">
            <table className="table  w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Chair Code</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Slot</th>
                </tr>
              </thead>
              <tbody>
                {selectedChairs.map((chair, index) => (
                  <tr key={index} className="bg-secondary text-primary">
                    <th>{index + 1}</th>
                    <td>{chair}</td>
                    <td>Selected</td>
                    <td>{selectedDate.toLocaleDateString()}</td>
                    <td>
                      {selectedSlot
                        ? `${selectedSlot.starttime} to ${selectedSlot.endtime}`
                        : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="my-10 flex flex-col items-center">
        <div >
          <div>
            <h3 className="text-lg font-semibold">
              Total Payment: ${calculatePayment(selectedChairs)}
            </h3>
          </div>
        </div>
        <div className="mb-10">
          <Elements stripe={stripePromise}>
            <StripeCheckout
              stripeKey="pk_test_51PT4pOAM7tB5pG0HD581QBg3nRbKadN9taCSabrmIuQNCX08wF6GOrUFUlVMGx5PVsxoF99xAoE13PfXjkIFCiew004JzB7cCt"
              token={handleToken}
              amount={paymentAmount * 100}
              currency="USD"
              billingAddress={true}
              zipCode={false}
            >
              <button
                type="button"
                className="p-2 mt-4 bg-blue-500 text-white rounded-md"
                disabled={!stripe}
              >
                Pay ${paymentAmount}
              </button>
            </StripeCheckout>
          </Elements>
        </div>
      </div>
    </div>
  );
}

export default UserBookingPage;
