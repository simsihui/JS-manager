import { apiSlice } from '../api/apiSlice';

const TAG_URL = "/api/tag";

export const tagApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTag: builder.mutation({
      query: (data) => ({
        url: `${TAG_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Project"],
    }),
    updateTag: builder.mutation({
      query: (data) => ({
        url: `${TAG_URL}/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Project"],
    }),
    deleteTag: builder.mutation({
      query: (data) => ({
        url: `${TAG_URL}/${data.id}`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Project"],
    }),
  }),
});

export const {
  useCreateTagMutation,
  useUpdateTagMutation,
  useDeleteTagMutation,
} = tagApiSlice;
