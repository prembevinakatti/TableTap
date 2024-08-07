import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import profileService from "../../appwrite/profileservices";
import { ID } from "appwrite";
import toast from "react-hot-toast";

function UserReviewPage() {
  const navigate = useNavigate();
  const profileData = useSelector((state) => state.profile.profiledata);
  const [rating, setRating] = useState(3); // Default to 3 stars
  const [review, setReview] = useState("");
  const [recommendedFood, setRecommendedFood] = useState(""); 
  const [food, setFood] = useState([]);
  const [resid, setResid] = useState(null);
  const [resrating, setResrating] = useState({rating: 0, no: 0});
  const [hygienePoints, setHygienePoints] = useState(5); // Default to 5 hygiene points
  const [reshygiene, setResHygiene] = useState({ points: 0, no: 0 });
  const { slug } = useParams();

  const handleRatingChange = (event) => {
    setRating(parseFloat(event.target.value));
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleRecommendedFoodChange = (event) => {
    setRecommendedFood(event.target.value);
  };

  const handleHygienePointsChange = (event) => {
    setHygienePoints(parseFloat(event.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const reviewData = await profileService.creatreview({
        rating: rating,
        recommendedfood: recommendedFood,
        comment: review,
        resid: resid,
        userid: profileData.$id,
        slug: ID.unique(),
        hygeinepoints: hygienePoints,
      });

      if (reviewData) {
        const updatedRating = {
          rating: (resrating.rating * resrating.no + rating) / (resrating.no + 1),
          no: resrating.no + 1
        };

        const updatedHygiene = {
          points: (reshygiene.points * reshygiene.no + hygienePoints) / (reshygiene.no + 1),
          no: reshygiene.no + 1
        };

        setResrating(updatedRating);
        setResHygiene(updatedHygiene);
        console.log(updatedHygiene)
        console.log(updatedRating)

        await profileService.updateratings({ ratings: updatedRating.rating, hygienePoints: JSON.parse(updatedHygiene.points), slug: resid });
        toast.success('Review submitted successfully');
        navigate(-1)
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      navigate(-1)
    }
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const data = await profileService.getUser(slug);
        if (data) {
          setFood(JSON.parse(data.foodmenue || "[]"));
          console.log(food)
          console.log(data)
          setResid(data.$id);
          setResrating(JSON.parse(data.ratings) || {rating: 0, no: 0});
          setResHygiene(JSON.parse(data.hygienePoints) || { points: 0, no: 0 });
        } 
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } 
    };

    getCurrentUser();
  }, [slug]);

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Leave a Review</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Rating</label>
          <div className="rating rating-lg rating-half">
            <input type="radio" name="rating-10" className="rating-hidden" />
            {[...Array(10)].map((_, i) => (
              <input
                key={i}
                type="radio"
                name="rating-10"
                className={`mask mask-star-2 ${i % 2 === 0 ? 'mask-half-1' : 'mask-half-2'} bg-green-500`}
                value={(i + 1) / 2}
                checked={rating === (i + 1) / 2}
                onChange={handleRatingChange}
              />
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Review</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows="4"
            value={review}
            onChange={handleReviewChange}
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">
            Recommended Food
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={recommendedFood}
            onChange={handleRecommendedFoodChange}
          >
            <option value="" disabled>
              Select food
            </option>
            {food.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Hygiene Points</label>
          <div className="rating rating-lg rating-half">
            <input type="radio" name="hygiene-10" className="rating-hidden" />
            {[...Array(10)].map((_, i) => (
              <input
                key={i}
                type="radio"
                name="hygiene-10"
                className={`mask mask-star-2 ${i % 2 === 0 ? 'mask-half-1' : 'mask-half-2'} bg-blue-500`}
                value={(i + 1) / 2}
                checked={hygienePoints === (i + 1) / 2}
                onChange={handleHygienePointsChange}
              />
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}

export default UserReviewPage;
