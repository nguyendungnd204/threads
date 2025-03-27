import { Colors } from '@/constants/Colors';
import { Doc } from '@/convex/_generated/dataModel';
import { View, Text, Image, TouchableOpacity } from 'react-native';


type SearchResultPops ={
    user: Doc<'users'>,
}
const SearchResult = ({ user }: SearchResultPops) => {
    return(
        <View className='flex-row items-center px-4 py-4'>
            <Image source={{ uri: user.imageUrl }} className='w-10 h-10 rounded-full'/> 
            <View className='flex-1 gap-1 ml-4' >
                <Text className='text-sm font-bold'>{user.first_name} {user.last_name}</Text>
                <Text className='text-sm text-gray-500'>@{user.username}</Text>
                <Text className='text-sm'>{user.followersCount} followers</Text>
            </View>
            <TouchableOpacity className='py-2 px-6 rounded-lg border border-gray-300'>
                <Text className='font-bold'>Follow</Text>
            </TouchableOpacity>
           
        </View>
    );
};


export default SearchResult;