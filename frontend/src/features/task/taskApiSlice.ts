import { apiSlice } from '../api/apiSlice';

const TASK_URL = "/api/task";

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTask: builder.query({
      query: (data) => `${TASK_URL}/${data.id}`,
      providesTags: (_, __, arg) => [{ type: "Task", id: arg }],
    }),
    createTask: builder.mutation({
      query: (data) => ({
        url: `${TASK_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Project"],
    }),
    updateTask: builder.mutation({
      query: (data) => ({
        url: `${TASK_URL}/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_, __, arg) => [
        "Project",
        { type: "Task", id: arg.id },
      ],
    }),
    deleteTask: builder.mutation({
      query: (data) => ({
        url: `${TASK_URL}/${data.id}`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Project"],
    }),
  }),
});

export const {
  useGetTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApiSlice;
