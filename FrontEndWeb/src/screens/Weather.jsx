import React, {useState, useEffect}from "react";
import fetchWeather from "../fetchweather";




export default function Weather() {
    const [weather, setWeather] = useState([]); // Set initial value as an empty array
  
    useEffect(() => {
      async function fetchWeatherData() {
        try {
          const data = await fetchWeather(); // Use the mock function for testing
          setWeather(data);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
      fetchWeatherData();
    }, []);
    
    // Get the latest temperature from the last element of the 'weather' array
    const latestTemperature = weather.length > 0 ? weather[weather.length - 1].temperature : null;
  
    return (
      <div>
        {weather.length > 0 ? (
          <h1>Latest Temperature: {latestTemperature}</h1>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }