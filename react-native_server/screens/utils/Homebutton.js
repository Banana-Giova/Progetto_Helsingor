import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeButton = ({ navigation }) => {
  return (
    <View style={{ padding: 10 }}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Icon name="home" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeButton;
