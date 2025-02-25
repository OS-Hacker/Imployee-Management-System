import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CgProfile } from "react-icons/cg";
import { URL } from "./Home";
import { useCreateUserMutation } from "../Redux-toolkit/userSlice";

const CreateUser = ({ showModal, setShowModal, theme }) => {
  const [userFormData, setUserFormData] = useState({
    name: "",
    age: "",
    email: "",
    number: "",
    department: "",
  });

  const [profileImage, setProfileImage] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const [createUser, { isLoading }] = useCreateUserMutation();

  const handleAddUser = async () => {
    const formData = new FormData();

    const { name, age, email, number, department } = userFormData;

    formData.append("profileImage", profileImage);
    formData.append("name", name);
    formData.append("age", age);
    formData.append("email", email);
    formData.append("number", number);
    formData.append("department", department);
    try {
      await createUser(formData).unwrap();
      toast.success("User created successfully!", { position: "top-center" });
      setShowModal(false);
      setUserFormData({
        profileImage: "",
        name: "",
        age: "",
        email: "",
        number: "",
        department: "",
      });
      setProfileImagePreview("");
    } catch (error) {
      toast.error("Failed to create user", { position: "top-center" });
    }
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="fixed inset-0 flex items-center justify-center z-50 ">
            <div
              className={`${
                theme ? "bg-black text-white" : "bg-white"
              }  p-5 rounded shadow-lg w-96`}
            >
              <h2 className="text-xl text-center font-semibold mb-4">
                Add New User
              </h2>
              <form>
                <div className="">
                  <label htmlFor="inp" className="mt-4">
                    {profileImagePreview ? (
                      <img
                        src={profileImagePreview}
                        alt="profileImage"
                        className="rounded-full m-auto w-30 h-30 "
                      />
                    ) : (
                      <CgProfile className="text-8xl m-auto cursor-pointer" />
                    )}
                    <input
                      type="file"
                      name="profileImage"
                      className="hidden"
                      id="inp"
                      accept="image/*"
                      onChange={imageHandler}
                    />
                  </label>
                </div>
                <div className="mb-4">
                  <label className="block text-white text-sm font-bold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    name="name"
                    value={userFormData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />
                </div>
                {/* Age Input Field */}
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">Age</label>
                    <input
                      type="number"
                      className="w-full p-2 border rounded"
                      name="age"
                      value={userFormData.age}
                      onChange={handleChange}
                      placeholder="Enter your age"
                      min="0" // Ensures age is not negative
                    />
                  </div>

                  {/* Department Dropdown */}
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      Department
                    </label>
                    <select
                      className="w-full p-2 border rounded"
                      name="department"
                      value={userFormData.department}
                      onChange={handleChange}
                    >
                      <option value="" hidden>
                        Select Department
                      </option>
                      <option
                        value="IT"
                        className={`${theme ? "bg-black" : "bg-white"}`}
                      >
                        IT
                      </option>
                      <option
                        value="HR"
                        className={`${theme ? "bg-black" : "bg-white"}`}
                      >
                        HR
                      </option>
                      <option
                        value="Finance"
                        className={`${theme ? "bg-black" : "bg-white"}`}
                      >
                        Finance
                      </option>
                      <option
                        value="Marketing"
                        className={`${theme ? "bg-black" : "bg-white"}`}
                      >
                        Marketing
                      </option>
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2 ">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border rounded"
                    name="email"
                    placeholder="Enter your email"
                    value={userFormData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold  mb-2">
                    Number
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    name="number"
                    value={userFormData.number}
                    onChange={handleChange}
                    placeholder="Enter your number"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-red-700 text-white mr-3 p-2 rounded hover:bg-red-800 cursor-pointer"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="bg-purple-700 text-white p-2 rounded hover:bg-purple-800 cursor-pointer"
                    onClick={handleAddUser}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Add User"}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
        </>
      ) : null}
    </>
  );
};

export default CreateUser;
