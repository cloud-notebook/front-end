import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const ratingApi = createApi({
    reducerPath: 'ratingApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_BASE_URL}/api/v1/rating`,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().login.token
            if (token) {
                headers.set('Authorization', token)
            }
            return headers
        }
    }),
    tagTypes: ['Rating'],
    endpoints: (builder) => ({

        getRating: builder.query({
            query: (noteId) => `/${noteId}`,
            providesTags: ['Rating']
        }),

        postRating: builder.mutation({
            query: (body) => ({
                url: '/add',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Rating']
        }),

        deleteRating: builder.mutation({
            query: (noteId) => ({
                url: `/delete/${noteId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Rating']
        })

    })
});


export const { useGetRatingQuery, usePostRatingMutation, useDeleteRatingMutation } = ratingApi
export default ratingApi