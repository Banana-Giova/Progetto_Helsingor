import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomePage from '../Home';
import Spettacoli from '../Spettacoli';
import About from '../About';
import PrenotazioniForm from '../Prens/PrenotazioniForm';

export const Drawer = createDrawerNavigator(); 

export function DrawerFunc() {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomePage} />
            <Drawer.Screen name="PrenotazioniForm" component={PrenotazioniForm} />
            <Drawer.Screen name="Spettacoli" component={Spettacoli} />
            <Drawer.Screen name="Chi Siamo" component={About} />
        </Drawer.Navigator>
    );
};

export default DrawerFunc;