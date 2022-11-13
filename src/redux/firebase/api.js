import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import CryptoJS from "crypto-js";
const partidosRef = collection(db, "partidos");
const key = "11B61F47CF1E7D3B93B8527C6352D";

export const api = createApi({
  reducerPath: "firestore",
  baseQuery: fakeBaseQuery({ baseUrl: "/" }),
  endpoints: (build) => ({
    getTime: build.query({
      async queryFn(body, _queryApi, _extraOptions, baseQuery) {
        let response = await fetch(
          "https://worldtimeapi.org/api/timezone/America/Mexico_City"
        );
        let data = await response.json();
        return { data };
      },
    }),
    getPartidos: build.query({
      async queryFn(body, _queryApi, _extraOptions, baseQuery) {
        let partidosArray = [];
        let partidosByDay = [];
        let sortArrayByDay = [];
        let filterSortArrayByDay = [];
        try {
          const docsRef = await getDocs(partidosRef);
          docsRef.forEach((doc) => {
            partidosArray.push(doc.data());
          });

          partidosByDay = partidosArray.reduce((partidos, item) => {
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
          sortArrayByDay = arrayByDay.sort((a, b) => {
            return new Date(a[0].datetime) - new Date(b[0].datetime);
          });
          let response = await fetch(
            "https://worldtimeapi.org/api/timezone/America/Mexico_City"
          );
          let time = await response.json();
          filterSortArrayByDay = sortArrayByDay.map((partidosByDay) => {
            return partidosByDay.filter((partido) => {
              return (
                new Date(time.utc_datetime) - new Date(partido.datetime) < 0
              );
            });
          });
        } catch (e) {
          console.error("Error adding document: ", e);
          return { error: e };
        }
        return { data: filterSortArrayByDay };
      },
    }),
    updatePronosticosFirebase: build.mutation({
      queryFn: async ({ body, userId }) => {
        let data = null;
        try {
          CryptoJS.pad.NoPadding = {
            pad: function () {},
            unpad: function () {},
          };
          data = CryptoJS.AES.encrypt(JSON.stringify(body), key).toString();
          const pronosticosRef = doc(db, "pronosticos", userId);
          setDoc(pronosticosRef, { data: data });
        } catch (error) {
          console.log(error);
          return { error: error };
        }

        return { data: data };
      },
    }),
  }),
});
export const {
  useGetPartidosQuery,
  useLazyGetTimeQuery,
  useUpdatePronosticosFirebaseMutation,
} = api;
