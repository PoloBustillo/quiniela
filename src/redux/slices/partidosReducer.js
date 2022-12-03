import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { compareAsc } from "date-fns";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { partidos } from "../../data";
import { db } from "../../firebase-config";
import { getTime } from "../../utils";

const initialState = {
  partidos: [],
  partidosByDay: [],
  oldGames: [],
  gruposArray: [],
  isLoading: false,
};

export const fetchAllPartidos = createAsyncThunk(
  "partidosSlice/getPartidos",
  async (thunkAPI) => {
    let partidosArray = [];
    let gruposArray = [];

    const partidosRef = collection(db, "partidosFinal");

    const gruposRef = collection(db, "grupos");

    // try {
    //   partidos.map((partido, index) => {
    //     const partidosFinalRef = doc(db, "partidosFinal", index.toString());
    //     setDoc(partidosFinalRef, { ...partido });
    //   });
    // } catch (error) {
    //   console.log(error);
    // }

    const docsRef = await getDocs(partidosRef);
    docsRef.forEach((doc) => {
      partidosArray.push(doc.data());
    });
    let time = await getTime();
    //TODO: Old Games
    //time = "11-22-2022";
    const groupsRef = await getDocs(gruposRef);

    groupsRef.forEach((doc) => {
      let partidosGrupos = new Set();
      doc.data().teams.forEach((data) => {
        let filteredData = partidosArray.filter((partido) => {
          const result = compareAsc(new Date(time), new Date(partido.datetime));
          return partido.home_team_country === data.country && result < 0;
        });
        filteredData.forEach((partido) => {
          partidosGrupos.add(partido);
        });
      });
      gruposArray.push({ id: doc.id, partidos: Array.from(partidosGrupos) });
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

    let filterSortArrayByDay = sortArrayByDay.map((partidosByDay) => {
      return partidosByDay.filter((partido) => {
        const result = compareAsc(new Date(time), new Date(partido.datetime));
        return result < 0;
      });
    });

    return {
      partidosArray: partidosArray,
      filterSortArrayByDay: filterSortArrayByDay,
      gruposArray: gruposArray,
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
      state.gruposArray = action.payload.gruposArray;
      state.isLoading = false;
    });
    builder.addCase(fetchAllPartidos.pending, (state, action) => {
      state.isLoading = true;
    });
  },
});

export const { setOldGames } = partidosSlice.actions;

export default partidosSlice.reducer;
