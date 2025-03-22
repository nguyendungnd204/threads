import { Stack } from 'expo-router';
import {Text, View} from 'react-native';

export default function Index() {
    console.log('Index');
    return (
        <View>
            <Stack.Screen name="(auth)" options={{headerShown: false}}/>
        </View>
    )
}