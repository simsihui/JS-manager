import { apiSlice } from '../api/apiSlice';

const TASK_URL = "/api/task";

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTask: builder.query({
      query: (data) => `${TASK_URL}/${data.id}`,
    }),
    createTask: builder.mutation({
      query: (data) => ({
        url: `${TASK_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    updateTask: builder.mutation({
      query: (data) => ({
        url: `${TASK_URL}/${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteTask: builder.mutation({
      query: (data) => ({
        url: `${TASK_URL}/${data.id}`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApiSlice;
