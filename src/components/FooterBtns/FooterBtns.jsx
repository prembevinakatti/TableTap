import React from "react";
import Button from "../Button/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FooterBtns = (props) => {
  const verified = useSelector((state) => state.auth.verified);
  const profiledata = useSelector((state) => state.profile.profiledata);
  const navigate = useNavigate();

  if (!profiledata) {
    return null;
  }

  if (profiledata.isres && profiledata.state === "completed") {
    return (
      <div className="fixed w-full bottom-0 border-t flex items-center justify-between p-3 bg-white border-primary">
        <Button details="xl:btn-wide" info="Reservations" />
        <Button details="xl:btn-wide" info="Payments"    onClick={() => navigate(`/Respayments`)} />
        <Button
          details="xl:btn-wide"
          info="Profile"
          onClick={() => navigate(`/resprofilepage/${profiledata.$id}`)}
        />
      </div>
    );
  }

  if (!profiledata.isres && profiledata.state === "completed") {
    return (
      <div className="fixed w-full bottom-0 border-t flex items-center justify-between p-3 bg-white border-primary">
        <Button
          details="xl:btn-wide"
          info="Home"
          onClick={() => navigate(`/userhomepage`)}
        />
        <Button details="xl:btn-wide" info="Payments"
        onClick={() => navigate(`/Userpayments`)}
        />
        <Button
          details="xl:btn-wide"
          info="Profile"
          onClick={() => navigate(`/userprofilepage/${profiledata.$id}`)}
        />
      </div>
    );
  }

  return null; 
};

export default FooterBtns;
