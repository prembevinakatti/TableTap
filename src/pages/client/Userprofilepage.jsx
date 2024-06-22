import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import profileService from '../../appwrite/profileservices';
import DetailsBox from '../../components/DetailsBox/DetailsBox'; 
function Userprofilepage() {
  const { slug } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const data = await profileService.getuseruser(slug);
        if (data) {
          setProfileData(data);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while fetching data
  }

  if (!profileData) {
    return <div>No profile data found.</div>; // Show a message if no profile data is found
  }

  const profileImageUrl = profileService.getFilePreview(profileData.imageid) || "https://imgs.search.brave.com/jLTwrBSRPcoyhBJs1uPbMl500isS1N2O0JlI3BLUQoY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQtbHdpbmRvd3Mtc2FtcGxlLWltYWdlLmpwZw";

  return (
    <div>
      <div className="userProfile w-full h-full p-3">
        <div className="w-full xl:h-[75vh] h-[80vh] border rounded-lg flex flex-col items-center justify-center gap-10 shadow">
          <div className="userProfileImg xl:w-[15vw] w-36 rounded-full mt-5 overflow-hidden">
            <img src={profileImageUrl} alt="Profile" />
          </div>
          <div className="profileContent w-full flex flex-col items-center gap-5 lg:h-[40vh] xl:h-[40vh]">
            <div className="flex items-center gap-5">
              <div>
                <p className="font-semibold w-full text-tertiary">{profileData.email}</p>
                <DetailsBox />
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div>
                <p className="font-semibold text-tertiary">{profileData.name}</p>
                <DetailsBox />
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div>
                <p className="font-semibold text-tertiary">{profileData.phone}</p>
                <DetailsBox />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Userprofilepage;
