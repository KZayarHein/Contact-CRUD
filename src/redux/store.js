import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi";
import { contactApi } from "./services/contactApi";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [contactApi.reducerPath]: contactApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware,contactApi.middleware),
})