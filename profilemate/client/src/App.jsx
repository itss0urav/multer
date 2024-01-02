import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [userData, setUserData] = useState([]);
  const imagePath = "http://localhost:5000/files/";
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user")
      .then((res) => {
        console.log(res.data);
        setUserData(res.data);
      })
      .catch((err) => console.log(err));
  }, [userData]);

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("name", name);

    axios
      .post("http://localhost:5000/api/user", formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 m-4 bg-white rounded shadow-md transform hover:scale-105 transition-transform duration-200 ease-in-out">
    <div className="text-center text-2xl font-bold m-4">Made By Souarv</div>
        <input
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 m-1 rounded-md border border-gray-300"
          type="text"
          placeholder="Enter name"
        />
        <input
          onChange={(e) => setPhoto(e.target.files[0])}
          className="w-full p-2 m-1 rounded-md border border-gray-300"
          type="file"
        />
        <button
          onClick={handleUpload}
          className="w-full p-2 m-1 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Upload
        </button>
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-gray-700">Profile Map</h2>
          <div className="mt-2 space-y-4">
            {userData.map((user, index) => (
              <div key={index} className="flex flex-col items-center space-x-4">
                <h2 className="text-gray-700 font-bold text-4xl mb-2">
                  {user.name}
                </h2>
                <img
                  className="w-3/4  rounded-md shadow"
                  src={`${imagePath}${user.image}`}
                  alt={user.name}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
