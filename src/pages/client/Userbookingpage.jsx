import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import profileService from '../../appwrite/profileservices';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckoutForm'; 

const stripePromise = loadStripe("pk_test_51PT4pOAM7tB5pG0HD581QBg3nRbKadN9taCSabrmIuQNCX08wF6GOrUFUlVMGx5PVsxoF99xAoE13PfXjkIFCiew004JzB7cCt");

function UserBookingPage() {
  const { slug } = useParams();
  const [resdata, setResdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedType, setSelectedType] = useState('Room Includes Normal Room');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomData, setRoomData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reservedData, setReservedData] = useState([]);
  const [slots, setSlots] = useState([]);
  const [selectedChairs, setSelectedChairs] = useState([]);
  const [paymentAmount, setPaymentAmount] = useState(0);
// Define paymentAmount state

  const selectData = [
    'Rooms Includes AC',
    'Room Includes Normal Room',
    'Room Includes Party Room',
    'Room Include Custom Room',
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const profileData = await profileService.getUser(slug);
        if (profileData) {
          setResdata(profileData);
          setRoomData(JSON.parse(profileData.roomdetaisl || '[]'));
          setSlots(JSON.parse(profileData.slots || '[]'));
          setReservedData(profileData.reservations || []);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data. Please try again later.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [slug]);

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
      setSelectedChairs((prevChairs) => prevChairs.filter((chair) => chair !== chairCode));
    } else {
      setSelectedChairs((prevChairs) => [...prevChairs, chairCode]);
    }
  };

  const handleSlotClick = (slot) => {
    if (!isSlotReserved(slot) && selectedChairs.length > 0) {
      const formattedDate = `${selectedDate.getMonth() + 1}/${selectedDate.getDate()}/${selectedDate.getFullYear()}`;
      const reservation = {
        date: formattedDate,
        slot: `${slot.starttime} to ${slot.endtime}`,
        chairnumber: selectedChairs,
        numberofchair: selectedChairs.length,
        type: selectedType,
        reservationid: Date.now().toString(),
      };
      console.log('New Reservation:', reservation);
      setPaymentAmount(calculatePayment(selectedChairs));
      // Implement further logic for reservation handling
    } else {
      alert('Please select at least one chair and ensure the slot is available.');
    }
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
      // Example: Calculate payment based on chairCode and roomData pricing
      const chairPrice = findChairPrice(chairCode); // Implement this function based on your pricing logic
      totalPayment += chairPrice;
    });
    return totalPayment;
  };

  const findChairPrice = (chairCode) => {
    // Example function to find chair price from roomData
    // Replace with actual logic based on your roomData structure
    const chairPrice = 10; // Example price
    return chairPrice;
  };

  async function handlePayment(paymentData) {
    try {
        const response = await fetch('http://localhost:5173/api/handlePayment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
        });

        if (!response.ok) {
            throw new Error('Failed to handle payment');
        }

        const responseData = await response.json();
        // Process responseData as needed
        console.log('Payment handled successfully:', responseData);
    } catch (error) {
        console.error('Error processing payment:', error.message);
        // Handle errors gracefully, e.g., show user-friendly message
    }
}

// Example usage
handlePayment({ /* payment data */ });


  return (
    <div className="flex flex-col items-center justify-center p-4">
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
      <div className="room w-[70vw] h-[63vh] rounded-xl bg-gray-100 p-4 overflow-y-auto mt-4">
        {loading ? (
          <div className="text-black">Loading...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : roomData.length === 0 ? (
          <div className="text-black">No rooms available for reservations</div>
        ) : (
          roomData.groups.map((subgroup, index) => {
            if (subgroup.name !== selectedType) return null;
            const numRooms = parseInt(subgroup.numRooms) || 0;
            const numTables = parseInt(subgroup.numTables) || 0;
            const numChairsPerTable = parseInt(subgroup.numChairsPerTable) || 0;

            return (
              <div key={index} className="room-item bg-white p-10 m-2 rounded-xl shadow-md">
                <h2 className="text-xl font-bold mb-4">Room Details: {subgroup.name}</h2>
                <div className="flex flex-wrap gap-4">
                  {[...Array(numRooms)].map((_, roomIndex) => (
                    <button
                      key={roomIndex}
                      className={`p-2 border border-gray-300 rounded ${selectedRoom === roomIndex + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                      onClick={() => handleRoomClick(roomIndex + 1)}
                    >
                      {subgroup.name.split(" ")[2]} Room {roomIndex + 1}
                    </button>
                  ))}
                </div>
                {selectedRoom !== null && (
                  <>
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold">Select Date:</h3>
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        className="m-1 p-2 border border-gray-300 rounded bg-secondary text-primary"
                      />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold">Select Chairs:</h3>
                      <div className="flex flex-wrap gap-2">
                        {[...Array(numTables)].map((_, tableIndex) => (
                          <div
                            key={tableIndex}
                            className={`table relative p-4 rounded-lg shadow-sm w-52 h-40 ${selectedChairs.some(chair => chair.includes(`${subgroup.name.split(" ")[2][0]}${selectedRoom}${tableIndex + 1}`)) ? 'bg-blue-500' : 'bg-gray-200'}`}
                          >
                            <div className="table-top w-full h-full bg-gray-300 rounded-lg flex items-center justify-center">
                              Table {tableIndex + 1}
                            </div>
                            <div className="chairs absolute top-8 left-1/2 transform -translate-x-1/2 flex justify-between items-center gap-10">
                              {[...Array(numChairsPerTable)].map((_, chairIndex) => (
                                <div
                                  key={chairIndex}
                                  className={`chair w-fit h-fit p-2 border border-black rounded-lg ${selectedChairs.includes(`${subgroup.name.split(" ")[2][0]}${selectedRoom}${tableIndex + 1}${chairIndex + 1}`) ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
                                  onClick={() => handleChairClick(`${subgroup.name.split(" ")[2][0]}${selectedRoom}${tableIndex + 1}${chairIndex + 1}`)}
                                >
                                  {`${subgroup.name.split(" ")[2][0]}${selectedRoom}${tableIndex + 1}${chairIndex + 1}`}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold">Select Slot:</h3>
                      <div className="flex flex-wrap gap-2">
                        {slots.map((slot, slotIndex) => (
                          <button
                            key={slotIndex}
                            className={`p-2 border border-gray-300 rounded ${isSlotReserved(slot) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                            onClick={() => handleSlotClick(slot)}
                            disabled={isSlotReserved(slot)}
                          >
                            {`${slot.starttime} to ${slot.endtime}`}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold">Payment Details:</h3>
                      <p>Total Payment Amount: ${paymentAmount}</p>
                      <Elements stripe={stripePromise}>
                      <CheckoutForm handlePayment={handlePayment} disabled={selectedChairs.length === 0 || paymentAmount === 0} paymentAmount={paymentAmount} />
                     
                      </Elements>
                    </div>
                  </>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default UserBookingPage;
