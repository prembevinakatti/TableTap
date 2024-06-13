import React from "react";

const InputBox = (props) => {
  return (
    <div>
      <input
        type={props.type ? props.type : "text"}
        className={`border-2 border-[#CECECE] ${"w-[23vw]"} h-11 px-2 rounded-md `}
      />
    </div>
  );
};

export default InputBox;
