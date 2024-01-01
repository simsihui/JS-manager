import { apiSlice } from '../api/apiSlice';

const PROJECT_URL = "/api/project";

export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => `${PROJECT_URL}`,
      providesTags: (result = []) => [
        "Project",
        ...result.map(({ id }) => ({ type: "Project", id })),
      ],
    }),
    getProject: builder.query({
      query: (data) => `${PROJECT_URL}/${data}`,
      providesTags: (_, __, arg) => [{ type: "Project", id: arg }],
    }),
    createProject: builder.mutation({
      query: (data) => ({
        url: `${PROJECT_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Project"],
    }),
    updateProject: builder.mutation({
      query: (data) => ({
        url: `${PROJECT_URL}/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_, __, arg) => [{ type: "Project", id: arg.id }],
    }),
    deleteProject: builder.mutation({
      query: (data) => ({
        url: `${PROJECT_URL}/${data.id}`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Project"],
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
