import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';

const Layout = () => {
  const router = useRouter();

  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: 'white' }, headerShadowVisible: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modal)/create"
        options={{
          presentation: 'modal',
          title: 'Thread mới',
          headerRight: () => (
            <TouchableOpacity >
              <Ionicons name="ellipsis-horizontal-circle" size={24} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};
export default Layout;
