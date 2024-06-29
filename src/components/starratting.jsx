import React from 'react';

const StarRating = ({ numOfStars }) => {
  return (
    <div className="rating rating-lg">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className={`mask mask-star-2 ${index < numOfStars ? 'bg-orange-400' : 'bg-gray-400'}`}
          style={{ display: 'inline-block', width: '25px', height: '24px' }}
        />
      ))}
    </div>
  );
};

export default StarRating;
