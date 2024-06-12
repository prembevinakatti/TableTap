import React from "react";
import { MdArrowBackIos } from "react-icons/md";

const ProfileNav = () => {
  return (
    <div>
      <div className="ProfileNav m-1 p-1">
        <div className="flex items-center gap-1">
          <div className="text-tertiary">
            <MdArrowBackIos />
          </div>
          <p className="text-lg font-semibold text-tertiary">My Profile</p>
        </div>
        <div className="divider divider-warning"></div>
      </div>
    </div>
  );
};

export default ProfileNav;
