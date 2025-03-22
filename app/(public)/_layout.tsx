import {Stack} from 'expo-router'

const Layout = () => {
  console.log('Layout');
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }}/>
    </Stack>
  )
}
export default Layout;