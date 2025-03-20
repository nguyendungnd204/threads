import { tokenCache } from '@/utils/cache'
import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo'
import { Slot, Stack } from 'expo-router'
import { useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
 } from '@expo-google-fonts/dm-sans'
import { useEffect } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import {ConvexReactClient} from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
})
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

if (!publishableKey) {
  throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env')
}

SplashScreen.preventAutoHideAsync()

const InitialLayout = () => {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold
  })

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded]) 
  return (
    <Slot />
  )
}

export default function RootLayout() {
 

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey!}>
      <ClerkLoaded>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <InitialLayout/>
        </ConvexProviderWithClerk>
      </ClerkLoaded>
    </ClerkProvider>
  )
}


