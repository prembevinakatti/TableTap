import React, { useState } from "react";
import ProfileNav from "../ProfileNav/ProfileNav";
import Button from "../Button/Button";

const RoomType = () => {
  const [type, setType] = useState("Room Includes Normal Room");

  const selectData = [
    "Rooms Includes AC",
    "Room Includes Normal Room",
    "Room Includes Party Room",
    "Room Includes Custom Room"
  ];

  const handleSelectChange = (e) => {
    setType(e.target.value);
    console.log(e.target.value);
  };

  const data = {
    numberOfRooms: "13",
    groups: [
      {
        name: "Rooms Includes AC",
        includes: "Yes",
        numRooms: "4",
        numTables: "4",
        numChairsPerTable: "8",
      },
      {
        name: "Room Includes Normal Room",
        includes: "Yes",
        numRooms: "4",
        numTables: "4",
        numChairsPerTable: "4",
      },
      {
        name: "Room Includes Party Room",
        includes: "Yes",
        numRooms: "1",
        numTables: "8",
        numChairsPerTable: "4",
      },
      {
        name: "Room Includes Custom Room",
        includes: "Yes",
        numRooms: "4",
        numTables: "8",
        numChairsPerTable: "4",
      },
    ],
  };

  return (
    <div>
      <ProfileNav />
      <div className="flex flex-col gap-6 items-center justify-center p-4">
        <div>
          <select
            className="m-1 btn btn-wide bg-secondary text-primary"
            onChange={handleSelectChange}
            value={type}
          >
            {selectData.map((data, index) => (
              <option key={index} value={data} className="text-black">
                {data}
              </option>
            ))}
          </select>
        </div>
        <div className="room w-[70vw]  h-[63vh] rounded-xl bg-gray-100 p-4 overflow-y-auto">
          {data.numberOfRooms !== 0 ? (
            data.groups.map((subgroup) =>
              subgroup.name === type ? (
                [...Array(parseInt(subgroup.numRooms))].map((_, roomIndex) => (
                  <div key={roomIndex} className="room-item bg-white p-10 m-2 rounded-xl shadow-md">
                    <h2 className="text-xl font-bold mb-4">Room {roomIndex + 1}</h2>
                    <div className="tables relative w-full h-fit flex flex-wrap items-center justify-around  gap-20">
                      {[...Array(parseInt(subgroup.numTables))].map((_, tableIndex) => (
                        <div key={tableIndex} className="table  relative bg-gray-200 p-4 rounded-lg shadow-sm w-52 h-40">
                          <div className="table-top  w-full h-full bg-gray-300 rounded-lg flex items-center justify-center">
                            Table {tableIndex + 1}
                          </div>
                          <div className="chairs absolute top-0 -left-10 w-[18vw] h-full flex  justify-between items-center">
                            <div className="flex flex-col items-center justify-center gap-5">
                              {[...Array(parseInt(subgroup.numChairsPerTable / 2))].map((_, chairIndex) => (
                                <div key={chairIndex} className="chair w-8 h-8 bg-blue-500 rounded-lg"></div>
                              ))}
                            </div>
                            <div className="flex flex-col  items-center justify-center gap-5">
                              {[...Array(parseInt(subgroup.numChairsPerTable / 2))].map((_, chairIndex) => (
                                <div key={chairIndex} className="chair  w-8 h-8 bg-blue-500 rounded-lg"></div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : null
            )
          ) : (
            <div className="text-black">
              NO rooms for reservations
            </div>
          )}
        </div>
        <div className="Buttons mt-10 flex items-center justify-center gap-20">
          <Button
            details="btn-wide border border-secondary bg-transparent text-secondary"
            info="Go Back"
          />
          <Button details="btn-wide" info="Save Changes" />
        </div>
        <div className="count flex items-center justify-center mt-2 gap-2">
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className={`w-8 h-8 border cursor-pointer ${
                num === 4 ? "bg-secondary text-primary" : ""
              } border-gray-300 flex items-center justify-center rounded-lg`}
            >
              <p className="font-semibold">{num}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomType;
