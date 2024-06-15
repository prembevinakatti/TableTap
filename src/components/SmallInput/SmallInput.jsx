import React, { forwardRef } from 'react';

const SmallInput = forwardRef((props, ref) => {
  return (
    <div>
      <input
        ref={ref}
        className={`border-2 border-[#CECECE] w-[4vw] h-10 px-2 rounded-md`}
        {...props}
      />
    </div>
  );
});

export default SmallInput;
