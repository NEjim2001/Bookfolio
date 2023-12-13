import {View, Text, Image} from 'react-native';
import React from 'react';

export default function EmptyList({message}) {
  return (
    <View className=" justify-center items-center h-20 ">
      <Text className="italic text-gray-400">
        {message ? message : 'Data not found'}
      </Text>
    </View>
  );
}
