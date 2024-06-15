import React, { forwardRef } from "react";

const InputBox = forwardRef((props, ref) => {
  return (
    <div>
      <input
        type={props.type ? props.type : "text"}
        ref={ref}
        className={`border-2 border-[#CECECE] ${"w-[23vw]"} h-11 px-2 rounded-md `}
        {...props}
      />
    </div>
  );
});

export default InputBox;
