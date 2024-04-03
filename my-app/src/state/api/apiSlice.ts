import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
  tagTypes: ['Links', "UserInfo", "Auth", "Photo"],
  endpoints: (builder) => ({
    getLinks: builder.query({
      query: (user) => `links/getlinks/${user}`,
      // transformResponse: res => res.sort((a, b) => b.id - a.id),
      providesTags: ['Links']
    }),
    addLinks: builder.mutation({
      query: (links) => ({
        url: '/links',
        method: 'POST',
        body: links
      }),
      invalidatesTags: ['Links']
    }),

    deleteLink: builder.mutation({
      query: ({ id, userId }) => ({
        url: `/links`,
        method: 'DELETE',
        // body: id,
        body: { id, userId }
      }),
      invalidatesTags: ['Links']
    }),

    // user information
    getUsersInfo: builder.query({
      query: (email) => `/info/specific/?email=${email}`,
      providesTags: ['UserInfo']
    }),
    addUsersInfo: builder.mutation({
      query: (info) => ({
        url: '/info',
        method: 'POST',
        body: info
      }),
      invalidatesTags: ['UserInfo']
    }),
    updateUsersInfo: builder.mutation({
      query: (info) => ({
        url: `/info/${info.username}`,
        method: 'PATCH',
        body: info
      }),
      invalidatesTags: ['UserInfo']
    }),

    getPhoto: builder.query({
      query: (img) => {
        return {
          url: `/s3upload/${img}`,
          method: 'GET'
        };
      },
      providesTags: ['Photo']
    }),

    submitPhoto: builder.mutation({
      query: ({ event, image }) => {
        event.preventDefault();
        const formData = new FormData();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        formData.append("image", image);

        return {
          url: '/s3upload',
          method: 'POST',
          body: formData

        };
      },
      invalidatesTags: ['Photo']
    })

  })
});

export const {
  useGetLinksQuery,
  useAddLinksMutation,
  useDeleteLinkMutation,
  useGetUsersInfoQuery,
  useAddUsersInfoMutation,
  useUpdateUsersInfoMutation,
  useGetPhotoQuery,
  useSubmitPhotoMutation
} = apiSlice;
