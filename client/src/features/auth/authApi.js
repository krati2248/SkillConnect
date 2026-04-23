import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from '../api/baseApi';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: 'login',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ["Auth"]
    }),
    contact: builder.mutation({
      query: (data) => ({
        url: 'contact',
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: 'register',
        method: 'POST',
        body: data,
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: 'getprofile',
        method: 'GET',
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'logout',
        method: 'POST',
        credentials: "include"
      }),
      invalidatesTags: ["Auth"]
    }),

    checkSession: builder.query({
      query: () => ({
        url: "/me",
        credentials: "include",
        providesTags: ["Auth"]
      }),
    }),
    postjb: builder.mutation({
      query: (data) => ({
        url: 'postjob',
        method: 'POST',
        body: data,
      }),
    }),
    getpost: builder.query({
      query: () => ({
        url: 'getpost',
        method: 'GET'
      })
    }),
    jobdetail: builder.query({
      query: (id) => ({
        url: `jobdetail/${id}`,
        providesTags:["Dpost"]
      })
    }),
    applicant: builder.mutation({
      query: ({ data, id }) => ({
        url: `applyjob/${id}`,
        method: 'POST',
        credentials: "include",
        body: data
      })
    }),
    card: builder.query({
      query: () => ({
        url: 'applycard',
        providesTags: ["Card"]
      })
    }),
    aplied: builder.query({
      query: () => ({
        url: 'applied',
      })
    }),
    dpost: builder.query({
      query: () => ({
        url: 'dispost',
      }),
      providesTags: ["Post"]
    }),
    dapplicant: builder.query({
      query: (id) => ({
        url: `view/${id}`
      })
    }),
    editpost: builder.mutation({
      query: ({ data, id }) => ({
        url: `editpost/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ["Dpost"]
    }),
    delete: builder.mutation({
      query: (id) => ({
        url: `deletepost/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ["Post"]
    }),
    status: builder.mutation({
      query: ({ data, id }) => ({
        url: `status/${id}`,
        method: 'POST',
        body: data
      })
    }),
    profilestatus: builder.query({
      query: () => ({
        url: "profilestatus"
      })
    }),
    catname: builder.mutation({
      query: (data) => ({
        url: 'catname',
        method: 'POST',
        body: data,

      }),
    }),
    userdt: builder.query({
      query: () => ({
        url: "userdt"
      })
    }),
    editprofile: builder.mutation({
      query: (data) => ({
        url: "editprofile",
        method: 'PUT',
        body: data,
      }),
    }),
    applicantcoun: builder.query({
      query: () => ({
        url: "applicantcoun"
      })
    }),
    ftype: builder.mutation({
      query: (data) => ({
        url: "type",
        method: 'POST',
        body: data,
        credentials: "include"
      }),
      invalidatesTags: ["Cards"]
    }),

    categories: builder.query({
      query: () =>
      ({
        url: "categories"
      })
    }),
    cd: builder.query({
      query: () =>
      ({
        url: "cate"
      })
    }),
    googleLogin: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    applyScard: builder.mutation({
      query: (data) => ({
        url: "applyscard",
        method: "POST",
        body: data
      })
    }),
    //forgot password
    fget: builder.mutation({
      query: (data) => ({
        url: "fget",
        method: "POST",
        body:data
      })
    }),
    verifyToken: builder.query({
      query: (token) => `/reset-password?token=${token}`
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/reset-password",
        method: "POST",
        body:data
      })
    })
  })
});

export const { useLoginMutation, useGetProfileQuery, useLogoutMutation, useRegisterMutation, useCheckSessionQuery, usePostjbMutation, useGetpostQuery, useJobdetailQuery, useApplicantMutation, useCardQuery, useApliedQuery, useDpostQuery, useDapplicantQuery, useEditpostMutation, useDeleteMutation, useStatusMutation, useProfilestatusQuery, useCatnameMutation, useUserdtQuery, useEditprofileMutation, useApplicantcounQuery, useFtypeMutation, useCategoriesQuery, useCdQuery, useGoogleLoginMutation, useApplyScardMutation,useFgetMutation,useVerifyTokenQuery,useResetPasswordMutation } = authApi;