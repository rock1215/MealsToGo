import React, { useState, createContext, useEffect, useContext } from "react";
import { LocationContext } from "../location/location.context";
import { restaurantTransform, restaurantsRequest } from "./restaurants.service";

export const RestaurantContext = createContext();

export const RestaurantContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { location } = useContext(LocationContext);

  const retriveRestaurants = (loc) => {
    setRestaurants([]);
    setIsLoading(true);
    restaurantsRequest(loc)
      .then(restaurantTransform)
      .then((results) => {
        setIsLoading(false);
        setRestaurants(results);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  };

  useEffect(() => {
    if (!location) {
      return;
    }
    const locationString = `${location.lat},${location.lng}`;
    retriveRestaurants(locationString);
  }, [location]);

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        isLoading,
        error,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};
