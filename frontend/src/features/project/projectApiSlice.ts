import { apiSlice } from '../api/apiSlice';

const PROJECT_URL = "/api/project";

export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => `${PROJECT_URL}`,
    }),
    getProject: builder.query({
      query: (data) => `${PROJECT_URL}/${data.id}`,
    }),
    createProject: builder.mutation({
      query: (data) => ({
        url: `${PROJECT_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    updateProject: builder.mutation({
      query: (data) => ({
        url: `${PROJECT_URL}/${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteProject: builder.mutation({
      query: (data) => ({
        url: `${PROJECT_URL}/${data.id}`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApiSlice;
