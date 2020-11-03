import React, { Component } from "react";
import { ScrollView, View, Text } from "react-native";
import { Card } from "react-native-elements";
import { DISHES } from "../shared/dishes";
import { PROMOTIONS } from "../shared/promotions";
import { LEADERS } from "../shared/leaders";


class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            dishes : DISHES,
            promotions: PROMOTIONS,
            leaders : LEADERS
        }
    }

    RenderItem = ({item}) => {
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
    };
        
    render(){
        return(
            <ScrollView>
                <this.RenderItem item = {this.state.dishes.filter((dish)=>dish.featured)[0]}/>
                <this.RenderItem item = {this.state.promotions.filter((promo)=>promo.featured)[0]}/>
                <this.RenderItem item = {this.state.leaders.filter((leader)=>leader.featured)[0]}/>
            </ScrollView>
        );
    }
}

export default Home;