import React from 'react';

const Button = (props) => {
  return (
    <div>
        <button 
          className={`btn ${props.details} bg-secondary text-xl text-primary`} 
          onClick={props.onClick}  // Add the onClick handler here
        >
          {props.info}
        </button>
    </div>
  );
}

export default Button;
