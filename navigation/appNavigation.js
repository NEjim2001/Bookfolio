import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import BookInfoScreen from '../screens/BookInfoScreen';
import SearchInfoScreen from '../screens/SearchInfoScreen';
import BookCategoryScreen from '../screens/BookCategoryScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import NoteScreen from '../screens/NoteScreen';
import AddNoteScreen from '../screens/AddNoteScreen';
import EditNoteScreen from '../screens/EditNoteScreen';
import {useAuth} from '../theme/AuthContext';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const {user} = useAuth();

  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen
            options={{headerShown: false}}
            name="HomeScreen"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="SearchScreen"
            component={SearchScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="BookInfoScreen"
            component={BookInfoScreen}
          />
          <Stack.Screen
            options={{headerShown: false, presentation: 'transparentModal'}}
            name="SearchInfoScreen"
            component={SearchInfoScreen}
          />
          <Stack.Screen
            options={{
              headerShown: false,
              presentation: 'transparentModal',
            }}
            name="NoteScreen"
            component={NoteScreen}
          />
          <Stack.Screen
            options={{
              headerShown: false,
              presentation: 'transparentModal',
            }}
            name="EditNoteScreen"
            component={EditNoteScreen}
          />
          <Stack.Screen
            options={{
              headerShown: false,
              presentation: 'transparentModal',
            }}
            name="AddNoteScreen"
            component={AddNoteScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="BookCategoryScreen"
            component={BookCategoryScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="WelcomeScreen">
          <Stack.Screen
            options={{headerShown: false}}
            name="WelcomeScreen"
            component={WelcomeScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
