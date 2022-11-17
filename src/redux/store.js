import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { api } from "./firebase/api";
import pronosticosSlice from "./slices/pronosticosReducer";
import partidosSlice from "./slices/partidosReducer";

const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    [api.reducerPath]: api.reducer,
    pronosticosSlice,
    partidosSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);
export default store;
