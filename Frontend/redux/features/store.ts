"use client";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { layoutApi } from "./layout/layoutApi";
import { coursesApi } from "./courses/coursesApi";
import { analyticsApi } from './analytics/analyticsApi';
import { notificationsApi } from './notifications/notificationsApi';
import { ordersApi } from './orders/ordersApi'
import { paymentApi } from './payment/paymentApi'
import authSlice from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [layoutApi.reducerPath]: layoutApi.reducer,
    [coursesApi.reducerPath]: coursesApi.reducer,
    [analyticsApi.reducerPath]: analyticsApi.reducer,
    [notificationsApi.reducerPath]: notificationsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    auth: authSlice,
  },
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, layoutApi.middleware, coursesApi.middleware, analyticsApi.middleware, notificationsApi.middleware, ordersApi.middleware, paymentApi.middleware),
});

// call the load user function on every page load
const initializeApp = async () => {
  await store.dispatch(
    apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};

initializeApp();
