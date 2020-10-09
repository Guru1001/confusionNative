import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import { StatusBar, View } from "react-native";

class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            dishes : DISHES
        }
    }
    render(){
        return(
            <View>
                <Menu dishes={this.state.dishes}/>
                <StatusBar style="auto" backgroundColor="#fff"/>
            </View>
        );
    }
}


export default Main;