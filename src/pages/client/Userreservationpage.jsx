import React, { useState } from 'react';
import profileService from '../../appwrite/profileservices';

const ResTravelSetup = () => {
  const [hasVehicles, setHasVehicles] = useState(null);
  const [hasBike, setHasBike] = useState(null);
  const [hasCar, setHasCar] = useState(null);
  const [vehicleData, setVehicleData] = useState({
    Bike: { name: 'Bike', costPerKm: '', seats: 1 },
    Car: { name: 'Car', costPerKm: '', seats: 4 },
  });

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
    profileService.updatevehicaldetails({canprovidevehical:true,slug:profiledata.$id,vehicaldetails:JSON.stringify(providedVehicles)})
  };

  return (
    <div>
      <h1>Travel Setup</h1>

      <div>
        <label>
          Do you have vehicles?
          <select onChange={handleHasVehiclesChange} style={{ marginLeft: '10px' }}>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </label>
      </div>

      {hasVehicles && (
        <div>
          <div style={{ marginTop: '10px' }}>
            <label>
              Do you have a Bike?
              <select onChange={handleHasBikeChange} style={{ marginLeft: '10px' }}>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </label>
          </div>

          {hasBike && (
            <div style={{ marginBottom: '10px' }}>
              <h2>Bike Details</h2>
              <input
                type="number"
                placeholder="Cost per KM"
                value={vehicleData.Bike.costPerKm}
                onChange={(e) => handleVehicleChange('Bike', 'costPerKm', e.target.value)}
                style={{ marginRight: '10px' }}
              />
              <input
                type="number"
                placeholder="Seats"
                value={vehicleData.Bike.seats}
                readOnly
                style={{ marginRight: '10px' }}
              />
            </div>
          )}

          <div style={{ marginTop: '10px' }}>
            <label>
              Do you have a Car?
              <select onChange={handleHasCarChange} style={{ marginLeft: '10px' }}>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </label>
          </div>

          {hasCar && (
            <div style={{ marginBottom: '10px' }}>
              <h2>Car Details</h2>
              <input
                type="number"
                placeholder="Cost per KM"
                value={vehicleData.Car.costPerKm}
                onChange={(e) => handleVehicleChange('Car', 'costPerKm', e.target.value)}
                style={{ marginRight: '10px' }}
              />
              <input
                type="number"
                placeholder="Seats"
                value={vehicleData.Car.seats}
                readOnly
                style={{ marginRight: '10px' }}
              />
            </div>
          )}

          {(hasBike || hasCar) && (
            <form onSubmit={handleSubmit}>
              <button type="submit" style={{ marginTop: '10px' }}>Submit</button>
            </form>
          )}
        </div>
      )}

      {hasVehicles === false && (
        <div>
          <p>You cannot proceed without providing vehicles.</p>
        </div>
      )}
    </div>
  );
};

export default ResTravelSetup;
