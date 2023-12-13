import {View, Text, TouchableOpacity, Alert, FlatList} from 'react-native';
import {useEffect, useState} from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import {useDarkMode} from '../theme/context';
import {colors} from '../theme';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {ArrowLeftIcon, PencilSquareIcon} from 'react-native-heroicons/outline';
import EmptyList from '../components/EmptyList';
import {getDocs, query, where} from 'firebase/firestore';
import {bookNotesRef} from '../config/firebase';
import {useAuth} from '../theme/AuthContext';

export default function NoteScreen(props) {
  const {volumeInfo, id} = props.route.params;

  const navigation = useNavigation();
  const {user} = useAuth();

  const {isDarkMode} = useDarkMode();
  const isFocused = useIsFocused();

  const [noteData, setNoteData] = useState([]);

  const fetchBookNotes = async () => {
    try {
      let data = [];
      const q = query(
        bookNotesRef,
        where('userID', '==', user.uid),
        where('bookID', '==', id),
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });

      setNoteData(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isFocused) {
      // Fetch data when the component becomes focused
      fetchBookNotes();
      console.log('Fetching Book Notes..');
    }
  }, [isFocused]);

  const addNote = () => {
    navigation.navigate('AddNoteScreen', id);
  };

  return (
    <ScreenWrapper color={isDarkMode ? colors.darkBG : colors.mainBG}>
      <View className="mx-4 space-y-2">
        <View className="flex-row justify-between">
          <TouchableOpacity onPress={navigation.goBack}>
            <ArrowLeftIcon size={30} color={colors.main} />
          </TouchableOpacity>

          <Text
            style={{color: isDarkMode ? 'white' : 'black'}}
            className="text-2xl font-bold ">
            Notes
          </Text>

          <TouchableOpacity onPress={addNote}>
            <PencilSquareIcon size={30} color={colors.main} />
          </TouchableOpacity>
        </View>

        <Text
          style={{color: isDarkMode ? 'white' : 'black'}}
          className="items-center justify-center text-center">
          {volumeInfo.title}
        </Text>
        <View className="h-full ">
          <FlatList
            data={noteData}
            ListEmptyComponent={
              <EmptyList message="There are no notes in this book!" />
            }
            contentContainerStyle={{gap: 13}}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('EditNoteScreen', {
                    title: item.title,
                    body: item.body,
                    id: id,
                  });
                }}
                className="p-4 bg-gray-200 rounded-3xl">
                <View className="space-y-2">
                  <Text className="font-bold capitalize">{item.title}</Text>
                  <Text>{item.body}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}
