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
      
    
    return (
        <div>
          {weather.length > 0 ? (
            weather.map((weatherData) => (
            <h1>Latest Temperature: {weather[weather.length - 1].temperature}</h1>
            // <h1 key={weatherData.id}>Temperature: {weatherData.temperature}</h1>
            //  <div key={weatherData.id}><h1>Temperature: {weatherData[0].temperature}</h1></div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      );
      
}