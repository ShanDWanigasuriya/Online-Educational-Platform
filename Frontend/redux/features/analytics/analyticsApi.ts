import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const analyticsApi = createApi({
    reducerPath: "analyticapi",
    baseQuery: fetchBaseQuery({
      baseUrl: process.env.NEXT_PUBLIC_ANALYTIC_SERVER_URI,
    }),
    endpoints: (builder) => ({
        getCoursesAnalytics: builder.query({
            query: () => ({
                url: 'get-courses-analytics',
                method: 'GET',
                credentials: 'include' as const,
            }),
        }),
        getCreatedCoursesAnalytics: builder.query({
            query: () => ({
                url: 'get-createdCourses-analytics',
                method: 'GET',
                credentials: 'include' as const,
            }),
        }),
        getUsersAnalytics: builder.query({
            query: () => ({
                url: 'get-users-analytics',
                method: 'GET',
                credentials: 'include' as const,
            })
        }),
        getOrdersAnalytics: builder.query({
            query: () => ({
                url: 'get-orders-analytics',
                method: 'GET',
                credentials: 'include' as const,
            })
        }),
    }),
});

export const { useGetCoursesAnalyticsQuery,useGetUsersAnalyticsQuery,useGetOrdersAnalyticsQuery, useGetCreatedCoursesAnalyticsQuery } = analyticsApi;