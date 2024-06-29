import React, { useEffect, useState } from 'react';
import RoomType from '../../components/RoomType/RoomType';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import profileService from "../../appwrite/profileservices";
import Navigator from '../../components/others/Navigator';
import Button from '../../components/Button/Button';

function Resroomviewpage({edit}) {
  const navigate = useNavigate();
  const profileData = useSelector((state) => state.profile.profiledata);
  const [roomData, setRoomData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      setLoading(true);
      setError(null);
      console.log(profileData)
      try {
        const fetchedRoomData = await profileService.getUser(profileData.$id || "ffjif");
        
        if (fetchedRoomData) {
          const parsedRoomData = JSON.parse(fetchedRoomData.roomdetaisl || "[]");
          setRoomData(parsedRoomData.groups || []);
        } else {
          setRoomData([]);
        }
      } catch (error) {
        console.error("Error fetching room data:", error);
        setError("Error fetching room data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [profileData]);

  const {pathname} = useLocation()

  return (
    <>
    <Navigator pathname={pathname} />
      <RoomType roomData={roomData} loading={loading} error={error} />
      <div className="Buttons mt-10 flex items-center justify-center gap-20">
        <Button
          className="btn-wide border border-secondary bg-transparent text-secondary"
          onClick={() => navigate(-1)}
        
          info="Go Back"
        />
        <Button
          className="btn-wide border border-secondary bg-transparent text-secondary"
          onClick={() => edit?navigate(-1):navigate("/restiming")}
        
          info="Save Changes"
        />
      </div>
    </>
  );
}

export default Resroomviewpage;