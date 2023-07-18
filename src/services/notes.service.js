import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/v1/note`,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState()).login.token;
        console.log(token)
        if (token) {
            headers.set('authorization', token);
        }
        return headers;
    }
})
export const noteApi = createApi({
    reducerPath: 'noteApi',
    baseQuery,
    tagTypes: ['Notes'],
    endpoints: (builder) => ({
        allPrivateNotes: builder.query({
            query: () => ({
                url: '/all',
                method: 'GET'
            }),
            providesTags: ['Notes']
        }),

        addNote: builder.mutation({
            query: (body) => ({
                url: '/create',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Notes']
        }),

        findNote: builder.query({
            query: (id) => (
                {
                    url: `/${id.id}`,
                    method: 'GET'
                }
            ),
        }),

        deleteNote: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Notes']
        }),

        updateNote: builder.mutation({
            query: (data) => ({
                url: `/update/${data.id}`,
                method: 'PUT',
                body: data.body
            }),
            invalidatesTags: ['Notes']
        }),

        allPublicNotes: builder.query({
            query: (page) => `/public?page=${page}`,
            providesTags: ['Notes']
        }),

        searchNote: builder.query({
            query: (search) => `/?s=${search}`,
            providesTags: ['Notes']
        })
    }),
});

export const {
    useLazyAllPrivateNotesQuery,
    useAllPrivateNotesQuery,
    useAddNoteMutation,
    useFindNoteQuery,
    useDeleteNoteMutation,
    useUpdateNoteMutation,
    useAllPublicNotesQuery,
    useLazyAllPublicNotesQuery,
    useLazySearchNoteQuery
} = noteApi
export default noteApi
