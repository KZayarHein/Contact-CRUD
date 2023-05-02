import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://contact-app.mmsdev.site/api/v1",
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["contact"],
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => ({
        url: "/contact",
      }),
      providesTags: ["contact"],
    }),
    createContact: builder.mutation({
      query: (contact) => ({
        url: "/contact",
        method: "POST",
        body: contact,
      }),
      invalidatesTags: ["contact"],
    }),
    updateContact: builder.mutation({
      query: ({ id, values }) => ({
        url: `/contact/${id}`,
        method: "PUT",
        body: values,
      }),
      invalidatesTags: ["contact"],
    }),
    deleteContact: builder.mutation({
      query: id => ({
        url:`/contact/${id}`,
        method:'DELETE'
      }),
      invalidatesTags:['contact']
    })
  }),
});

export const {
  useGetContactsQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation
} = contactApi;
