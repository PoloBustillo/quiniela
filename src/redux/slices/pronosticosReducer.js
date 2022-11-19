import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
const key = "11B61F47CF1E7D3B93B8527C6352D";
const initialState = {
  pronosticos: [],
  active: false,
  isLoading: false,
};
export const fetchPronosticos = createAsyncThunk(
  "pronosticosSlice/initPronosticos",
  async (user) => {
    const pronosticosRef = doc(db, "pronosticos", user.uid);
    const docSnap = await getDoc(pronosticosRef);
    let pronosticos = docSnap.data();
    if (pronosticos.data) {
      var decrypted = CryptoJS.AES.decrypt(pronosticos.data, key).toString(
        CryptoJS.enc.Utf8
      );
      if (decrypted) {
        return JSON.parse(decrypted);
      } else {
        return [];
      }
    }
    return [];
  }
);
export const pronosticosSlice = createSlice({
  name: "pronosticosSlice",
  initialState,
  reducers: {
    updatePronosticos: (state, { payload }) => {
      let index = state.pronosticos.findIndex(
        (pronostico) => payload.partidoId === pronostico.partidoId
      );
      if (index === -1) {
        state.pronosticos.push(payload);
      } else {
        state.pronosticos[index] = payload;
      }
    },
    updateAllPronosticos: (state, { payload }) => {
      state.pronosticos = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPronosticos.fulfilled, (state, action) => {
      state.pronosticos = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchPronosticos.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPronosticos.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const { updatePronosticos, updateAllPronosticos } =
  pronosticosSlice.actions;

export default pronosticosSlice.reducer;
