// import fetch from "isomorphic-fetch";
import FormData from "form-data";
import { useState } from "react";
// import { useEffect, useState } from "react";
// import { useState, useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
// import fetchSearch from "../apis/fetchSearch";
// import Poi from "./Poi";
import Results from "../component/Results";
// import axios from "axios";
import fetch from "isomorphic-fetch";

const INTERESTS = ["POIs", "Events", "Restaurants", "Hotels"];
const categories = [
  "museum",
  "park",
  "attraction",
  "theatre",
  "zoo",
  "entertainment",
  "shopping",
  "gallery",
  "library",
];
// const zones = [];
async function fetchSearch({ queryKey }) {
  const { category } = queryKey[1];
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/POIs/tag/`);
    if (!response.ok) {
      throw new Error(`Fetching category URL not successful`);
    }
    const categoryData = await response.json();
    const categoryURL = categoryData[category];
    const res = await fetch(categoryURL);
    if (!res.ok) {
      throw new Error(`poi search not successful for category: ${category}`);
    }

    // return res.json();
    return res.json();
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
}

const SearchPramas = () => {
  const [requestParams, setRequesParams] = useState({
    category: "entertainment", // Set the default category to "attraction"
  });
  const [location, setLocation] = useState("");
  const [interests, setInterests] = useState("");
  // const [zone, setZone] = useState("");

  const results = useQuery(["search", requestParams], fetchSearch);
  // const pois = results?.data?.pets ?? [];
  const pois = results?.data ? results.data : [];
  // useEffect(() => {
  //   setRequesParams("attraction");
  // }, []);

  return (
    <div className="search-params">
      {/* <h2>{counter}</h2> */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            category: formData.get("category") || "", // Use '||' instead of '??'
          };
          setRequesParams(obj);
        }}
      >
        <label htmlFor="locatons">
          Location
          <input
            onChange={(e) => setLocation(e.target.value)}
            id="location"
            // name="location"
            value={location}
            placeholder="Location"
          />
        </label>
        <label htmlFor="interests">
          Interests
          <select
            id="interests"
            value={interests}
            // placeholder="Interests"
            onChange={(e) => {
              setInterests(e.target.value);
              // setCategory("");
            }}
          >
            <option />
            {INTERESTS.map((interests) => (
              <option key={interests}>{interests}</option>
            ))}
            ``
          </select>
        </label>
        <label htmlFor="category">
          Category
          <select
            id="category"
            // disabled={categories.length === 0} // no length, no show up
            name="category"
            // value={category}
            // placeholder="Category"
            // onChange={(e) => {
            //   setCategory(e.target.value);
            // }}
          >
            <option />
            {categories.map((category) => (
              <option key={category}> {category}</option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pois={pois} />
    </div>
  );
};

export default SearchPramas;
