import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mis_pronosticos: [],
};

export const pronosticosSlice = createSlice({
  name: "pronosticosSlice",
  initialState,
  reducers: {
    initPronosticos: (state, action) => {
      state.mis_pronosticos = action.payload;
    },
    updatePronosticos: (state, { payload }) => {
      console.log(payload);
    },
  },
});

export const { updatePronosticos, initPronosticos } = pronosticosSlice.actions;

export default pronosticosSlice.reducer;
