import { createSlice } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";
const key = "11B61F47CF1E7D3B93B8527C6352D";
const initialState = {
  pronosticos: {},
  active: false,
};

export const pronosticosSlice = createSlice({
  name: "pronosticosSlice",
  initialState,
  reducers: {
    initPronosticos: (state, action) => {
      var decrypted = CryptoJS.AES.decrypt(action.payload.data, key).toString(
        CryptoJS.enc.Utf8
      );
      if (decrypted) state.pronosticos = JSON.parse(decrypted);
      state.active = action.payload.active;
    },
    updatePronosticos: (state, { payload }) => {
      console.log(payload);
      state.pronosticos[payload.partidoId] = payload;
    },
  },
});

export const { updatePronosticos, initPronosticos } = pronosticosSlice.actions;

export default pronosticosSlice.reducer;
