import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';

export default function Loading() {
  return (
    <View className="justify-center  items-center">
      <ActivityIndicator size="large" color={'black'} />
    </View>
  );
}
