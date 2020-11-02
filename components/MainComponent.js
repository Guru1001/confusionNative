import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';
import { Platform, StatusBar, View, Text, Button } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function stackNavigator(){
    return(
        <Stack.Navigator
            screenOptions={{
                headerStyle:{
                backgroundColor: '#512DA8'
                },
                headerTintColor:'#fff',
                headerTitleStyle:{
                    color:'#fff'
                }
            }}>
            <Stack.Screen 
                name='Menu' 
                component={Menu} 
                options={{
                    title: 'Menu',
                }}/>
            <Stack.Screen 
                name='Dishdetail' 
                component={Dishdetail}
                />
        </Stack.Navigator>
    );
}

class Main extends Component{
    render(){
        return(
            <Drawer.Navigator 
                drawerContentOptions ={{
                    style: {
                        backgroundColor:'#D1C4E9'
                    }
                }}>
                <Drawer.Screen name="Home" component={Home}/>
                <Drawer.Screen name="Menu" component={stackNavigator}/>
            </Drawer.Navigator>
        );
    }
}


export default Main;