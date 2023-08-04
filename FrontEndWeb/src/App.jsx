
import React, {useState, useEffect}from "react";
import { createRoot } from "react-dom/client";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchPramas from "./SearchParams";
import Details from "./Details";
import AdoptedPetContext from "./AdoptedPetContext";
//Map-box
import Map from "./screens/Map";
import PoisMap from "./screens/PoisMap";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Weather from "./screens/Weather";

import fetchWeather from "./fetchweather";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPetHook = useState(null);


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
  const latestHumidity = weather.length > 0 ? weather[weather.length - 1].humidity : null;
  const latestprecipitation_probability = weather.length > 0 ? weather[weather.length - 1].precipitation_probability : null;
  const latestweathercode = weather.length > 0 ? weather[weather.length - 1].weathercode : null;
  
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
    <BrowserRouter>
      {/* <div>
        {" "}
        <Mapbox />{" "}
      </div> */}
      <QueryClientProvider client={queryClient}>
        <AdoptedPetContext.Provider value={adoptedPetHook}>
          <header>
            <Link to="/">
              <h1>Home</h1>
            </Link>
            <Link to="/">
              <h1>Discover</h1>
            </Link>
            <Link to="/PoisMap">
              <h1>POIs Map</h1>
            </Link>
            <Link to="/Map">
              <h1>Heat Map</h1>
            </Link>
            <Link to="/">
              <h1>Favorite</h1>
            </Link>
            <Link to="/Login">
              <h1>Sign up/in</h1>
            </Link>

            {/* <h1>weather block</h1>
            
            <Link to="/Weather">
              <h1>weather block</h1>
            </Link>*/}
            



          <div className="hello">
            {weather.length > 0 ? (
              <>
                <div className="info">
                  <p>Temp: </p>
                  <p id="number">{latestTemperature + "˚C"}</p>
                </div>
                <div className="info">
                  <p>Humidity: </p>
                  <p id="number">{latestHumidity + "%"}</p>
                </div>
                <div className="info" style={{ whiteSpace: "nowrap" }}>
                  <p>Rain risk: </p>
                  <p id="number">{latestprecipitation_probability + "%"}</p>
                </div>
                <div className="info" style={{ whiteSpace: "nowrap" }}>
                  <p>Weather: </p>
                  <p id="number">{getWeatherDescription(latestweathercode)}</p>
                </div>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>






          </header>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchPramas />} />
            <Route path="/Map" element={<Map />} />
            <Route path="/PoisMap" element={<PoisMap />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Weather" element={<Weather />} />
          </Routes>
        </AdoptedPetContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
