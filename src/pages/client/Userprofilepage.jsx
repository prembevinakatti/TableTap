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
    return <div>Loading...</div>; 
  }

  if (!profileData) {
    return <div>No profile data found.</div>; 
  }



  return (
    <div>
      <div className="userProfile w-full h-full p-3">
        <div className="w-full xl:h-[75vh] h-[80vh] border rounded-lg flex flex-col items-center justify-center gap-10 shadow">
          <div className="userProfileImg xl:w-[15vw] w-36 rounded-full mt-5 overflow-hidden">
          <img
                className="w-56 h-56 rounded-full"
                src={
                  profileService.getFilePreview({
                    fileId: profileData.imageid || "",
                  }) ||
                  "https://static.vecteezy.com/resources/previews/019/776/467/non_2x/user-icon-fake-photo-sign-profile-button-simple-style-social-media-poster-background-symbol-user-brand-logo-design-element-user-t-shirt-printing-for-sticker-free-vector.jpg"
                }
                alt="profilephoto"
              />
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
