import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.navbar}>
      {/* Titolo a sinistra: tocca per andare alla Home */}
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.brand}>Teatro Stabile Helsingor</Text>
      </TouchableOpacity>
      
      {/* Link di navigazione */}
      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.link}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Spettacoli')}>
          <Text style={styles.link}>Spettacoli</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('PrenotazioniForm')}>
          <Text style={styles.link}>Prenotazioni</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AreaModeratori')}>
          <Text style={styles.link}>Area Moderatori</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('About')}>
          <Text style={styles.link}>Chi Siamo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Logout')}>
          <Text style={styles.link}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  link: {
    color: '#fff',
    marginLeft: 15,
    fontSize: 16,
  },
});
