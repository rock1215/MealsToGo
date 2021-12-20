import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { initializeApp } from "firebase/app";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme";
import { Navigator } from "./src/infrastructure/navigation";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";

const firebaseConfig = {
  apiKey: "AIzaSyAQlaGe2pi_ypfufAA_DWGnFyubrys16aM",
  authDomain: "mealstogo-ec645.firebaseapp.com",
  projectId: "mealstogo-ec645",
  storageBucket: "mealstogo-ec645.appspot.com",
  messagingSenderId: "663586741903",
  appId: "1:663586741903:web:ab2d5fce89913fc877dafa",
};

initializeApp(firebaseConfig);

export default function App() {
  const [oswaldLoaded] = useOswald({ Oswald_400Regular });
  const [latoLoaded] = useLato({ Lato_400Regular });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigator />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
