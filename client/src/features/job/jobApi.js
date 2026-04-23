import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from '../api/baseApi';

export const jobApi = createApi({
  reducerPath: 'jobApi',
    baseQuery,
    tagTypes:['Job'],
  endpoints: (builder) => ({
     
     getjobs: builder.query({
      query: () => 'getjobs',
      providesTags: ['Job'],
    }),
    createJob: builder.mutation({
      query: (formData) => ({
        url: 'createJob',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Job'],
    }),
     
 
  }),
});

export const { useGetjobsQuery,useCreateJobMutation } = jobApi