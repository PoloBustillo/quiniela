import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import CryptoJS from "crypto-js";
import { compareAsc } from "date-fns";
import { setOldGames } from "../slices/partidosReducer";
import { calculatePoints, getTime, getTouched } from "../../utils";

const key = "11B61F47CF1E7D3B93B8527C6352D";

export const api = createApi({
  reducerPath: "firestore",
  baseQuery: fakeBaseQuery(),
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
    getAllPronosticos: build.query({
      keepUnusedDataFor: 1000000,
      async queryFn(body, { getState, dispatch }, _extraOptions, baseQuery) {
        const partidos = getState().partidosSlice.partidos;

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
        let oldGames = partidos.filter((partido) => {
          const result = compareAsc(
            new Date("2022-11-22T17:00:00Z"),
            new Date(partido.datetime)
          );
          return result > 0;
        });
        dispatch(setOldGames(oldGames));
        if (oldGames) {
          const pronosticos = [];
          try {
            const pronosticosRef = collection(db, "pronosticos");
            const docsRef = await getDocs(pronosticosRef);
            docsRef.forEach((doc) => {
              let decrypted = [];
              let data = doc.data();
              if (data.data) {
                decrypted = JSON.parse(
                  CryptoJS.AES.decrypt(data.data, key).toString(
                    CryptoJS.enc.Utf8
                  )
                );
                let predictions = calculatePoints(oldGames, decrypted);
                pronosticos.push({
                  active: data.active,
                  name: data.name,
                  data: predictions,
                });
              }
            });
          } catch (e) {
            console.error("Error adding document: ", e);
            return { error: e };
          }
          return { data: pronosticos };
        }
        return { data: [] };
      },
    }),
    updatePronosticosFirebase: build.mutation({
      queryFn: async ({ body, userId }, { getState }) => {
        let data = null;
        let partidos = getState().partidosSlice.partidos;
        let comparePronosticos = getState().pronosticosSlice.comparePronosticos;
        let touchedPartidos = getTouched(partidos, comparePronosticos);
        console.log(touchedPartidos);
        try {
          CryptoJS.pad.NoPadding = {
            pad: function () {},
            unpad: function () {},
          };

          let time = getTime();
          let finalPronosticos = {};
          Object.keys(body).forEach((partidoId) => {
            const result = compareAsc(
              new Date("2022-11-22T17:00:00Z"),
              new Date(partidos[partidoId].datetime)
            );
            if (result < 0) {
              console.log(body[partidoId]);
              finalPronosticos = { ...finalPronosticos, ...body[partidoId] };
            }
          });
          console.log(partidos);
          console.log(body);
          console.log(finalPronosticos);
          data = CryptoJS.AES.encrypt(JSON.stringify(body), key).toString();
          const pronosticosRef = doc(db, "pronosticos", userId);

          updateDoc(pronosticosRef, { data: data });
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
  useLazyGetTimeQuery,
  useUpdatePronosticosFirebaseMutation,
  useGetAllPronosticosQuery,
} = api;
