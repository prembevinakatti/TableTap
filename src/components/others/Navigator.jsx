import React from 'react';

function Navigator({ pathname }) {
  console.log(pathname);
  
  const data = [
    {
      index: 1,
      location: "/Ressinguppage"
    },
    {
      index: 2,
      location: "/Resroomsetup"
    }
  ];
  
  return (
    <div className="count flex items-center m-2 gap-1">
      {data.map((minidata) => (
        <div 
          key={minidata.index} 
          className={`w-8 h-8 border ${pathname === minidata.location ? "bg-secondary text-primary border-gray-300 cursor-not-allowed" : "border-gray-300 cursor-pointer"} flex items-center justify-center rounded-lg`}
        >
          <p className="font-semibold">{minidata.index}</p>
        </div>  
      ))}
    </div>
  );
}

export default Navigator;
