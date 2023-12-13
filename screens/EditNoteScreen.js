import {View, Text, TouchableOpacity, Alert, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import {useDarkMode} from '../theme/context';
import {colors} from '../theme';
import {useNavigation} from '@react-navigation/native';
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  TrashIcon,
} from 'react-native-heroicons/outline';
import {scale} from 'react-native-size-matters';
import {bookNotesRef} from '../config/firebase';
import {deleteDoc, getDocs, query, updateDoc, where} from 'firebase/firestore';

export default function EditNoteScreen(props) {
  const navigation = useNavigation();
  const {body, title, id} = props.route.params;

  const {isDarkMode} = useDarkMode();

  const [newNoteTitle, setNoteTitle] = useState('yoo');
  const [newNoteBody, setNoteBody] = useState('yoo');

  const updateNote = async () => {
    try {
      const q = query(bookNotesRef, where('bookID', '==', id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;

        if (newNoteBody.length == 0 && newNoteTitle.length == 0) {
          Alert.alert('Deleting Item', 'Are you Sure?', [
            {
              text: 'Cancel',
              onPress: () => {},
              style: 'destructive',
            },
            {
              text: 'Delete',
              onPress: async () => {
                await deleteDoc(docRef);
                navigation.goBack();
              },
              style: 'destructive',
            },
          ]);
        } else if (newNoteBody.length > 0) {
          await updateDoc(docRef, {
            title: newNoteTitle,
            body: newNoteBody,
          });
          Alert.alert('Note Saved');

          navigation.goBack();
        } else {
          console.log('Invalid input');
        }
      }
    } catch (error) {
      console.error('Error updating/deleting document:', error);
    }
  };

  const deleteNote = async () => {
    try {
      const q = query(bookNotesRef, where('bookID', '==', id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;

        Alert.alert('Deleting Item', 'Are you Sure?', [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'destructive',
          },
          {
            text: 'Delete',
            onPress: async () => {
              await deleteDoc(docRef);
              navigation.goBack();
            },
            style: 'destructive',
          },
        ]);
      }
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  useEffect(() => {
    setNoteTitle(title);
    setNoteBody(body);
  }, []);

  return (
    <ScreenWrapper color={isDarkMode ? colors.darkBG : colors.mainBG}>
      <View className="mx-4">
        <View className="flex-row justify-between">
          <TouchableOpacity onPress={navigation.goBack}>
            <ArrowLeftIcon size={30} color={colors.main} />
          </TouchableOpacity>
          <Text
            style={{color: isDarkMode ? 'white' : 'black'}}
            className="absolute left-[130] text-2xl font-bold ">
            Notepad
          </Text>
          <View className="flex-row space-x-4">
            <TouchableOpacity onPress={deleteNote}>
              <TrashIcon size={30} color={colors.main} />
            </TouchableOpacity>
            <TouchableOpacity onPress={updateNote}>
              <CheckCircleIcon size={30} color={colors.main} />
            </TouchableOpacity>
          </View>
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
            value={newNoteTitle}
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
            value={newNoteBody}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}
