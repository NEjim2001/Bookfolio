import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import {colors} from '../theme';
import {ArrowLeftIcon} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';
import {useDarkMode} from '../theme/context';
import {addBookToShelf} from '../api/googleBooks';
import DropdownMenu from '../components/DropdownMenu';
import FastImage from 'react-native-fast-image';

export default function SearchInfoScreen(props) {
  const navigation = useNavigation();
  const {volumeInfo, id} = props.route.params;
  const imageSize = 3.5;

  const [shelf, setShelf] = useState(null);

  const {isDarkMode} = useDarkMode();
  const checkDarkMode = isDarkMode ? 'white' : 'black';

  const handleAddBook = async () => {
    try {
      if (shelf) await addBookToShelf(shelf, id);
    } catch (error) {
      console.error('Error during Google Sign-In:', error);
    }
  };

  return (
    <ScreenWrapper color={isDarkMode ? colors.darkBG : colors.mainBG}>
      <View className=" mx-4">
        <View className="justify-between flex-row">
          <TouchableOpacity className="mb-8" onPress={navigation.goBack}>
            <ArrowLeftIcon size={30} color={colors.main} />
          </TouchableOpacity>
        </View>

        <View className="space-y-2">
          <View className="items-center">
            <FastImage
              className="mb-2"
              style={{width: 60 * imageSize, height: 98 * imageSize}}
              source={{
                uri: `https://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`,
              }}
              resizeMode={FastImage.resizeMode.stretch}
            />
            <Text
              style={{color: checkDarkMode}}
              className="text-lg font-bold text-center truncate mb-2">
              {volumeInfo?.title}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="font-semibold text-gray-600">
              {volumeInfo?.authors[0]}
            </Text>
            <Text style={{color: colors.main}} className="font-semibold">
              {volumeInfo?.pageCount} Pages
            </Text>
          </View>

          <View className="mb-4">
            <Text style={{color: checkDarkMode}} className=" italic h-14">
              {volumeInfo?.description}
            </Text>
          </View>

          <View className="">
            <View style={{padding: 16}}>
              <DropdownMenu
                onSelectShelf={selectedShelf => setShelf(selectedShelf)}
              />
            </View>
            <TouchableOpacity
              style={{backgroundColor: colors.main}}
              className="w-full p-4 items-center rounded-lg"
              onPress={handleAddBook}>
              <Text style={{color: 'white'}} className="font-semibold">
                Add to list{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
