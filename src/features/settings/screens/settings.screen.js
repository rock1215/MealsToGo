import React, { useContext, useState, useCallback } from "react";

import { List } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import {
  AvatarContainer,
  AvatarIcon,
  AvatarImage,
  SettingsItem,
} from "../components/settings.styles";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";

export const SettingsScreen = ({ navigation }) => {
  const { onLogout, user } = useContext(AuthenticationContext);

  //   const getProfilePicture = async (currentUser) => {
  //     const photoUri = await AsyncStorage.getItem(`${currentUser.uid}-photo`);
  //     setPhoto(photoUri);
  //   };

  const getProfilePicture = async (currentUser) => {
    try {
      const photoUri = await AsyncStorage.getItem(`${currentUser.uid}-photo`);
      console.log(photoUri);
      if (photoUri !== null) {
        setPhoto(photoUri);
      }
    } catch (e) {
      console.log("error loading", e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getProfilePicture(user);
    }, [user])
  );

  const [photo, setPhoto] = useState(null);

  return (
    <SafeArea>
      <AvatarContainer>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Camera");
          }}
        >
          {!photo && <AvatarIcon icon="human" />}
          {photo && <AvatarImage source={{ uri: photo }} />}
        </TouchableOpacity>
        <Spacer position="top" size="large">
          {user && <Text variant="label">{user.email}</Text>}
        </Spacer>
      </AvatarContainer>
      <List.Section>
        <SettingsItem
          title="Favourites"
          description="View your favourites"
          left={(props) => <List.Icon {...props} color="black" icon="heart" />}
          onPress={() => navigation.navigate("Favourites")}
        />
        <SettingsItem
          title="Logout"
          description="View your favourites"
          left={(props) => <List.Icon {...props} color="black" icon="door" />}
          onPress={onLogout}
        />
      </List.Section>
    </SafeArea>
  );
};
