import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { add } from 'lodash'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
    tagTypes: ['Links', "UserInfo"],
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
            query: ( {id, userId}) => ({
                url: `/links`,
                method: 'DELETE',
                // body: id,
                body: {id, userId}
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


    })
})

export const {
    useGetLinksQuery,
     useAddLinksMutation,
    // useUpdateTodoMutation,
    useDeleteLinkMutation,
    useGetUsersInfoQuery,
    useAddUsersInfoMutation,
    useUpdateUsersInfoMutation
} = apiSlice