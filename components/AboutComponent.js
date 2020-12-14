import React, { Component } from "react";
import { ScrollView, Text } from "react-native";
import { Card, ListItem, Avatar } from "react-native-elements";
import * as Animatable from 'react-native-animatable';

import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import Loading from "./LoadingComponent";


const mapStateToProps = state => ({
    leaders : state.leaders,
})


class About extends Component{

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

        const RenderLeaders = ({leaders}) => (
            leaders.map(
                item => (
                    <ListItem key={item._id}>
                        <Avatar rounded title={item.name} source={{uri: baseUrl + item.image}}/>
                        <ListItem.Content>
                            <ListItem.Title>{item.name}</ListItem.Title>
                            <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                )
            )
        )

        if(this.props.leaders.isLoading){
            return(
                <ScrollView>
                    <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                        <History/>
                        <Card>
                            <Card.Title>Corporate Leadership</Card.Title>
                            <Card.Divider/>
                            <Loading />
                        </Card>
                    </Animatable.View>
                </ScrollView>
            );
        }
        else if(this.props.leaders.errMess){
            return(
                <ScrollView>
                    <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                        <History/>
                        <Card>
                            <Card.Title>Corporate Leadership</Card.Title>
                            <Card.Divider/>
                            <Text>{this.props.leaders.errMess}</Text>
                        </Card>
                    </Animatable.View>
                </ScrollView>
            );
        }
        else {
            return(
                <ScrollView>
                    <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                        <History/>
                        <Card>
                            <Card.Title>Corporate Leadership</Card.Title>
                            <Card.Divider/>
                            <RenderLeaders leaders={this.props.leaders.leaders}/>
                        </Card>
                    </Animatable.View>
                </ScrollView>
            );
        }
    }
}

export default connect(mapStateToProps)(About);