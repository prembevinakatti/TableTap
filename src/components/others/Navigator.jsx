import React from "react";

function Navigator({ pathname }) {
  console.log(pathname);

  const steps = [
    {
      index: 1,
      location: "/Ressinguppage",
      name: "Authentication",
    },
    {
      index: 2,
      location: "/resprofilecreatepage",
      name: "Profile Create ",
    },
    {
      index: 3,
      location: "/resphotouploadpage",
      name: "Restaurant Photos",
    },
    {
      index: 4,
      location: "/Resroomsetup",
      name: "Room Setup",
    },
    {
      index: 5,
      location: "/resroomviewpage",
      name: "Room View",
    },
    {
      index: 6,
      location: "/restiming",
      name: "Restaurant Timing",
    },
  ];

  return (
    <div className="count flex items-center justify-center m-2 gap-1">
      <ul className="steps steps-vertical lg:steps-horizontal">
        {steps.map((step, idx) => (
          <li
            key={step.index}
            className={`step ${pathname === step.location ? "step-primary" : ""} ${idx < steps.findIndex(s => s.location === pathname) ? "step-primary" : ""}`}
          >
            {step.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navigator;
