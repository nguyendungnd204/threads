import { Slot, useNavigationContainerRef, useSegments, ErrorBoundary } from 'expo-router';
import {
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import './global.css';
import { AuthProvider } from '@/context/authContext';
import { Stack } from 'expo-router';

SplashScreen.preventAutoHideAsync();


const InitialLayout = () => {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return <Slot />;
};

const RootLayoutNav = () => {
  const ref = useNavigationContainerRef();

  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(public)/index" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
};

export default RootLayoutNav;
