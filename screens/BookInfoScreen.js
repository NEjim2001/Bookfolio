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
import DropdownMenu from '../components/DropdownMenu';

export default function BookInfoScreen(props) {
  const {volumeInfo, id, shelf} = props.route.params;
  const imageSize = 2.4;
  const navigation = useNavigation();

  const {isDarkMode} = useDarkMode();
  const checkDarkMode = isDarkMode ? 'white' : 'black';

  const [selectedShelf, setSelectedShelff] = useState(null);
  const [currentShelf, setShelf] = useState(null);

  const handleReadButton = async () => {
    try {
      await addBookToShelf(4, id);
      Alert.alert('Book added to "Read" section');
    } catch (error) {
      console.error('Error during Google Sign-In:', error);
    }
  };

  const handleAddBook = async () => {
    try {
      if (selectedShelf) await addBookToShelf(selectedShelf, id);
      Alert.alert('Book added to section');
    } catch (error) {
      console.error('Error adding book', error);
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
            <View>
              {shelf != 8 ? (
                <>
                  <View className="flex flex-row space-x-1 justify-between mb-2 w-full">
                    <TouchableOpacity
                      onPress={handleReadButton}
                      style={{borderColor: colors.main}}
                      className="w-1/2 border-2 py-2 items-center justify-center rounded-lg">
                      <CheckCircleIcon size={25} color={colors.main} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        handleTrashButton();
                      }}
                      style={{borderColor: colors.main}}
                      className="w-1/2 border-2 items-center justify-center rounded-lg">
                      <TrashIcon size={25} color={colors.main} />
                    </TouchableOpacity>
                  </View>

                  <View className="mb-4">
                    <TouchableOpacity
                      style={{backgroundColor: colors.main}}
                      className="w-full p-3 items-center rounded-lg"
                      onPress={handleNotesButton}>
                      <Text className="text-white font-semibold text-lg">
                        Notes
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <View className="flex-row justify-between">
                      <Text className="font-semibold text-gray-600">
                        {volumeInfo.authors[0]}
                      </Text>
                      <Text
                        style={{color: colors.main}}
                        className="font-semibold">
                        {volumeInfo.pageCount} Pages
                      </Text>
                    </View>

                    <View className="mb-4">
                      <Text
                        style={{color: checkDarkMode}}
                        className="italic h-full">
                        {volumeInfo.description}
                      </Text>
                    </View>
                  </View>
                </>
              ) : (
                <>
                  <View>
                    <View className="flex-row justify-between">
                      <Text className="font-semibold text-gray-600">
                        {volumeInfo.authors[0]}
                      </Text>
                      <Text
                        style={{color: colors.main}}
                        className="font-semibold">
                        {volumeInfo.pageCount} Pages
                      </Text>
                    </View>

                    <View className="mb-4  h-1/3">
                      <Text
                        style={{color: checkDarkMode}}
                        className="italic truncate">
                        {volumeInfo.description}
                      </Text>
                    </View>
                  </View>

                  <View>
                    <DropdownMenu
                      onSelectShelf={selectedShelf =>
                        setSelectedShelff(selectedShelf)
                      }
                    />
                    <TouchableOpacity
                      style={{backgroundColor: colors.main}}
                      className="w-full p-4 items-center rounded-lg"
                      onPress={handleAddBook}>
                      <Text
                        style={{color: 'white'}}
                        className="font-semibold text-lg">
                        Add to list
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
