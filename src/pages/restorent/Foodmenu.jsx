import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import profileService from "../../appwrite/profileservices";

function Foodmenu() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const profiledata = useSelector((state) => state.profile.profiledata);

  function handleChange(e, index) {
    const { name, value } = e.target;
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      [name]: value,
    };
    setItems(updatedItems);
  }

  function handlePlus() {
    setCount((prev) => prev + 1);
    setItems((prevItems) => [...prevItems, { name: "", price: "" }]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = await profileService.updatefoodmenue({
      foodmenue: JSON.stringify(items),
      slug: profiledata.$id,
    });
    if (data) {
      navigate(-1);
    }
  }

  useEffect(() => {
    if (profiledata.foodmenue) {
      const foodmenu = JSON.parse(profiledata.foodmenue || "[]");
      setItems(foodmenu);
      setCount(foodmenu.length);
    }
  }, [profiledata]);

  return (
    <>
    <p className="w-full text-center mt-10 text-4xl text-tertiary font-semibold">Food Menu</p>
      <form
        onSubmit={handleSubmit}
        className="w-full flex items-center justify-center"
      >
        <div className="p-4 mt-5 flex border rounded-md shadow-lg h-fit flex-col  items-center">
          {items.map((item, index) => (
            <div key={index} className="flex items-center mb-2">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Item name"
                  value={item.name}
                  onChange={(e) => handleChange(e, index)}
                  className="border border-gray-300 p-2 mr-2 rounded"
                />
              </div>
              <input
                type="text"
                name="price"
                placeholder="Price"
                value={item.price}
                onChange={(e) => handleChange(e, index)}
                className="border border-gray-300 p-2 rounded"
              />
            </div>
          ))}
          <div>
            <button
              type="button"
              onClick={handlePlus}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
              + Add Items
            </button>
          </div>
          <div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded mt-4"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Foodmenu;
