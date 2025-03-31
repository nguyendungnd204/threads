import { View, Text, Button, Image, TextInput, ScrollView } from 'react-native'
import React from 'react'
const index = () => {
  return (
    <View className='w-full'>
      <View className='flex-row justify-center items-center px-4 pt-4'>
        <Image source={require('@/assets/images/threads-logo-black.png')} alt='User Avatar' className='w-[70px] h-[70px] rounded-full' />
      </View>
      <View className='justify-center items-center mx-8 px-8'>
          <View className='flex-row items-center mr-4 '>
            <View>
              <Image source={require('@/assets/images/instagram_icon.webp')} alt='User Avatar' className='w-[42px] h-[42px] rounded-full' />
            </View>
            <View className='px-[12px] w-full mr-[24px]'>
              <Text className='font-bold text-[20px]'>Nguyễn Văn Dũng</Text>
              <Text className='rounded-[8px] h-auto w-full text-[16px]'>
                 Ngay lúc này Ngọc Kem livestream cùng Emma, Emma show vé đi xem phim với streamer V. ngày 10/3/2024 và cô là người phải trả tiền vé.
              </Text>
            </View>
          </View>
          <Image source={require('@/assets/images/image.png')} alt='User Avatar' className='w-[350px] h-[350px] mt-[16px]' />
          
      </View> 
      <View>
      </View>
    </View>
  ) 
}

export default index