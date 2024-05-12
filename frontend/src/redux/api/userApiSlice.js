import {apiSlice} from "./apiSlice"
import { USERS_URL } from "../constants"

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: "POST",
                body: data,
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: "POST",
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: "POST",
                body: data,
            })
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: "PUT",
                body: data,
            })
        }),
         getProfile: builder.query({
            query: () => ({
                url: `${USERS_URL}/profile`,
            }),
        }),
    }),
})

export const {
    useLoginMutation, 
    useLogoutMutation, 
    useRegisterMutation, 
    useUpdateProfileMutation,
    useGetProfileQuery,
} = userApiSlice