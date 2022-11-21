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

        let time = await getTime();
        //time = "11-23-2022";
        //TODO: RESULTADOS MOSTRAR
        let oldGames = partidos.filter((partido) => {
          const result = compareAsc(new Date(time), new Date(partido.datetime));
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
      queryFn: async ({ userId }, { getState }) => {
        const pronosticosRef = doc(db, "pronosticos", userId);
        let data = null;
        let pronosticos = getState().pronosticosSlice.pronosticos;

        let touchedPronosticos = getTouched(pronosticos);

        let time = await getTime();
        //TODO: TEST BAD DATA
        //time = "11-18-2022";

        let badData = touchedPronosticos?.filter((index) => {
          let foundPronostico = pronosticos.find((pronostico) => {
            return pronostico.partidoId === index;
          });

          const result = compareAsc(
            new Date(time),
            new Date(foundPronostico.date)
          );

          return result > 0;
        });

        if (badData.length > 0) return { error: badData };
        let untouchedPronosticos = pronosticos.map(({ touched, ...rest }) => {
          return { touched: false, ...rest };
        });

        try {
          CryptoJS.pad.NoPadding = {
            pad: function () {},
            unpad: function () {},
          };

          data = CryptoJS.AES.encrypt(
            JSON.stringify(untouchedPronosticos),
            key
          ).toString();

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
