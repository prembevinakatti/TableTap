import React from 'react';

const StarRating = ({ numOfStars, color }) => {
  return (
    <div className="rating rating-lg">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className={`mask mask-star-2`}
          style={{
            display: 'inline-block',
            width: '25px',
            height: '24px',
            backgroundColor: index < numOfStars ? color : '#D1D5DB' // Tailwind's gray-400 color
          }}
        />
      ))}
    </div>
  );
};

export default StarRating;
