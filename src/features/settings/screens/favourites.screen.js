import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";

import { FavouritesContext } from "../../../services/favourites/favourites.context";
import { EmptyFavouritesArea } from "../components/favourites.styles";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { RestaurantList } from "../../restaurants/components/restaurant-list.styles";
import { Spacer } from "../../../components/spacer/spacer.component";
import { RestaurantInfoCard } from "../../restaurants/components/restaurant-info-card.component";

export const FavouritesScreen = ({ navigation }) => {
  const { favourites } = useContext(FavouritesContext);
  return favourites.length ? (
    <SafeArea>
      <RestaurantList
        data={favourites}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("RestaurantDetail", { restaurant: item });
            }}
          >
            <Spacer position="bottom" size="large">
              <RestaurantInfoCard restaurant={item} />
            </Spacer>
          </TouchableOpacity>
        )}
        keyExtractor={(obj) => obj.name}
      />
    </SafeArea>
  ) : (
    <EmptyFavouritesArea>
      <Text variant="label">No Favourites Yet</Text>
    </EmptyFavouritesArea>
  );
};
