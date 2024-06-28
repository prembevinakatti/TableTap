// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { FaArrowRight } from 'react-icons/fa';
// import profileService from '../../appwrite/profileservices'; // Adjust the import based on your file structure
// import { Query } from 'appwrite';

// function UserHomePage() {
//   const { register, handleSubmit, watch } = useForm();
//   const [documents, setDocuments] = useState([]);

//   const timeToMinutes = (time) => {
//     const [hours, minutes] = time.split(':').map(Number);
//     return hours * 60 + minutes;
//   };

//   const handleFetchDocuments = async (data) => {
//     try {
//       console.log('Form data:', data); // Debugging statement
//       const filters = [];

//       if (data.location) filters.push(Query.equal('location', data.location));
//       if (data.date) filters.push(Query.equal('date', data.date));
//       if (data.roomType) filters.push(Query.equal('roomType', data.roomType));

//       console.log('Filters:', filters); // Debugging statement

//       const userTime = timeToMinutes(data.time);
//       const response = await profileService.getres({ query: filters });

//       console.log('Response:', response); // Debugging statement

//       if (response) {
//         const filteredDocuments = response.documents.filter((doc) => {
//           const openTime = timeToMinutes(doc.opentime);
//           const closeTime = timeToMinutes(doc.closetime);
//           const startInterval = timeToMinutes(doc.startinterval);
//           const closeInterval = timeToMinutes(doc.closeinterval);

//           return (
//             userTime >= openTime &&
//             userTime <= closeTime &&
//             !(userTime >= startInterval && userTime <= closeInterval)
//           );
//         });
//         setDocuments(filteredDocuments);
//         console.log('Filtered Documents:', filteredDocuments); // Debugging statement
//       }
//     } catch (error) {
//       console.error('Error fetching documents:', error);
//     }
//   };

//   useEffect(() => {
//     const subscription = watch(handleSubmit(handleFetchDocuments));
//     return () => subscription.unsubscribe();
//   }, [watch, handleSubmit]);

//   return (
//     <div>
//       <div className="UserHome">
//         <form
//           className="HomenavBtns m-2 flex flex-wrap items-center xl:gap-10 gap-3"
//           onSubmit={handleSubmit(handleFetchDocuments)}
//         >
//           <div>
//             <select
//               className="select w-44 btn text-lg bg-primary text-secondary max-w-xs"
//               {...register('location')}
//             >
//               <option value="" disabled selected>
//                 Location
//               </option>
//               <option>Gadag</option>
//               <option>Bangalore</option>
//               <option>Goa</option>
//               <option>Mumbai</option>
//               <option>Chennai</option>
//               <option>Mysore</option>
//               <option>Laxmeshwar</option>
//             </select>
//           </div>
//           <div className="btn w-44 bg-primary text-secondary">
//             <input
//               type="date"
//               className="bg-transparent"
//               {...register('date')}
//             />
//           </div>
//           <div className="btn w-44 bg-primary text-secondary">
//             <input
//               type="time"
//               className="bg-transparent"
//               {...register('time')}
//             />
//           </div>
//           <div>
//             <select
//               className="select w-44 btn text-lg bg-primary text-secondary max-w-xs"
//               {...register('roomType')}
//             >
//               <option value="" disabled selected>
//                 Type
//               </option>
//               <option>Normal Room</option>
//               <option>AC Room</option>
//               <option>Party Room</option>
//             </select>
//           </div>
//         </form>

//         <div className="homeContent w-full h-[70vh] overflow-auto">
//           <div className="xl:flex md:flex md:flex-wrap lg:flex lg:flex-wrap xl:flex-wrap items-center justify-center w-full my-3 h-full gap-10 rounded-lg p-5">
//             {documents.map((doc) => (
//               <div key={doc.$id} className="HomeBox flex flex-col items-start xl:w-1/4 h-[55vh] rounded-lg p-4 border m-3 shadow-lg">
//                 <div className="cardImg w-full h-[25vh] rounded-lg overflow-hidden border">
//                   <img
//                     className="w-full h-full"
//                     src={doc.imageURL || 'https://via.placeholder.com/150'}
//                     alt={doc.name}
//                   />
//                 </div>
//                 <div className="cardContent">
//                   <p className="font-semibold text-xl mt-2">{doc.name}</p>
//                   <p className="text-tertiary mt-5 text-sm leading-[1.2]">
//                     {doc.address}
//                   </p>
//                   <p className="text-tertiary mt-10 font-semibold">{doc.timings}</p>
//                 </div>
//                 <div className="btn w-full text-center hover:border-secondary hover:text-secondary mt-10 bg-secondary text-primary">
//                   <p>More Details</p>
//                   <FaArrowRight />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserHomePage;
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowRight } from 'react-icons/fa';
import profileService from '../../appwrite/profileservices'; // Adjust the import based on your file structure
import { useNavigate } from 'react-router-dom';

function UserHomePage() {
  const { register, handleSubmit } = useForm();
  const [documents, setDocuments] = useState([]);
  const navigate=useNavigate()

  const handleFetchDocuments = async () => {
    try {
      const response = await profileService.getres();
      console.log('Response:', response); // Debugging statement

      if (response) {
        setDocuments(response.documents);
        console.log('Documents:', response.documents); // Debugging statement
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  useEffect(() => {
    handleFetchDocuments();
  }, []);

  return (
    <div>
      <div className="UserHome">
        <form
          className="HomenavBtns m-2 flex flex-wrap items-center xl:gap-10 gap-3"
          onSubmit={handleSubmit(handleFetchDocuments)}
        >
          <div>
            <select
              className="select w-44 btn text-lg bg-primary text-secondary max-w-xs"
              {...register('location')}
            >
              <option value="" disabled selected>
                Location
              </option>
              <option>Gadag</option>
              <option>Bangalore</option>
              <option>Goa</option>
              <option>Mumbai</option>
              <option>Chennai</option>
              <option>Mysore</option>
              <option>Laxmeshwar</option>
            </select>
          </div>
          <div className="btn w-44 bg-primary text-secondary">
            <input
              type="date"
              className="bg-transparent"
              {...register('date')}
            />
          </div>
          <div className="btn w-44 bg-primary text-secondary">
            <input
              type="time"
              className="bg-transparent"
              {...register('time')}
            />
          </div>
          <div>
            <select
              className="select w-44 btn text-lg bg-primary text-secondary max-w-xs"
              {...register('roomType')}
            >
              <option value="" disabled selected>
                Type
              </option>
              <option>Normal Room</option>
              <option>AC Room</option>
              <option>Party Room</option>
            </select>
          </div>
        </form>

        <div className="homeContent w-full h-[70vh] overflow-auto">
          <div className="xl:flex md:flex md:flex-wrap lg:flex lg:flex-wrap xl:flex-wrap items-center justify-center w-full my-3 h-full gap-10 rounded-lg p-5">
            {documents.map((doc) => (
              <div key={doc.$id} className="HomeBox flex flex-col items-start xl:w-1/4 h-[55vh] rounded-lg p-4 border m-3 shadow-lg">
                <div className="cardImg w-full h-[25vh] rounded-lg overflow-hidden border">
                  <img
                    className="w-full h-full"
                    src={doc.imageURL || 'https://via.placeholder.com/150'}
                    alt={doc.name}
                  />
                </div>
                <div className="cardContent">
                  <p className="font-semibold text-xl mt-2">{doc.name}</p>
                  <p className="text-tertiary mt-5 text-sm leading-[1.2]">
                    {doc.address}
                  </p>
                  <p className="text-tertiary mt-10 font-semibold">{doc.timings}</p>
                </div>
                <div className="btn w-full text-center hover:border-secondary hover:text-secondary mt-10 bg-secondary text-primary" onClick={()=>navigate(`/resprofilepage/${doc.name}`)}>
                  <p>More Details</p>
                  <FaArrowRight />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHomePage;
