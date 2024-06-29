import { Query } from 'appwrite';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; 



import StarRating from '../../components/starratting';
import profileService from '../../appwrite/profileservices';
import { useNavigate } from 'react-router-dom';

function Restorentfeedbackpage() {
    const [reviews, setReviews] = useState([]);
    const profileData = useSelector((state) => state.profile.profiledata);
    const navigate=useNavigate()
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const query = [Query.equal("resid", profileData.$id)];
                const getreviews = await profileService.getreviews({ query });
                if (getreviews) {
                    setReviews(getreviews.documents);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, []); 

    return (
        <div className="flex flex-wrap">
             <div className='w-full text-center text-4xl text-gray-600'>Reviews on you</div>
            {reviews.map((singlereview) => (
                <div
                    key={singlereview.$id}
                    className="review-card p-4 border rounded-lg shadow-md m-2"
                >
                    <div className="flex items-center justify-between mb-2">
                        <p
                            className="cursor-pointer text-xl font-semibold text-primary"
                            onClick={() => navigate(`/userprofilepage/${singlereview.userid}`)}
                        >
                            {singlereview.userid || "Anonymous"}
                        </p>
                        <div className="flex items-center">
                            <StarRating numOfStars={singlereview.rating || 4} />
                        </div>
                    </div>
                    <div className="mb-2">
                        <p className="text-secondary">
                            <span className="font-semibold">Recommended Food: </span>
                            {singlereview.recommendedfood || "No recommended food"}
                        </p>
                    </div>
                    <div>
                        <p className="text-secondary">
                            <span className="font-semibold">Comment: </span>
                            {singlereview.comment || "No comment"}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Restorentfeedbackpage;
