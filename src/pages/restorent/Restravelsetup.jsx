import React, { useState } from 'react';
import profileService from '../../appwrite/profileservices';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ResTravelSetup = () => {
  const [hasVehicles, setHasVehicles] = useState(null);
  const [hasBike, setHasBike] = useState(null);
  const [hasCar, setHasCar] = useState(null);
  const [vehicleData, setVehicleData] = useState({
    Bike: { name: 'Bike', costPerKm: '', seats: 1 },
    Car: { name: 'Car', costPerKm: '', seats: 4 },
  });
  const navigate=useNavigate()

  const handleHasVehiclesChange = (e) => {
    setHasVehicles(e.target.value === 'yes');
    if (e.target.value === 'no') {
      setHasBike(null);
      setHasCar(null);
    }
  };

  const profiledata = useSelector((state) => state.profile.profiledata);

  const handleHasBikeChange = (e) => {
    setHasBike(e.target.value === 'yes');
  };

  const handleHasCarChange = (e) => {
    setHasCar(e.target.value === 'yes');
  };

  const handleVehicleChange = (type, field, value) => {
    const newVehicleData = { ...vehicleData };
    newVehicleData[type][field] = value;
    setVehicleData(newVehicleData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const providedVehicles = {
      Bike: hasBike ? vehicleData.Bike : null,
      Car: hasCar ? vehicleData.Car : null,
    };
    console.log('Vehicle Data:', providedVehicles);
    profileService.updatevehicaldetails({
      canprovidevehical: true,
      slug: profiledata.$id,
      vehicaldetails: JSON.stringify(providedVehicles)
    }).then(()=>{
      toast.success("Submit Successfully !")
      navigate(-1)
    })
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold">Travel Setup</h1>

      <div>
        <label className="block mb-2">
          Do you have vehicles?
          <select 
            onChange={handleHasVehiclesChange}
            className="ml-2 p-1 border border-gray-300 rounded"
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </label>
      </div>

      {hasVehicles && (
        <div className="space-y-4">
          <div>
            <label className="block mb-2">
              Do you have a Bike?
              <select 
                onChange={handleHasBikeChange}
                className="ml-2 p-1 border border-gray-300 rounded"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </label>
          </div>

          {hasBike && (
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Bike Details</h2>
              <input
                type="number"
                placeholder="Cost per KM"
                value={vehicleData.Bike.costPerKm}
                onChange={(e) => handleVehicleChange('Bike', 'costPerKm', e.target.value)}
                className="p-2 border border-gray-300 rounded w-full"
              />
              <input
                type="number"
                placeholder="Number Of Seats 1"
                disabled
                // value={vehicleData.Bike.seats}
                readOnly
                className="p-2 border border-gray-300 rounded w-full"
              />
            </div>
          )}

          <div>
            <label className="block mb-2">
              Do you have a Car?
              <select 
                onChange={handleHasCarChange}
                className="ml-2 p-1 border border-gray-300 rounded"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </label>
          </div>

          {hasCar && (
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Car Details</h2>
              <input
                type="number"
                placeholder="Cost per KM"
                value={vehicleData.Car.costPerKm}
                onChange={(e) => handleVehicleChange('Car', 'costPerKm', e.target.value)}
                className="p-2 border border-gray-300 rounded w-full"
              />
              <input
                type="number"
                placeholder="Number Of Seats 4"
                disabled
                // value={vehicleData.Car.seats}
                readOnly
                className="p-2 border border-gray-300 rounded w-full"
              />
            </div>
          )}

          {(hasBike || hasCar) && (
            <form onSubmit={handleSubmit} className="space-y-2">
              <button 
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      )}

      {hasVehicles === false && (
        <div>
          <p className="text-red-500">You cannot proceed without providing vehicles.</p>
        </div>
      )}
    </div>
  );
};

export default ResTravelSetup;
