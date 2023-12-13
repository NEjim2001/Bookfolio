import {View, Text, FlatList, TextInput, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import BookWithTitle from '../components/BookWithTitle';
import {ArrowLeftIcon} from 'react-native-heroicons/outline';
import {colors} from '../theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';
import {useDarkMode} from '../theme/context';

export default function BookCategoryScreen(props) {
  const {items, shelf} = props.route.params;
  const navigation = useNavigation();
  const imageSize = 1.7;

  const {isDarkMode} = useDarkMode();

  const [searchText, setSearchText] = useState('');
  const [categoryData, setCategoryData] = useState({items: []});

  const handleSearch = items => {
    const filteredItems = items.filter(item =>
      item?.volumeInfo?.title.toLowerCase().includes(searchText.toLowerCase()),
    );
    setCategoryData(filteredItems);
  };

  useEffect(() => {
    setCategoryData(items);
    handleSearch(items);
  }, [searchText, items]);

  return (
    <ScreenWrapper color={isDarkMode ? colors.darkBG : colors.mainBG}>
      <View className="space-y-3 mx-6">
        <View className="flex-row items-center space-x-20">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeftIcon size={30} color={isDarkMode ? 'white' : 'black'} />
          </TouchableOpacity>

          <View className="items-center">
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-2xl font-bold">
              Library
            </Text>
            <Text style={{color: isDarkMode ? 'white' : 'black'}}>
              Browse your catalog
            </Text>
          </View>
        </View>

        <View className="flex-row ">
          <TextInput
            onChangeText={value => setSearchText(value)}
            style={{
              height: hp(6),
              backgroundColor: isDarkMode ? 'black' : 'white',
              color: isDarkMode ? 'white' : 'black',
            }}
            className="w-full p-3"
            placeholder={'Search'}
          />
        </View>

        <View className="flex-row items-center justify-end">
          <Text className="text-xs text-gray-400">
            {categoryData.length} BOOKS
          </Text>
        </View>

        <View style={{height: hp(73)}}>
          <FlatList
            data={categoryData}
            showsVerticalScrollIndicator={false}
            numColumns={3}
            columnWrapperStyle={{justifyContent: 'space-around'}}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <View className="mb-6">
                <BookWithTitle
                  shelf={shelf}
                  footer={true}
                  color={isDarkMode ? 'white' : 'black'}
                  size={imageSize}
                  navigationLocation={'BookInfoScreen'}
                  data={item}
                />
              </View>
            )}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}
