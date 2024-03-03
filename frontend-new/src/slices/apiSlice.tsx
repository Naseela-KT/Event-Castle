import {
    fetchBaseQuery,
    createApi,
    BaseQueryFn,
    FetchBaseQueryError,
    FetchArgs,
  } from '@reduxjs/toolkit/query/react';
  
  // Specify the types for BaseQueryFn
  const baseQuery: BaseQueryFn<string|FetchArgs, unknown, FetchBaseQueryError, {}> = fetchBaseQuery({
    baseUrl: '',
  });
  
  interface ApiSliceEndpoints {}
  
  export const apiSlice = createApi({
    baseQuery,
    endpoints: (builder) => ({}),
    tagTypes: ['User'],
  });
  
  
