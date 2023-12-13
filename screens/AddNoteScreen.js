import {View, Text, TouchableOpacity, Alert, TextInput} from 'react-native';
import React, {useState} from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import {useDarkMode} from '../theme/context';
import {colors} from '../theme';
import {useNavigation} from '@react-navigation/native';
import {ArrowLeftIcon, CheckCircleIcon} from 'react-native-heroicons/outline';
import {scale} from 'react-native-size-matters';
import {bookNotesRef} from '../config/firebase';
import {addDoc} from 'firebase/firestore';
import {useAuth} from '../theme/AuthContext';

export default function AddNoteScreen(props) {
  const navigation = useNavigation();
  const {user} = useAuth();
  const id = props.route.params;

  const {isDarkMode} = useDarkMode();

  const [noteTitle, setNoteTitle] = useState('yoo');
  const [noteBody, setNoteBody] = useState('yoo');

  const addNote = async () => {
    const newNote = {
      title: noteTitle,
      body: noteBody,
      bookID: id,
      userID: user.uid,
    };

    let doc = await addDoc(bookNotesRef, newNote);

    if (doc && doc.id) {
      navigation.goBack();
    }
    Alert.alert('Note Added');
  };

  return (
    <ScreenWrapper color={isDarkMode ? colors.darkBG : colors.mainBG}>
      <View className="mx-4">
        <View className="flex-row justify-between">
          <TouchableOpacity onPress={navigation.goBack}>
            <ArrowLeftIcon size={30} color={colors.main} />
          </TouchableOpacity>

          <Text
            style={{color: isDarkMode ? 'white' : 'black'}}
            className="text-2xl font-bold ">
            Notepad
          </Text>

          <TouchableOpacity onPress={addNote}>
            <CheckCircleIcon size={30} color={colors.main} />
          </TouchableOpacity>
        </View>
      </View>
      <View className="bg-yellow-200 p-4 mt-2 space-y-5">
        <View className="">
          <Text
            style={{
              fontSize: scale(25),
            }}
            className=" font-semibold">
            Title
          </Text>

          <TextInput
            onChangeText={value => setNoteTitle(value)}
            multiline={true}
            style={{
              fontSize: scale(15),
            }}
            className="w-full  p-3"
            placeholder={'New Note'}
          />
        </View>

        <View className="">
          <Text
            style={{
              fontSize: scale(25),
            }}
            className="font-semibold">
            Body
          </Text>

          <TextInput
            onChangeText={value => setNoteBody(value)}
            multiline={true}
            style={{
              fontSize: scale(15),
            }}
            className="w-full h-full p-3"
            placeholder={'New Note'}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}
