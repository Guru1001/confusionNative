import React, { Component } from "react";
import { View, ScrollView, SafeAreaView, Text, FlatList, VirtualizedList } from "react-native";
import { Card, ListItem, Avatar } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import { LEADERS } from "../shared/leaders";

class About extends Component{
    constructor(props){
        super(props);
        this.state = {
            leaders : LEADERS,
        }
    }

    render(){
        const History = () => (
            <Card>
                <Card.Title style={{color:'black'}}>Our History</Card.Title>
                <Card.Divider/>
                <Text style={{marginBottom: 10}}>
                Started in 2010, Ristorante con Fusion quickly established itself as 
                a culinary icon par excellence in Hong Kong. With its unique brand 
                of world fusion cuisine that can be found nowhere else, it enjoys 
                patronage from the A-list clientele in Hong Kong.  Featuring four 
                of the best three-star Michelin chefs in the world, you never know 
                what will arrive on your plate the next time you visit us.
                </Text>
                <Text style={{marginBottom: 10}}>
                The restaurant traces its humble beginnings to The Frying Pan, a 
                successful chain started by our CEO, Mr. Peter Pan, that featured 
                for the first time the world's best cuisines in a pan.
                </Text>
            </Card>
        );

        const renderLeader = ({ item }) => (
            <ListItem>
                <Avatar rounded title={item.name} source={require("./images/alberto.png")}/>
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        )

        return(
            <ScrollView>
                <History/>
                <Card>
                    <Card.Title>Corporate Leadership</Card.Title>
                    <Card.Divider/>
                    <FlatList
                        data={ this.state.leaders }
                        keyExtractor = { leader => leader.id.toString() }
                        renderItem = { renderLeader }
                    />
                </Card>
            </ScrollView>
        );
    }
}

export default About;