import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../Redux-toolkit/userSlice";

const EditUser = ({ editMode, setEditMode, id, theme }) => {
  const [userFormData, setUserFormData] = useState({
    name: "",
    age: "",
    email: "",
    number: "",
    department: "",
    profileImage: "",
    profileImagePreview: "",
  });

  // RTK Query hooks
  const { data } = useGetUserByIdQuery(id);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  // Populate form data when the user data is fetched
 useEffect(() => {
   if (editMode && data) {
     setUserFormData({
       name: data?.user?.name || "",
       age: data?.user?.age || "",
       email: data?.user?.email || "",
       number: data?.user?.number || "",
       department: data?.user?.department || "",
       profileImage: data?.user?.profileImage || "",
       profileImagePreview: data?.user?.profileImage || "",
     });
   }
 }, [editMode, data]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image selection
  const imageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserFormData((prev) => ({ ...prev, profileImage: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setUserFormData((prev) => ({
          ...prev,
          profileImagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleUpdate = async () => {
    const { name, age, email, number, department, profileImage } = userFormData;

    if (!name || !age || !email || !number) {
      toast.error("All fields are required.", { position: "top-center" });
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("age", age);
    formData.append("email", email);
    formData.append("number", number);
    formData.append("department", department);
    profileImage && formData.append("profileImage", profileImage);

    try {
      await updateUser({ id, formData }).unwrap();
      toast.success("User successfully updated!", { position: "top-center" });
      setEditMode(false);
    } catch (error) {
      toast.error(error?.data?.msg || "Failed to update user", {
        position: "top-center",
      });
    }
  };

  return (
    <>
      {editMode && (
        <>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className={`${
                theme ? "bg-black text-white" : "bg-white"
              } border-2 p-5 rounded-xl w-96`}
            >
              <h2 className="text-xl text-center font-semibold mb-4">
                Edit User
              </h2>
              <form>
                {/* Profile Image */}
                <div className="flex justify-center mb-4">
                  <label htmlFor="profileImage" className="cursor-pointer">
                    {userFormData.profileImagePreview ? (
                      <img
                        src={userFormData.profileImagePreview}
                        alt="Profile Preview"
                        className="rounded-full w-24 h-24 object-cover"
                      />
                    ) : (
                      <div className="rounded-full w-24 h-24 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                    <input
                      type="file"
                      id="profileImage"
                      name="profileImage"
                      className="hidden"
                      accept="image/*"
                      onChange={imageHandler}
                    />
                  </label>
                </div>

                {/* Name */}
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    name="name"
                    value={userFormData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Age */}
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
                      min="0"
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

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border rounded"
                    name="email"
                    value={userFormData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Number */}
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">Number</label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    name="number"
                    value={userFormData.number}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-red-700 text-white mr-3 p-2 rounded hover:bg-red-800 cursor-pointer"
                    onClick={() => setEditMode(false)}
                    aria-label="Cancel"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="bg-purple-700 text-white p-2 rounded hover:bg-purple-800 cursor-pointer"
                    onClick={handleUpdate}
                    disabled={isLoading}
                    aria-label="Update User"
                  >
                    {isLoading ? "Loading..." : "Update User"}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
        </>
      )}
    </>
  );
};

export default EditUser;
