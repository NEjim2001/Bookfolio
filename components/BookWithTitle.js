import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ChatBubbleBottomCenterIcon} from 'react-native-heroicons/solid';
import {scale, verticalScale} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';

export default function BookWithTitle({
  footer,
  noteBadge,
  shelf,
  data,
  navigationLocation,
  size,
  color,
}) {
  const {volumeInfo, id} = data;

  const navigation = useNavigation();

  const handleSearch = () => {
    navigation.navigate(navigationLocation, {volumeInfo, id, shelf});
  };

  return (
    <View>
      {noteBadge ? (
        <View className="right-1 top-1 absolute z-10">
          <ChatBubbleBottomCenterIcon size={25} color={'gold'} />
        </View>
      ) : (
        <View></View>
      )}

      <TouchableOpacity onPress={handleSearch} className="items-center">
        <FastImage
          className="rounded-2xl"
          style={{width: 60 * size, height: 98 * size}}
          source={{
            uri: `https://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.stretch}
        />
      </TouchableOpacity>

      {footer ? (
        <View style={{width: scale(100)}}>
          <Text
            className={`truncate`}
            style={{
              fontWeight: 'bold',
              width: 60 * size,
              height: verticalScale(20),
              color: color,
            }}>
            {volumeInfo.title}
          </Text>
          <Text style={{fontWeight: 'medium', color: '#666', marginBottom: 10}}>
            {volumeInfo.authors[0]}
          </Text>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}
