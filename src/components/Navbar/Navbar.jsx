import React, { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import Button from "../Button/Button";
import { useSelector } from "react-redux";

const Navbar = () => {
  const verified=useSelector((state)=>(state.auth.verified))
  if(verified){
    return (
      <div>
        <div className="navbar border-b border-primary px-3 p-2 flex items-center justify-between">
          <h1>Logo</h1>
          <div>
            <div className="drawer drawer-end">
              <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
                {/* Page content here */}
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
                <ul className="menu  p-4 w-80  flex flex-col items-center gap-3 min-h-full bg-base-200 ">
                  {/* Sidebar content here */}
  
                  <div>
                    <Button details="btn-wide" info="Profile" />
                  </div>
                  <div className="flex btn btn-wide bg-secondary text-primary hover:text-primary hover:bg-secondary">
                    Open
                    <input
                      type="checkbox"
                      className="toggle toggle-warning z-10"
                    />
                    Close
                  </div>
                  <div>
                    <Button details="btn-wide" info="Logout" />
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }else{
    null
  }
  
};

export default Navbar;
