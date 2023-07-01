import axios from "axios";

export const getPlacesData = async (bl_lat, bl_lng, tr_lat, tr_lng, type) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: bl_lat ? bl_lat : "40.83310625359511",
          tr_latitude: tr_lat ? tr_lat : "40.692685363923616",
          bl_longitude: bl_lng ? bl_lng : "-73.94176847209059",
          tr_longitude: tr_lng ? tr_lng : "-74.0433920049758",
          limit: "30",
          currency: "USD",
          lunit: "km",
          lang: "en_US",
        },
        headers: {
          "X-RapidAPI-Key":
            "4225b4b441msh9933d318c1893cbp17834bjsn8b7feb528216",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }
    );

    return data;
  } catch (error) {
    return null;
  }
};
