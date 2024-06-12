import React, { useState, useRef } from 'react';

const OTPBox = ({ length = 4, onChange }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (/^\d$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (onChange) {
        onChange(newOtp.join(''));
      }

      // Move to the next input
      if (value && index < length - 1) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div className="">
      <div className="flex space-x-2">
        {otp.map((value, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            className="w-12 h-12 border border-gray-300 rounded-lg text-center text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            value={value}
            maxLength="1"
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>
      <p className='w-full text-center text-tertiary font-semibold cursor-pointer mt-2'>Resend OTP</p>
    </div>
  );
};

export default OTPBox;
