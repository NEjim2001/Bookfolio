import {View, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ScreenWrapper from '../components/ScreenWrapper';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useAuth} from '../theme/AuthContext';
import FastImage from 'react-native-fast-image';

import {Image} from 'react-native-svg';
import {scale, verticalScale} from 'react-native-size-matters';
import {colors} from '../theme';

GoogleSignin.configure({
  webClientId:
    '480012670174-f1pjhar1jm8o9h4lq7thvev01e57i4vh.apps.googleusercontent.com',
  scopes: ['https://www.googleapis.com/auth/books'],
  offlineAccess: true,
});

export default function WelcomeScreen() {
  const {signInUser} = useAuth();

  const onGoogleButtonPress = async () => {
    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential and wait for it to complete
      signInUser((await auth().signInWithCredential(googleCredential)).user);
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <ScreenWrapper color={colors.main}>
      <SafeAreaView className="justify-evenly mx-6 h-full">
        <View className="items-center">
          <Text
            className="text-white font-semibold text-4xl">
            Let's Get Started
          </Text>
        </View>

        <View className="items-center ">
          <FastImage
            style={{width: scale(280), height: verticalScale(250)}}
            source={require('../assets/images/welcomeScreenIcon.png')}
            resizeMode={FastImage.resizeMode.stretch}
          />
        </View>

        <TouchableOpacity
          onPress={onGoogleButtonPress}
          style={{backgroundColor: 'white'}}
          className="shadow p-3 rounded-full ">
          <View className="flex-row justify-center items-center space-x-3">
            <Image
              source={require('../assets/images/googleIcon.png')}
              className="h-8 w-8"
            />
            <View className="flex-row justify-between space-x-2">
              <FastImage
                style={{width: scale(20), height: verticalScale(20)}}
                source={require('../assets/images/googleIcon.png')}
                resizeMode={FastImage.resizeMode.stretch}
              />
              <Text className="text-center text-black text-lg font-bold">
                Sign In with Google
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </ScreenWrapper>
  );
}
