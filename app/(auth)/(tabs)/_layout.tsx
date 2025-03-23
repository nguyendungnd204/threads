import {Stack, Tabs, useRouter, } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@clerk/clerk-expo';
import { useRoute } from '@react-navigation/native';
import * as haptics from 'expo-haptics';

const CreateTabIcon = ({ color, size, focused } : {color: string, size: number, focused: boolean}) => {
  return (
    <View style={{
      backgroundColor: Colors.itemBackground,
      borderRadius: 8, 
      padding: 2, 
    }}>
      <Ionicons name='add' size={size} color={color} />
    </View>
  )
}

const Layout = () => {
  const { signOut } = useAuth();
  const router = useRouter();
  return (
    <Tabs 
    screenOptions={{
      tabBarShowLabel: true,
      tabBarActiveTintColor: '#000',
      tabBarInactiveTintColor: '#ccc',
      tabBarStyle: {
        backgroundColor: '#fff',
        borderTopColor: '#ccc',
        borderTopWidth: 1          
      }
    }}>
      <Tabs.Screen   
        name="feed" 
        options={{
        headerShown: false,
        title: 'Home',
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
        )
        }}/>
      <Tabs.Screen name="search" 
        options={{headerShown: false, 
          title: 'Search',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'search' : 'search-outline'} size={size} color={color} />
          )
        }}
        
      />
      <Tabs.Screen name='create' 
        options={{
          title: 'Create',
          tabBarIcon: ({ color, size, focused }) => (
            <CreateTabIcon color={color} size={size} focused={focused} />
          )
        }}
        listeners={{
          tabPress: (e: any) => {
            e.preventDefault();
            // haptics.selectionAsync();
            router.push('/(auth)/(modal)/create');
          }
        }}
      />
      <Tabs.Screen name="favorites" options={{
        title: 'Favorite',
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons name={focused ? 'heart' : 'heart-outline'} size={size} color={color} />
        )
      }}/>
      <Tabs.Screen name="profile" options={{headerShown: true
        ,title: 'Profile',
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} />
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => signOut()}>
              <Ionicons name={'log-out'} size={24} />
          </TouchableOpacity>
        ),
      }}/>
    </Tabs>
  )
}
export default Layout;