import React, { useState, useEffect } from "react";
// import axios from "axios";
import fetch from "isomorphic-fetch";

async function fetchWeatherData() {
  try {
    const apiRes = await fetch(`http://127.0.0.1:8000/api/weatherdata/`);

    if (!apiRes.ok) {
      throw new Error(`weatherdata fetch not ok`);
    }
    console.log("weatherdata fetch ok");
    return apiRes.json();
  } catch (error) {
    throw new Error(`Error fetching weather data: ${error.message}`);
  }
}

export default function Weather() {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const data = await fetchWeatherData();
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }
    fetchWeather();
  }, []);

  const latestTemperature =
    weather.length > 0 ? weather[weather.length - 1].temperature : null;
  const latestHumidity =
    weather.length > 0 ? weather[weather.length - 1].humidity : null;
  const latestprecipitation_probability =
    weather.length > 0
      ? weather[weather.length - 1].precipitation_probability
      : null;
  const latestweathercode =
    weather.length > 0 ? weather[weather.length - 1].weathercode : null;

  const getWeatherDescription = (latestweathercode) => {
    switch (latestweathercode) {
      case 0:
        return "Clear sky";
      case 1:
        return "Mainly clear";
      case 2:
        return "Partly cloudy";
      case 3:
        return "Overcast";
      case 45:
        return "Fog";
      case 48:
        return "Fog";
      case 51:
        return "Light Drizzle";
      case 53:
        return "Moderate Drizzle";
      case 55:
        return "Dense Drizzle";
      case 56:
        return "Light Freezing Drizzle";
      case 57:
        return "Dense Freezing Drizzle";
      case 61:
        return "Slight Rain";
      case 63:
        return "Moderate Rain";
      case 65:
        return "Heavy Rain";
      case 66:
        return "Light Freezing Rain";
      case 67:
        return "Heavy Freezing Rain";
      case 71:
        return "Light Snow";
      case 73:
        return "Moderate Snow";
      case 75:
        return "Heavy Snow";
      case 77:
        return "Granular snow";
      case 80:
        return "Light Shower";
      case 81:
        return "Moderate Shower";
      case 82:
        return "Heavy Shower";
      case 85:
        return "Snow shower light";
      case 86:
        return "Snow shower heavy";
      default:
        return "Unknown Weather";
    }
  };

  return (
    <div className="weather">
      {weather.length > 0 ? (
        <>
          <div className="block" style={{ display: "flex" }}>
            <div style={{ whiteSpace: "nowrap" }}>
              <img
                src="./assets/icons/thermometer.png"
                alt="Thermometer"
                height="25px"
                width="25px"
              />
              <p>Temp: </p>{" "}
              <p
                style={{
                  border: "1px solid black",
                  borderRadius: "10px",
                  backgroundColor: "white",
                  padding: "10px",
                }}
              >
                {latestTemperature + "˚C"}
              </p>
            </div>
            <div style={{ whiteSpace: "nowrap" }}>
              <img
                src="./assets/icons/humidity.png"
                alt="Humidity"
                height="25px"
                width="25px"
              />{" "}
              <p>Humidity: </p>
              <p
                style={{
                  border: "1px solid black",
                  borderRadius: "10px",
                  backgroundColor: "white",
                  padding: "10px",
                }}
              >
                {latestHumidity + "%"}
              </p>
            </div>
            <div style={{ whiteSpace: "nowrap" }}>
              <img
                src="./assets/icons/warning.png"
                alt="Rain Risk"
                height="25px"
                width="25px"
              />
              <p>Rain risk: </p>
              <p
                style={{
                  border: "1px solid black",
                  borderRadius: "10px",
                  backgroundColor: "white",
                  padding: "10px",
                }}
              >
                {latestprecipitation_probability + "%"}
              </p>
            </div>
            <div style={{ whiteSpace: "nowrap" }}>
              <img
                src="./assets/icons/sun.png"
                alt="Weather"
                height="25px"
                width="25px"
              />{" "}
              <p>Weather: </p>{" "}
              <p
                style={{
                  border: "1px solid black",
                  borderRadius: "10px",
                  backgroundColor: "white",
                  padding: "10px",
                }}
              >
                {getWeatherDescription(latestweathercode)}
              </p>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
