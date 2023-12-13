import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import {useEffect, useState} from 'react';

import {colors} from '../theme';
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  TrashIcon,
} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import {useDarkMode} from '../theme/context';
import ScreenWrapper from '../components/ScreenWrapper';
import {addBookToShelf, removeBookFromShelf} from '../api/googleBooks';
import FastImage from 'react-native-fast-image';

export default function BookInfoScreen(props) {
  const {volumeInfo, id, shelf} = props.route.params;
  const imageSize = 2.4;
  const navigation = useNavigation();

  const {isDarkMode} = useDarkMode();
  const checkDarkMode = isDarkMode ? 'white' : 'black';

  const [currentShelf, setShelf] = useState(null);

  const handleReadButton = async () => {
    try {
      await addBookToShelf(4, id);
      Alert.alert('Book added to "Read" section');
    } catch (error) {
      console.error('Error during Google Sign-In:', error);
    }
  };

  const handleTrashButton = async () => {
    try {
      Alert.alert('Deleting Item', 'Are you Sure?', [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'destructive',
        },
        {
          text: 'Delete',
          onPress: async () => {
            await removeBookFromShelf(currentShelf, id);
            Alert.alert('Book removed from current shelf');
          },
          style: 'destructive',
        },
      ]);
    } catch (error) {
      console.error('Error during Google Sign-In:', error);
    }
  };

  const handleNotesButton = async () => {
    navigation.navigate('NoteScreen', {volumeInfo, id});
  };

  useEffect(() => {
    setShelf(shelf);
  }, []);

  return (
    <ScreenWrapper color={isDarkMode ? colors.darkBG : 'white'}>
      <View className="mx-4">
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
              className="text-lg font-bold text-center truncate">
              {volumeInfo.title}
            </Text>
          </View>

          <View>
            <View className="flex-row space-x-3 justify-between mb-2 ">
              <TouchableOpacity
                onPress={handleReadButton}
                style={{borderColor: colors.main}}
                className="px-16 border-2 items-center justify-center rounded-lg">
                <CheckCircleIcon size={25} color={colors.main} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleTrashButton();
                }}
                style={{borderColor: colors.main}}
                className="px-16 py-1  border-2 items-center justify-center rounded-lg">
                <TrashIcon size={25} color={colors.main} />
              </TouchableOpacity>
            </View>

            <View className="mb-4">
              <TouchableOpacity
                style={{backgroundColor: colors.main}}
                className="w-full p-3 items-center rounded-lg"
                onPress={handleNotesButton}>
                <Text className="text-white font-semibold text-lg">Notes</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-between">
              <Text className="font-semibold text-gray-600">
                {volumeInfo.authors[0]}
              </Text>
              <Text style={{color: colors.main}} className="font-semibold">
                {volumeInfo.pageCount} Pages
              </Text>
            </View>
          </View>

          <View className="mb-4">
            <Text style={{color: checkDarkMode}} className="italic h-full">
              {volumeInfo.description}
            </Text>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
