import 'react-native-gesture-handler';
import React from "react";
import Main from "./components/MainComponent";
import { NavigationContainer } from "@react-navigation/native"


export default class App extends React.Component{
    render(){
        return (
            <NavigationContainer>
                <Main/>
            </NavigationContainer>
        );
    }
}
