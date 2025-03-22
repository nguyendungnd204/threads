
import { Stack } from 'expo-router'

const Layout = () => {
  console.log('hi feed')
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }}/>
    </Stack>
)
}

export default Layout