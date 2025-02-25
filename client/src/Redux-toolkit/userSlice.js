import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
  }),

  tagTypes: ["User"],

  endpoints: (builder) => ({
    // Get users with search and pagination
    getUsers: builder.query({
      query: ({ search, page, per_page }) =>
        `/api/v1?search=${search}&page=${page}&per_page=${per_page}`,
      providesTags: ["User"],
    }),

    // Create a new user
    createUser: builder.mutation({
      query: (userData) => ({
        url: "/api/v1",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    // Get a single user by ID
    getUserById: builder.query({
      query: (id) => `/api/v1/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    // Update an existing user
    updateUser: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/v1/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
    }),

    // Delete a user
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/v1/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "User", id }],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = api;
