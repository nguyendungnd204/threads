import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import { Stack } from 'expo-router'
import React from 'react'



const ThreadComposer = () => {
  return (
    <View className='flex-1 bg-white h-full justify-between'>
      
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity className='ml-4' onPress={() => { }}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          )
        }}
      />


      <View className='border-b border-b-[#E7E7E7] items-start'>
        <View className='flex-row items-center px-4 pt-4'>
          <View>
            <Image source={require('@/assets/images/instagram_icon.webp')} alt='User Avatar' className='w-[42px] h-[42px] rounded-full' />
          </View>
          <View className='px-[12px] w-full mr-[20px]'>
            <Text className='font-bold text-[20px]'>Nguyễn Văn Dũng</Text>
            <TextInput className='rounded-[8px] h-[50px] w-full pl-2 text-[16px]' placeholder='Có gì mới?' />
          </View>
        </View>
        <View className='flex-row items-center p-4'>
          <View className='flex-row items-center w-full pl-[50px]'>
            <Image source={require('@/assets/images/image-gallery.png')} alt='Gallery' className='w-[25px] h-[25px] mr-[12px]' />
            <Image source={require('@/assets/images/camera.png')} alt='Camera' className='w-[25px] h-[25px] mr-[12px]' />
            <Image source={require('@/assets/images/microphone.png')} alt='Microphone' className='w-[25px] h-[25px] mr-[12px]' />
            <Image source={require('@/assets/images/smile.png')} alt='Smile' className='w-[25px] h-[25px]' />
          </View>
        </View>
      </View>

      <View className='p-4 flex-row items-center'>
        <Text className='text-[16px] text-gray-600'>Bất kỳ ai cũng có thể trả lời và trích dẫn.</Text>
        <TouchableOpacity className='bg-[#000] rounded-[20px] h-[50px] w-[80px] ml-auto justify-center items-center'>
          <Text className='text-white font-bold text-[16px]'>Đăng</Text>
        </TouchableOpacity>
      </View>
    </View>

  )
}

export default ThreadComposer