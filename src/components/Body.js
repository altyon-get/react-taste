import { useEffect, useState } from "react";
import { RestrauntList, URL } from "../constants";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./shimmer";

const Body = () => {
  const searchTxt = "KFC";
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getAllRestaurants();
  }, []);

  async function getAllRestaurants() {
    const data = await fetch(URL);
    const json = await data.json();
    console.log(json);
    const restaurants =
      json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;
    setAllRestaurants(restaurants);
    setFilteredRestaurants(restaurants);
  }

  function filterData(searchInput,restaurants) {
    console.log(searchInput, " -inp");
    console.log(restaurants, " -restaurants");
    const data = restaurants.filter((restaurant) =>
      restaurant?.info?.name?.includes(searchInput.toLowerCase())
    );
    console.log(data, " -filterd data");
    return data;
  }

  console.log("render");
  if (allRestaurants.length == 0) return <>allRestaurants empty, getting all</>;

  // return (filteredRestaurants.length==0)? <Shimmer/>:(
  return (
    <>
      <div className="search-container">
        <input
          type="text"
          className="search-box"
          placeholder="Search"
          value={searchInput}
          //e.target.value= whatever u write in input
          onChange={(e) => {
            // console.log(e.target.value);
            setSearchInput(e.target.value);
          }}
        ></input>
        <button
          className="btn"
          onClick={() => {
            console.log("clicked");
            const data = filterData(searchInput,allRestaurants);
            setFilteredRestaurants(data);
          }}
        >
          Search
        </button>
      </div>
      {filteredRestaurants.length == 0 ? (
        <>Nothing found</>
      ) : (
        <div className="restaurant-list">
          {filteredRestaurants.map((restaurant) => {
            return (
              <RestaurantCard {...restaurant.info} key={restaurant.info.id} />
            );
          })}
        </div>
      )}
    </>
  );
};

export default Body;
