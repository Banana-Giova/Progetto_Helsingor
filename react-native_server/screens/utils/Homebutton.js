import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeButton = ({ navigation }) => {
  return (
    <View style={{ padding: 10 }}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.homeButton}>
        <Icon name="home" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeButton;

const styles = StyleSheet.create({
  homeButton: {
    backgroundColor: '#d9534f',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
});