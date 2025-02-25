import React, { useState } from "react";
import Table from "./Table";
import { useGetUsersQuery } from "../Redux-toolkit/userSlice";

export const URL = "http://localhost:8080";

const Home = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const per_page = 3;

  // Fetch users using the auto-generated hook
  const { data, isLoading, isError, error } = useGetUsersQuery({
    search,
    page,
    per_page,
  });

  console.log(data)


  // Extract users and total pages from the API response
  const users = data?.users || [];
  const totalPages = data?.pagination.totalPages || 1;


  // Handle errors
  if (isError) {
    return <div>Error: {error.error}</div>;
  }

  return (
    <>
      <Table
        setSearch={setSearch}
        search={search}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        data={users}
        isLoading={isLoading}
      />
    </>
  );
};

export default Home;
