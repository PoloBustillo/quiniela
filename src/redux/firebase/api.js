import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

const partidosRef = collection(db, "partidos");

export const api = createApi({
  reducerPath: "firestore",
  baseQuery: fakeBaseQuery({ baseUrl: "/" }),
  endpoints: (build) => ({
    getTime: build.query({
      async queryFn(body, _queryApi, _extraOptions, baseQuery) {
        let response = await fetch(
          "http://worldtimeapi.org/api/timezone/America/Mexico_City"
        );
        let data = await response.json();
        return { data };
      },
    }),
    getPartidos: build.query({
      async queryFn(body, _queryApi, _extraOptions, baseQuery) {
        let partidosArray = [];
        let partidosByDay = [];
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
        } catch (e) {
          console.error("Error adding document: ", e);
          return { error: e };
        }
        return { data: partidosByDay };
      },
    }),
  }),
});
export const { useGetPartidosQuery, useLazyGetTimeQuery } = api;
