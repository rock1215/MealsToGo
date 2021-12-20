import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { RestaurantNavigator } from "./restaurants.navigator";
import { MapScreen } from "../../features/map/screens/map.screen";

import { FavouritesContextProvider } from "../../services/favourites/favourites.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { RestaurantContextProvider } from "../../services/restaurants/restaurants.context";
import { SettingsNavigator } from "./settings.navigator";

const TAB_ICONS = {
  Restaurants: "md-restaurant",
  Map: "md-map",
  SettingsTab: "md-settings",
};

const tabBarIcon =
  (iconName) =>
  ({ size, color }) =>
    <Ionicons name={iconName} size={size} color={color} />;

const screenOptions = ({ route }) => {
  const iconName = TAB_ICONS[route.name];

  return {
    tabBarIcon: tabBarIcon(iconName),
    tabBarInactiveTintColor: "gray",
    tabBarActiveTintColor: "tomato",
    headerShown: false,
  };
};

const Tab = createBottomTabNavigator();

export const AppNavigator = () => (
  <FavouritesContextProvider>
    <LocationContextProvider>
      <RestaurantContextProvider>
        <Tab.Navigator screenOptions={screenOptions}>
          <Tab.Screen name="Restaurants" component={RestaurantNavigator} />
          <Tab.Screen name="Map" component={MapScreen} />
          <Tab.Screen name="SettingsTab" component={SettingsNavigator} />
        </Tab.Navigator>
      </RestaurantContextProvider>
    </LocationContextProvider>
  </FavouritesContextProvider>
);
