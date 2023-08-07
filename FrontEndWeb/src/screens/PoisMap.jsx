import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import axios from "axios";

// map center
const center = {
  lat: 40.76943354202675,
  lng: -73.989147061448,
};

export default function PoisMap() {

//check when pins are being loaded
const [isLoading, setIsLoading] = useState(true);
const [activeMarker, setActiveMarker] = useState(null);



  //pois' markers from db
  const [pois, setPois] = useState([]);
  useEffect(() => {
    fetchPois();
  }, []);

  const fetchPois = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/POIs/");
      // const pois = await res.json();
      
      setPois(res.data);
      setIsLoading(false);


    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY,
  });

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      {isLoading && (
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
          
        
        }}>
          <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>

            <img src="./assets/icons/giphy.gif" alt="Loading..." />
            <h1 style={{ color: "black", marginTop: "10px" }}>Loading...</h1>
            
          </div>
        </div>
      )}
      {!isLoading && isLoaded && (
        
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center}

          zoom={12}
        >
          {pois.map(({ id, name, coordinate }) => (
            <Marker
              key={id}
              position={{ lat: coordinate.latitude, lng: coordinate.longitude }}
              onClick={() => handleActiveMarker(id)}

            >
              {activeMarker === id && (

                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div>{name}</div>
                </InfoWindow>
              )}


            </Marker>
          ))}


        </GoogleMap>
      )}
    </div>
  );
}
