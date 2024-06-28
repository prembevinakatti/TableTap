import React, { useState } from "react";

const RoomType = ({ roomData, loading, error }) => {
  const [selectedType, setSelectedType] = useState("Room Includes Normal Room");
  const [selectedRoom, setSelectedRoom] = useState("");

  const selectData = [
    "Rooms Includes AC",
    "Room Includes Normal Room",
    "Room Includes Party Room",
    "Room Include Custom Room"
  ];

  const handleSelectChange = (e) => {
    setSelectedType(e.target.value);
    setSelectedRoom(""); // Reset selected room when changing room type
  };

  const handleRoomChange = (e) => {
    setSelectedRoom(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div>
        <select
          className="m-1 p-2 border border-gray-300 rounded bg-secondary text-primary"
          onChange={handleSelectChange}
          value={selectedType}
        >
          {selectData.map((data, index) => (
            <option key={index} value={data} className="text-black">
              {data}
            </option>
          ))}
        </select>
      </div>
      <div className="room w-[70vw] h-[63vh] rounded-xl bg-gray-100 p-4 overflow-y-auto mt-4">
        {loading ? (
          <div className="text-black">Loading...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : roomData.length === 0 ? (
          <div className="text-black">No rooms for reservations</div>
        ) : (
          roomData.map((subgroup) => {
            if (subgroup.name !== selectedType) return null;
            const numRooms = parseInt(subgroup.numRooms) || 0;
            const numTables = parseInt(subgroup.numTables) || 0;
            const numChairsPerTable = parseInt(subgroup.numChairsPerTable) || 0;

            return (
              <div key={subgroup.name} className="room-item bg-white p-10 m-2 rounded-xl shadow-md">
                <h2 className="text-xl font-bold mb-4">Room Details: {subgroup.name}</h2>
                <div>
                  <select
                    className="m-1 p-2 border border-gray-300 rounded bg-secondary text-primary"
                    onChange={handleRoomChange}
                    value={selectedRoom}
                  >
                    {[...Array(numRooms)].map((_, index) => (
                      <option key={index} value={index + 1} className="text-black">
                        {subgroup.name.split(" ")[2]} Room {index + 1}
                      </option>
                    ))}
                  </select>
                </div>
                {selectedRoom && (
                  <div className="tables relative w-full h-fit flex flex-wrap items-center justify-around gap-10 mt-4">
                    {[...Array(numTables)].map((_, tableIndex) => (
                      <div key={tableIndex} className="table relative bg-gray-200 p-4 rounded-lg shadow-sm w-52 h-40">
                        <div className="table-top w-full h-full bg-gray-300 rounded-lg flex items-center justify-center">
                          Table {tableIndex + 1}
                        </div>
                        <div className="chairs absolute top-8  left-1/2 transform -translate-x-1/2 flex justify-between items-center gap-10">
                          <div className="flex  flex-col items-center justify-center gap-5">
                            {[...Array(Math.ceil(numChairsPerTable / 2))].map((_, chairIndex) => (
                              <div key={chairIndex} className="chair w-fit h-fit p-2 border border-black rounded-lg">
                                {subgroup.name.split(" ")[2][0] + selectedRoom + (tableIndex + 1) + (chairIndex + 1)}
                              </div>
                            ))}
                          </div>
                          <div className="flex flex-col items-center justify-center gap-5">
                            {[...Array(Math.floor(numChairsPerTable / 2))].map((_, chairIndex) => (
                              <div key={chairIndex} className="chair w-fit h-fit p-2 border border-black rounded-lg">
                                {subgroup.name.split(" ")[2][0] + selectedRoom + (tableIndex + 1) + (Math.ceil(numChairsPerTable / 2) + chairIndex + 1)}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RoomType;