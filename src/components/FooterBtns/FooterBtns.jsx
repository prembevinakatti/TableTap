import React from "react";
import Button from "../Button/Button";

const FooterBtns = (props) => {
  return (
    <div className=" absolute w-full bottom-0 border-t flex itemce justify-between p-3 border-primary">
      <Button details="btn-wide" info="Reservations" />
      <Button details="btn-wide" info="Payments" />
      <Button details="btn-wide" info="Profile" />
    </div>
  );
};

export default FooterBtns;
