import {View, Text, FlatList, TextInput, TouchableOpacity} from 'react-native';
import BookWithTitle from '../components/BookWithTitle';
import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  SunIcon,
} from 'react-native-heroicons/outline';
import {colors} from '../theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';
import {useDarkMode} from '../theme/context';
import {bookSearchByName} from '../api/googleBooks';
import EmptyList from '../components/EmptyList';
import {verticalScale} from 'react-native-size-matters';
import {useState} from 'react';

export default function SearchScreen() {
  const navigation = useNavigation();
  const imageSize = 1.7;

  const {isDarkMode, toggleDarkMode} = useDarkMode();

  const toggleNightMode = () => {
    toggleDarkMode();
  };

  const [searchText, setSearchText] = useState('');
  const [bookSearched, setBookSearched] = useState({items: []});

  const onSearchSubmit = async () => {
    bookSearchByName(searchText).then(data => {
      setBookSearched(data);
    });
  };
  return (
    <ScreenWrapper color={isDarkMode ? colors.darkBG : colors.mainBG}>
      <View className="space-y-4 mx-4">
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row space-x-5">
            <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
              <ArrowLeftIcon size={30} color={isDarkMode ? 'white' : 'black'} />
            </TouchableOpacity>
          </View>
          <View className="items-center">
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-2xl font-bold ">
              Search Books
            </Text>
            <Text style={{color: isDarkMode ? 'white' : 'black'}}>
              Find the book of your dreams
            </Text>
          </View>
          <TouchableOpacity onPress={toggleNightMode}>
            {isDarkMode ? (
              <SunIcon size={30} color={'white'} />
            ) : (
              <MoonIcon size={30} color={'black'} />
            )}
          </TouchableOpacity>
        </View>

        <View className="flex-row ">
          <TextInput
            autoCorrect={false}
            onChangeText={value => setSearchText(value)}
            style={{
              height: hp(6),
              backgroundColor: isDarkMode ? 'black' : 'white',
              color: isDarkMode ? 'white' : 'black',
            }}
            className="w-full p-3"
            placeholder={'Search'}
          />
          <TouchableOpacity
            onPress={searchText.length > 0 ? onSearchSubmit : null}
            style={{backgroundColor: colors.main, height: hp(6), width: wp(15)}}
            className="right-0 absolute items-center justify-center">
            <MagnifyingGlassIcon size={30} color={'white'} />
          </TouchableOpacity>
        </View>

        <View className="" style={{height: verticalScale(520)}}>
          <FlatList
            data={bookSearched.items}
            ListEmptyComponent={<EmptyList message={'Add a search result'} />}
            showsVerticalScrollIndicator={false}
            numColumns={3}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <View className="mb-6">
                <BookWithTitle
                  footer={true}
                  color={isDarkMode ? 'white' : 'black'}
                  size={imageSize}
                  navigationLocation={'SearchInfoScreen'}
                  data={item ? item : null}
                />
              </View>
            )}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}
