import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { api } from "./firebase/api";
import pronosticosSlice from "./slices/pronosticosReducer";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    pronosticosSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);
export default store;
