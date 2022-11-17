import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

const initialState = {
  partidos: [],
  partidosByDay: [],
  oldGames: [],
  isLoading: false,
};

export const fetchAllPartidos = createAsyncThunk(
  "partidosSlice/getPartidos",
  async (thunkAPI) => {
    let partidosArray = [];
    const partidosRef = collection(db, "partidos");
    const docsRef = await getDocs(partidosRef);
    docsRef.forEach((doc) => {
      partidosArray.push(doc.data());
    });

    let partidosByDay = partidosArray.reduce((partidos, item) => {
      let nowDate = new Date(item.datetime);
      var day =
        nowDate.getFullYear() +
        "/" +
        (nowDate.getMonth() + 1) +
        "/" +
        nowDate.getDate();
      const group = partidos[day] || [];
      group.push(item);
      partidos[day] = group;
      return partidos;
    }, {});

    let arrayByDay = Object.values(partidosByDay);
    let sortArrayByDay = arrayByDay.sort((a, b) => {
      return new Date(a[0].datetime) - new Date(b[0].datetime);
    });
    let time = "";
    try {
      let response = await fetch(
        "https://worldtimeapi.org/api/timezone/America/Mexico_City"
      );
      time = await response.json();
      time = time.utc_datetime;
    } catch (error) {
      time = new Date().toUTCString();
    }

    let filterSortArrayByDay = sortArrayByDay.map((partidosByDay) => {
      return partidosByDay.filter((partido) => {
        return new Date(time) - new Date(partido.datetime) < 0;
      });
    });

    return {
      partidosArray: partidosArray,
      filterSortArrayByDay: filterSortArrayByDay,
    };
  }
);

export const partidosSlice = createSlice({
  name: "partidosSlice",
  initialState,
  reducers: {
    setOldGames: (state, action) => {
      state.oldGames = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllPartidos.fulfilled, (state, action) => {
      state.partidos = action.payload.partidosArray;
      state.partidosByDay = action.payload.filterSortArrayByDay;
      state.isLoading = false;
    });
    builder.addCase(fetchAllPartidos.pending, (state, action) => {
      state.isLoading = true;
    });
  },
});

export const { setOldGames } = partidosSlice.actions;

export default partidosSlice.reducer;
