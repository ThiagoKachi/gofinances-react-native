import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';

import theme from './src/global/styles/theme';

import { Routes } from './src/routes';

import { AuthProvider, useAuth } from './src/hooks/Auth';

export default function App() {
  const { userStorageLoading } = useAuth();

  SplashScreen.preventAutoHideAsync();
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold
  });

  if (!fontsLoaded || userStorageLoading) {
    return null;
  }

  SplashScreen.hideAsync(); 

  return (
    <ThemeProvider theme={theme}>
        <StatusBar barStyle="light-content" />

        <AuthProvider>
          <Routes />
        </AuthProvider>
    </ThemeProvider>
  );
}
