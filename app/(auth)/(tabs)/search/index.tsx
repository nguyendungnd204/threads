import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Stack } from 'expo-router';
import SearchResult from '@/components/SearchResult';
import { Doc } from '@/convex/_generated/dataModel';
import { Colors } from '@/constants/Colors';

const index = () => {
  const [search, setSearch] = useState('');
  const userList = useQuery(api.users.searchUser, { search });

  return (
    <View className='flex-1'>
      <Stack.Screen options={{
        title: 'Search',
        headerTitle: (props) => (
          <View className='flex-1 flex-row'>
            <Text className='text-2xl font-bold'>{props.children}</Text>
          </View>
        ),
        headerStyle: { backgroundColor: 'white' },
        headerSearchBarOptions:{
          placeholder: 'Search',
          onChangeText: (event) => setSearch(event.nativeEvent.text),
          tintColor: 'black',
          autoFocus: true,
          hideWhenScrolling: false,
          barTintColor: 'white',
          textColor: 'black',
        }
      }}/>

      <FlatList
        data={userList}
        contentInsetAdjustmentBehavior='automatic'
        ItemSeparatorComponent={() => (
          <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: Colors.border}} />
        )}
        ListEmptyComponent={() => <Text className='text-base text-center mt-5'>No users found</Text>}
        renderItem={({ item }) => <SearchResult user={item as Doc<'users'>}/>} 
      />
    </View>
  )
}

export default index