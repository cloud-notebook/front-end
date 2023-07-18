import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/v1/auth`
})


const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery,
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body
            }),
        }),

        register: builder.mutation({
            query: (body) => ({
                url: '/signup',
                method: 'POST',
                body
            }),
        })

    })
});



export const { useLoginMutation, useRegisterMutation } = authApi;

export default authApi;
