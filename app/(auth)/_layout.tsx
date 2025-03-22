import {Stack} from 'expo-router'

const Layout = () => {
  console.log('hi auth')
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
    </Stack>
  )
}
export default Layout;