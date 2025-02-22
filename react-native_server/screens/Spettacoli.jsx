import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";

const Spettacoli = () => {
  return (
    
    <View style={styles.container}>
      <Image source={require('../assets/helsingor_bg.png')} style={styles.image} />
    </View>
  );
};

export default Spettacoli;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  image: {
    width: (Dimensions.get('window').width)*0.8,
    height: (Dimensions.get('window').height)*0.8,
    resizeMode: "contain",
  },
});
