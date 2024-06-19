import React from "react";
import Button from "../Button/Button";
import { useSelector } from "react-redux";

const FooterBtns = (props) => {
  const verified = useSelector((state) => state.auth.verified);
  const profiledata = useSelector((state) => state.profile.profiledata);

  if (!profiledata || profiledata.state === "incomplete" || !verified) {
    return null;
  }

  return (
    <div className="absolute w-full bottom-0 border-t flex items-center justify-between p-3 border-primary">
      <Button details="xl:btn-wide" info="Reservations" />
      <Button details="xl:btn-wide" info="Payments" />
      <Button details="xl:btn-wide" info="Profile" />
    </div>
  );
};

export default FooterBtns;
