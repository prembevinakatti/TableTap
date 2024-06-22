import React, { useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import profileService from '../../appwrite/profileservices'; // Adjust the import based on your file structure

function UserHomePage() {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [roomType, setRoomType] = useState('');
  const [documents, setDocuments] = useState([]);

  const handleFetchDocuments = async () => {
    try {
      const filters = [];

      if (location) filters.push(`location=${location}`);
      if (date) filters.push(`date=${date}`);
      if (time) filters.push(`time=${time}`);
      if (roomType) filters.push(`roomType=${roomType}`);

      const query = filters.join('&');
      const response = await profileService.getDocuments(query);

      if (response) {
        setDocuments(response.documents);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  useEffect(() => {
    handleFetchDocuments();
  }, [location, date, time, roomType]);

  return (
    <div>
      <div className="UserHome">
        <div className="HomenavBtns m-2 flex flex-wrap items-center xl:gap-10 gap-3">
          <div>
            <select
              className="select w-44 btn text-lg bg-primary text-secondary max-w-xs"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option disabled selected>
                Location
              </option>
              <option>Gadag</option>
              <option>Bangalore</option>
              <option>Goa</option>
              <option>Mumbai</option>
              <option>Chennai</option>
              <option>Mysore</option>
              <option>Laxmeshwar</option>
            </select>
          </div>
          <div className="btn w-44 bg-primary text-secondary">
            <input
              type="date"
              className="bg-transparent"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="btn w-44 bg-primary text-secondary">
            <input
              type="time"
              className="bg-transparent"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div>
            <select
              className="select w-44 btn text-lg bg-primary text-secondary max-w-xs"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
            >
              <option disabled selected>
                Type
              </option>
              <option>Normal Room</option>
              <option>AC Room</option>
              <option>Party Room</option>
            </select>
          </div>
        </div>

        <div className="homeContent w-full h-[70vh] overflow-auto">
          <div className="xl:flex md:flex md:flex-wrap lg:flex lg:flex-wrap xl:flex-wrap items-center justify-center w-full my-3 h-full gap-10 rounded-lg p-5">
            {documents.map((doc) => (
              <div key={doc.$id} className="HomeBox flex flex-col items-start xl:w-1/4 h-[55vh] rounded-lg p-4 border m-3 shadow-lg">
                <div className="cardImg w-full h-[25vh] rounded-lg overflow-hidden border">
                  <img
                    className="w-full h-full"
                    src={doc.imageURL || 'https://via.placeholder.com/150'}
                    alt={doc.name}
                  />
                </div>
                <div className="cardContent">
                  <p className="font-semibold text-xl mt-2">{doc.name}</p>
                  <p className="text-tertiary mt-5 text-sm leading-[1.2]">
                    {doc.address}
                  </p>
                  <p className="text-tertiary mt-10 font-semibold">{doc.timings}</p>
                </div>
                <div className="btn w-full text-center hover:border-secondary hover:text-secondary mt-10 bg-secondary text-primary">
                  <p>More Details</p>
                  <FaArrowRight />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHomePage;
