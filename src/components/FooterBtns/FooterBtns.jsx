import React from "react";
import Button from "../Button/Button";
import { useSelector } from "react-redux";

const FooterBtns = (props) => {
  const verified=useSelector((state)=>(state.auth.verified))
  if (verified){
    return (
      <div className="absolute w-full bottom-0 border-t flex itemce justify-between p-3 border-primary">
        <Button details="xl:btn-wide" info="Reservations" />
        <Button details="xl:btn-wide" info="Payments" />
        <Button details="xl:btn-wide" info="Profile" />
      </div>
    );
  }
  else{
    null
  }

};

export default FooterBtns;
