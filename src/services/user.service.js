import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/v1/user`,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState()).login.token;
        if (token) {
            headers.set('authorization', token);
        }
        return headers;
    }
})


const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery,
    tagTypes: ['User'],
    endpoints: (builder) => ({
        userProfile: builder.query({
            query: () => '/profile',
        })
    })
});


export const { useUserProfileQuery } = userApi;

export default userApi;