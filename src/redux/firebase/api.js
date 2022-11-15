import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import CryptoJS from "crypto-js";
const partidosRef = collection(db, "partidos");
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
    getPartidos: build.query({
      keepUnusedDataFor: 1000000,
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

          filterSortArrayByDay = sortArrayByDay.map((partidosByDay) => {
            return partidosByDay.filter((partido) => {
              return new Date(time) - new Date(partido.datetime) < 0;
            });
          });
        } catch (e) {
          console.error("Error adding document: ", e);
          return { error: e };
        }
        return { data: filterSortArrayByDay };
      },
    }),
    getAllPronosticos: build.query({
      async queryFn(body, _queryApi, _extraOptions, baseQuery) {
        let partidos = [];

        const docsRef = await getDocs(partidosRef);
        docsRef.forEach((doc) => {
          if (partidos) {
            partidos.push(doc.data());
          }
        });
        if (partidos) {
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
          //TODO: change date
          let oldGames = partidos.filter((partido) => {
            return new Date(time) - new Date(partido.datetime) > 0;
          });

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
                let predictions = oldGames.map((partido) => {
                  let points = 0;
                  if (decrypted[partido.id]) {
                    let predicted_winner = null;
                    if (
                      decrypted[partido.id].home_score >
                      decrypted[partido.id].away_score
                    ) {
                      predicted_winner = partido.home_team_country;
                    }
                    if (
                      decrypted[partido.id].home_score <
                      decrypted[partido.id].away_score
                    ) {
                      predicted_winner = partido.away_team_country;
                    }
                    if (
                      partido.away_team.goals ===
                        decrypted[partido.id].away_score &&
                      partido.home_team.goals ===
                        decrypted[partido.id].home_score
                    ) {
                      points = 2;
                    } else if (
                      predicted_winner === partido.winner &&
                      partido.away_team.goals !== null &&
                      partido.home_team.goals !== null
                    ) {
                      points = 1;
                    }
                    return {
                      data: {
                        winner_predicted: predicted_winner,
                        winner_real: partido.winner,
                        home_code: partido.home_team.country,
                        away_code: partido.away_team.country,
                        home_goals: decrypted[partido.id].home_score,
                        home_real_goals: partido.home_team.goals,
                        away_goals: decrypted[partido.id].away_score,
                        away_real_goals: partido.away_team.goals,
                        partido: partido.id,
                        points: points,
                      },
                    };
                  }
                  return {};
                });
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
      queryFn: async ({ body, userId }) => {
        let data = null;
        try {
          CryptoJS.pad.NoPadding = {
            pad: function () {},
            unpad: function () {},
          };
          data = CryptoJS.AES.encrypt(JSON.stringify(body), key).toString();
          const pronosticosRef = doc(db, "pronosticos", userId);
          //TODO: check data before encrypt
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
  useGetPartidosQuery,
  useLazyGetTimeQuery,
  useUpdatePronosticosFirebaseMutation,
  useGetAllPronosticosQuery,
} = api;
