import React, { useContext, useState } from "react";
import { URL } from "./Home";
import { FaRegEdit, FaPlus } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import EditUser from "./EditUser";
import Search from "./Search";
import { myContext } from "../context/Context";
import Pagination from "./Pagination";
import CreateUser from "./CreateUser";
import { useDeleteUserMutation } from "../Redux-toolkit/userSlice";

const Table = ({
  data,
  search,
  setSearch,
  page,
  setPage,
  isLoading,
  totalPages,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState("");

  const { theme, toggleTheme } = useContext(myContext);

  // RTK Query hooks
  const [deleteUser] = useDeleteUserMutation();

  // Add user
  const handleAddUser = () => {
    setShowModal(true);
  };

  // Delete user
  const handleDelete = async (id) => {
    try {
      await deleteUser(id).unwrap();
      toast.success("User deleted successfully!", { position: "top-center" });
    } catch (error) {
      toast.error("Failed to delete user", { position: "top-center" });
      console.error(error);
    }
  };

  // Edit user
  const handleEdit = (id) => {
    setEditMode(true);
    setId(id);
  };

  return (
    <div
      className={`flex justify-center items-center h-130 text-center font-sans`}
    >
      <div
        className={`${
          theme ? "bg-black text-white" : ""
        } border-2 p-5 rounded-xl`}
      >
        <div className="flex justify-between align-text-bottom">
          <button
            onClick={handleAddUser}
            type="button"
            className="text-white cursor-pointer h-10 mr-4 w-10 bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-3 py-3 mb-5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            aria-label="Add User"
          >
            <FaPlus />
          </button>
          {/* Search bar */}
          <Search
            setSearch={setSearch}
            search={search}
            theme={theme}
            setPage={setPage}
          />
          <h1
            className="flex text-3xl ml-3 cursor-pointer"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            {theme ? "☀️" : "🌙"}
          </h1>
        </div>

        {/* Loading State */}
        {isLoading && <p className="text-xl p-2 text-blue-600">Loading...</p>}

        {/* Table */}
        {data?.length > 0 ? (
          <table className="border-collapse border-2 border-gray-400">
            <thead className="text-lg">
              <tr>
                <th
                  className={`${
                    theme ? "bg-zinc-200 text-black" : "bg-zinc-200"
                  } border-2 border-gray-300 p-4`}
                >
                  Name
                </th>
                <th
                  className={`${
                    theme ? "bg-zinc-200 text-black" : "bg-zinc-200"
                  } border-2 border-gray-300 p-4`}
                >
                  Age
                </th>
                <th
                  className={`${
                    theme ? "bg-zinc-200 text-black" : "bg-zinc-200"
                  } border-2 border-gray-300 p-4`}
                >
                  Email
                </th>
                <th
                  className={`${
                    theme ? "bg-zinc-200 text-black" : "bg-zinc-200"
                  } border-2 border-gray-300 p-4`}
                >
                  Department
                </th>
                <th
                  className={`${
                    theme ? "bg-zinc-200 text-black" : "bg-zinc-200"
                  } border-2 border-gray-300 p-4`}
                >
                  Number
                </th>
                <th
                  className={`${
                    theme ? "bg-zinc-200 text-black" : "bg-zinc-200"
                  } border border-gray-300 p-4`}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user._id}>
                  <td className="border border-gray-300 p-3 text-lg hover:text-blue-500 cursor-pointer">
                    <NavLink to={`/userDetails/${user._id}`}>
                      {user.name}
                    </NavLink>
                  </td>
                  <td className="border border-gray-300 p-3 text-lg">
                    {user.age}
                  </td>
                  <td className="border border-gray-300 p-3 text-lg">
                    {user.email}
                  </td>
                  <td className="border border-gray-300 p-3 text-lg">
                    {user.department}
                  </td>
                  <td className="border border-gray-300 p-3 text-lg">
                    {user.number}
                  </td>
                  <td className="border border-gray-300 p-4 flex justify-around text-2xl">
                    <FaRegEdit
                      onClick={() => handleEdit(user._id)}
                      className="cursor-pointer text-green-400 hover:text-green-600 mr-2"
                      aria-label="Edit User"
                    />
                    <MdOutlineDelete
                      onClick={() => handleDelete(user._id)}
                      className="cursor-pointer text-red-400 hover:text-red-600"
                      aria-label="Delete User"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No search results found.</p>
        )}

        {/* Pagination */}
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          data={data}
        />
      </div>

      {/* Toast Notifications */}
      <ToastContainer />

      {/* Create User Modal */}
      <CreateUser
        showModal={showModal}
        setShowModal={setShowModal}
        theme={theme}
      />

      {/* Edit User Modal */}
      <EditUser
        editMode={editMode}
        setEditMode={setEditMode}
        id={id}
        theme={theme}
      />
    </div>
  );
};

export default Table;
