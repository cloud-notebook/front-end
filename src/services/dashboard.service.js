import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/v1/dashboard`,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState()).login.token;
        console.log(token)
        if (token) {
            headers.set('authorization', token);
        }
        return headers;
    }
})

export const dashboardApi = createApi({
    reducerPath: 'api',
    baseQuery,
    endpoints: (builder) => ({
        statics: builder.query({
            query: () => `/statics`,
        })
    }),

});

export const { useStaticsQuery } = dashboardApi;
export default dashboardApi;