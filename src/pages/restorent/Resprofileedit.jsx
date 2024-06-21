import React, { useEffect, useState } from 'react';
import ProfileDetails from '../../components/profilecreat/Profilecreat';
import profileService from '../../appwrite/profileservices' // Assuming you have this service
import { useParams } from 'react-router-dom';

function Resprofileedit() {
    const oldprofiledata = useSelector((state) => state.profile.profiledata);
    const [profileData, setProfileData] = useState(null);
    const { slug } = useParams();

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const profileData = await profileService.getUser(oldprofiledata.$id);
                if (profileData) {
                    setProfileData(profileData);
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        getCurrentUser();
    }, []);

    return (
        <ProfileDetails 
            edit={profileData} 
            flag={true}
        />
    );
}

export default Resprofileedit;
