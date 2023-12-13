import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  MagnifyingGlassIcon,
  RectangleStackIcon,
  MoonIcon,
  SunIcon,
  ArrowLeftOnRectangleIcon,
} from 'react-native-heroicons/outline';
import {colors} from '../theme';
import BookWithTitle from '../components/BookWithTitle';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {dummyBookShelfData} from '../constants';
import ScreenWrapper from '../components/ScreenWrapper';
import {useDarkMode} from '../theme/context';
import {getUserBookShelf} from '../api/googleBooks';
import EmptyList from '../components/EmptyList';
import {useAuth} from '../theme/AuthContext';
import {useEffect, useState} from 'react';
import {getDocs, query, where} from 'firebase/firestore';
import {bookNotesRef} from '../config/firebase';
import {verticalScale} from 'react-native-size-matters';

export default function HomeScreen() {
  const navigation = useNavigation();
  const imageSize = 1.8;

  const {user, signOutUser} = useAuth();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);

  const {isDarkMode, toggleDarkMode} = useDarkMode();
  const toggleNightMode = () => {
    toggleDarkMode();
  };

  const [favoriteCategory, setFavoriteCategory] = useState({items: []}); // 0
  const [toReadCategory, setToReadCategory] = useState({items: []}); // 2
  const [haveReadCategory, setHaveReadCategory] = useState({items: []}); // 4
  const [booksForYouCategory, setBooksForYouCategory] = useState({items: []}); // 8
  const [firstBook, setFirstBook] = useState();

  const [noteData, setNoteData] = useState(new Set());
  const fetchBookNotes = async () => {
    try {
      let data = [];
      const q = query(bookNotesRef, where('userID', '==', user.uid));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });

      setNoteData(new Set(data.map(item => item.bookID)));
    } catch (err) {
      console.error(err);
    }
  };
  const fetchBookData = async () => {
    try {
      setLoading(true);
      const readingNowData = await getUserBookShelf(3); // 3
      setFavoriteCategory(await getUserBookShelf(0)); // 0
      setToReadCategory(await getUserBookShelf(2)); // 2
      setHaveReadCategory(await getUserBookShelf(4)); // 4
      setBooksForYouCategory(await getUserBookShelf(8)); // 8

      //Sets Reading Now Book Data
      if (readingNowData.items.length > 0) {
        setFirstBook(readingNowData.items[0]);
      } else {
        setFirstBook(null);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Fetching Books and Notes... ');
    if (isFocused) {
      fetchBookNotes();
      fetchBookData();
    }
  }, [isFocused]);

  // useEffect(() => {
  //   setFavoriteCategory(dummyBookShelfData);
  //   setToReadCategory(dummyBookShelfData);
  //   setReadingNowCategory(dummyBookShelfData);
  //   setHaveReadCategory(dummyBookShelfData);
  //   setBooksForYouCategory(dummyBookShelfData);
  // }, []);

  return (
    <ScreenWrapper color={isDarkMode ? colors.darkBG : colors.mainBG}>
      <SafeAreaView className={'space-y-3 mx-4'}>
        <View className="w-full flex-row justify-between ">
          <View className="flex-row space-x-2 ">
            <RectangleStackIcon
              size={30}
              color={isDarkMode ? 'white' : 'black'}
            />
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-2xl font-bold ">
              Bookfolio
            </Text>
          </View>

          <View className="flex-row space-x-4">
            <TouchableOpacity onPress={toggleNightMode}>
              {isDarkMode ? (
                <SunIcon size={30} color={'white'} />
              ) : (
                <MoonIcon size={30} color={'black'} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('SearchScreen')}>
              <MagnifyingGlassIcon
                size={30}
                color={isDarkMode ? 'white' : 'black'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                signOutUser();
              }}>
              <ArrowLeftOnRectangleIcon
                size={30}
                color={isDarkMode ? 'white' : 'black'}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View className="">
          <View className="flex-row space-x-5">
            {firstBook ? (
              <BookWithTitle
                shelf={3}
                color={isDarkMode ? 'white' : 'black'}
                size={imageSize}
                data={firstBook}
                navigationLocation="BookInfoScreen"
              />
            ) : (
              <View></View>
            )}

            <View className="w-56">
              <Text
                style={{color: isDarkMode ? 'white' : 'black'}}
                className="font-medium text-md ">
                Reading Now
              </Text>

              <Text
                style={{color: isDarkMode ? 'white' : 'black'}}
                className="font-bold text-2xl ">
                {firstBook?.volumeInfo?.title}
              </Text>

              <Text className="font-medium text-gray-600 mb-10 ">
                {firstBook?.volumeInfo?.authors[0]}
              </Text>

              <Text style={{color: colors.main}}>
                {firstBook?.volumeInfo?.pageCount} Pages
              </Text>
            </View>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{height: verticalScale(450)}}>
          {/* FAVORITE CATEGORY */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('BookCategoryScreen', {
                items: favoriteCategory.items,
                shelf: 0,
              })
            }
            className="flex-row justify-between items-center">
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="font-bold text-2xl mb-2 ">
              Favorite
            </Text>
            {favoriteCategory.items && (
              <Text style={{color: colors.main}}>
                ({favoriteCategory.items.length} items)
              </Text>
            )}
          </TouchableOpacity>

          <FlatList
            data={favoriteCategory.items}
            horizontal={true}
            ListEmptyComponent={
              <EmptyList message={'No Books in the Category'} />
            }
            contentContainerStyle={{gap: 13}}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <View>
                {item && item.volumeInfo && (
                  <BookWithTitle
                    shelf={0}
                    footer={true}
                    noteBadge={noteData.has(item.id) ? true : false}
                    color={isDarkMode ? 'white' : 'black'}
                    size={imageSize}
                    data={item}
                    navigationLocation="BookInfoScreen"
                  />
                )}
              </View>
            )}
          />

          {/* HAVE READ CATEGORY */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('BookCategoryScreen', {
                items: haveReadCategory.items,
                shelf: 4,
              })
            }
            className="flex-row justify-between items-center">
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="font-bold text-2xl mb-2 ">
              Have Read
            </Text>
            {haveReadCategory.items && (
              <Text style={{color: colors.main}}>
                ({haveReadCategory.items.length} items)
              </Text>
            )}
          </TouchableOpacity>

          <FlatList
            data={haveReadCategory.items}
            horizontal={true}
            ListEmptyComponent={
              <EmptyList message={'No Books in the Category'} />
            }
            contentContainerStyle={{gap: 13}}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <View>
                {item && item.volumeInfo && (
                  <BookWithTitle
                    shelf={4}
                    footer={true}
                    noteBadge={noteData.has(item.id) ? true : false}
                    color={isDarkMode ? 'white' : 'black'}
                    size={imageSize}
                    data={item}
                    navigationLocation="BookInfoScreen"
                  />
                )}
              </View>
            )}
          />

          {/* TO READ CATEGORY */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('BookCategoryScreen', {
                items: toReadCategory.items,
                shelf: 2,
              })
            }
            className="flex-row justify-between items-center">
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="font-bold text-2xl mb-2 ">
              To Read
            </Text>
            {toReadCategory.items && (
              <Text style={{color: colors.main}}>
                ({toReadCategory.items.length} items)
              </Text>
            )}
          </TouchableOpacity>

          <FlatList
            data={toReadCategory.items}
            ListEmptyComponent={
              <EmptyList message={'No Books in the Category'} />
            }
            horizontal={true}
            contentContainerStyle={{gap: 13}}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <View>
                {item && item.volumeInfo && (
                  <BookWithTitle
                    shelf={2}
                    footer={true}
                    noteBadge={noteData.has(item.id) ? true : false}
                    color={isDarkMode ? 'white' : 'black'}
                    size={imageSize}
                    data={item}
                    navigationLocation="BookInfoScreen"
                  />
                )}
              </View>
            )}
          />

          {/* BOOKS FOR YOU CATEGORY */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('BookCategoryScreen', {
                items: booksForYouCategory.items,
                shelf: 8,
              })
            }
            className="flex-row justify-between items-center">
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="font-bold text-2xl mb-2 ">
              Books for you
            </Text>
            {booksForYouCategory.items && (
              <Text style={{color: colors.main}}>
                ({booksForYouCategory.items.length} items)
              </Text>
            )}
          </TouchableOpacity>

          <FlatList
            data={booksForYouCategory.items}
            horizontal={true}
            ListEmptyComponent={
              <EmptyList message={'No Books in the Category'} />
            }
            contentContainerStyle={{gap: 13}}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <View>
                {item && item.volumeInfo && (
                  <BookWithTitle
                    shelf={8}
                    footer={true}
                    noteBadge={noteData.has(item.id) ? true : false}
                    color={isDarkMode ? 'white' : 'black'}
                    size={imageSize}
                    data={item}
                    navigationLocation="BookInfoScreen"
                  />
                )}
              </View>
            )}
          />
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
}
