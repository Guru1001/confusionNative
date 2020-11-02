import React, { Component } from "react";
import { ScrollView, View, Text } from "react-native";
import { Card } from "react-native-elements";
import { createStackNavigator } from '@react-navigation/stack';
import { DISHES } from "../shared/dishes";
import { PROMOTIONS } from "../shared/promotions";
import { LEADERS } from "../shared/leaders";


const Stack = createStackNavigator();

function RenderItem(props){
    const item = props.item;
    if(item!=null){
        return(
            <Card>
                <Card.FeaturedTitle style={{color:'black'}}>{item.name}</Card.FeaturedTitle>
                {   item.designation &&
                    <Card.FeaturedSubtitle style={{color:'black'}}>{item.designation}
                    </Card.FeaturedSubtitle>
                }
                <Card.Divider/>
                <Card.Image source={require('./images/uthappizza.png')} />
                <Text style={{marginBottom: 10}}>
                {item.description}
                </Text>
            </Card>
        );
    }else{
        return(<View></View>);
    }
}

function StackHome(props){
    return(
        <ScrollView>
            <RenderItem item = {props.dishes.filter((dish)=>dish.featured)[0]}/>
            <RenderItem item = {props.promotions.filter((promo)=>promo.featured)[0]}/>
            <RenderItem item = {props.leaders.filter((leader)=>leader.featured)[0]}/>
        </ScrollView>
    );
}
class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            dishes : DISHES,
            promotions: PROMOTIONS,
            leaders : LEADERS
        }
    }
    render(){
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
                    name='Home'
                    options={{
                        title: 'Home',
                    }}>
                    {props => 
                        <StackHome 
                            dishes = {this.state.dishes}
                            promotions = {this.state.promotions}
                            leaders = {this.state.leaders}/>
                    }
                </Stack.Screen>
            </Stack.Navigator>
        );
    }
}

export default Home;