import React from "react";
import { IoMdMenu } from "react-icons/io";
import Button from "../Button/Button";
import { useSelector } from "react-redux";
import Logout from "../others/logout";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";

const Navbar = () => {
  const verified = useSelector((state) => state.auth.verified);
  const profiledata = useSelector((state) => state.profile.profiledata);
  const navigate = useNavigate();
  console.log(profiledata);
  if (!verified) {
    return null;
  }

  return (
    <div>
      <div className="navbar border-b border-primary px-3 p-2 flex items-center justify-between">
        <div className="w-[5vw] overflow-hidden">
          <img className="w-full h-full object-cover" src={Logo} alt="" />
        </div>
        <div>
          {profiledata && profiledata.state === "completed" ? (
            <div className="drawer z-30 drawer-end">
              <input
                id="my-drawer-4"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content">
                <label
                  htmlFor="my-drawer-4"
                  className="drawer-button text-4xl btn bg-secondary text-primary"
                >
                  <IoMdMenu />
                </label>
              </div>
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer-4"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                {profiledata && profiledata.isres === true ? (
                  <ul className="menu p-4 w-80 flex flex-col items-center gap-3 min-h-full bg-base-200">
                    {/* Sidebar content here */}
                    <div>
                      <Button details="btn-wide" info="Profile" />
                    </div>
                    
                    <div>
                      <Button
                        details="btn-wide"
                        info="Bank Details"
                        onClick={() => navigate(`/resbankdetailspage`)}
                      />
                    </div>
                    <div>
                      <Button
                        details="btn-wide"
                        info="all feedbacks"
                        onClick={() => navigate(`/Restorentfeedbackpage`)}
                      />
                    </div>
                    
                    <div>
                      <Button
                        details="btn-wide"
                        info="Set up cab or bike"
                        onClick={() => navigate(`/restravelsetup`)}
                      />
                    </div>
                    <div>
                      <Button
                        details="btn-wide"
                        info="Travel Bookings"
                        onClick={() => navigate("/Resalltravlingbookingpage")}
                      />
                    </div>
                    <div>
                      <Logout />
                    </div>
                  </ul>
                ) : (
                  <ul className="menu p-4 w-80 flex flex-col items-center gap-3 min-h-full bg-base-200">
                    {/* Sidebar content here */}
                    <div>
                      <Button
                        details="btn-wide"
                        info="Profile"
                        onClick={() =>
                          navigate(`/userprofilepage/${profiledata.$id}`)
                        }
                      />
                    </div>
                    <div>
                      <Button
                        details="btn-wide"
                        info="Your Reservation"
                        onClick={() => navigate("/userreservation")}
                      />
                    </div>
                    <div>
                      <Button
                        details="btn-wide"
                        info="Your feedbacks"
                        onClick={() => navigate("/Userfeedbackpage")}
                      />
                    </div>
                    <Button
                      details="btn-wide"
                      info="Travel Booked Details"
                      onClick={() => navigate("/Usertravlingbookedpage")}
                    />
                    <div>
                      <Logout />
                    </div>
                  </ul>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
