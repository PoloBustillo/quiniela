import { createSlice } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";
const key = "11B61F47CF1E7D3B93B8527C6352D";
const initialState = {
  pronosticos: {},
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
    },
    updatePronosticos: (state, { payload }) => {
      if (state.pronosticos[payload.partidoId] === undefined) {
        state.pronosticos[payload.partidoId] = payload;
      } else {
        if (payload.hasOwnProperty("away_score"))
          state.pronosticos[payload.partidoId]["away_score"] =
            payload.away_score;
        if (payload.hasOwnProperty("home_score"))
          state.pronosticos[payload.partidoId]["home_score"] =
            payload.home_score;
      }
    },
  },
});

export const { updatePronosticos, initPronosticos } = pronosticosSlice.actions;

export default pronosticosSlice.reducer;
