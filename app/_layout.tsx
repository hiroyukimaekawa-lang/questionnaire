import '../global.css';

import { NotoSansJP_400Regular, NotoSansJP_700Bold, useFonts } from '@expo-google-fonts/noto-sans-jp';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    NotoSansJP: NotoSansJP_400Regular,
    NotoSansJP_Bold: NotoSansJP_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
