import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { URL } from "./Home";
import { myContext } from "../context/Context";

const UserDetails = () => {
  const { id } = useParams();

  const [userDetails, setUserDetails] = useState({});

  const singleUserData = async () => {
    try {
      const { data } = await axios.get(`${URL}/api/v1/${id}`);
      setUserDetails(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    singleUserData();
  }, [id]);

  const { profileImage, name, age, email, number } = userDetails;

  const { theme, toggleTheme } = useContext(myContext);

  return (
    <>
      <div className={`flex justify-center mt-50`}>
        <div
          className={`  ${
            theme ? "bg-black text-white" : ""
          }  w-90 h-75 shadow-2xl rounded-2xl p-3`}
        >
          <div className="">
            <img
              src={profileImage}
              alt="profileImage"
              className="w-30 h-30 m-auto rounded-full"
            />
            <h1 className="text-lg mt-3">User Name : {name}</h1>
            <h1 className="text-lg">User Age : {age}</h1>
            <h1 className="text-lg">User Email : {email}</h1>
            <h1 className="text-lg">User Number : {number}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
