import React, { Component } from "react";
import { ScrollView, View, Text, Animated, Easing } from "react-native";
import { Card } from "react-native-elements";
import { Loading } from "./LoadingComponent";

import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

const mapStateToProps = state => ({
    dishes    : state.dishes,
    promotions: state.promotions,
    leaders   : state.leaders,
})

const RenderItem = ({item, isLoading, errMess}) => {
    if(isLoading){
        return(
            <Loading/>
        );
    }else if(errMess){
        return(
            <View>
                <Text>{errMess}</Text>
            </View>
        );
    }else{
        if(item!=null){
            return(
                <Card>
                    <Card.FeaturedTitle style={{color:'black'}}>{item.name}</Card.FeaturedTitle>
                    {   item.designation &&
                        <Card.FeaturedSubtitle style={{color:'black'}}>{item.designation}
                        </Card.FeaturedSubtitle>
                    }
                    <Card.Divider/>
                    <Card.Image source={{uri: baseUrl + item.image}} />
                    <Text style={{marginBottom: 10}}>
                    {item.description}
                    </Text>
                </Card>
            );
        }else{
            return(<View></View>);
        }
    }
};

class Home extends Component{
    constructor(props){
        super(props);
        this.animatedValue = new Animated.Value(0);
    }
    componentDidMount(){
        this.animate();
    }
    animate(){
        this.animatedValue.setValue(0);
        Animated.timing(
            this.animatedValue,
            {
                toValue : 8,
                duration: 8000,
                easing  :Easing.linear,
            }
        ).start(()=> this.animate());
    }
    render(){
        const xpos1 = this.animatedValue.interpolate({
            inputRange : [0, 1, 3, 5, 8],
            outputRange: [1200, 600, 0, -600, -1200]
        });
        const xpos2 = this.animatedValue.interpolate({
            inputRange : [0, 2, 4, 6, 8],
            outputRange: [1200, 600, 0, -600, -1200]
        });
        const xpos3 = this.animatedValue.interpolate({
            inputRange : [0, 3, 5, 7, 8],
            outputRange: [1200, 600, 0, -600, -1200]
        })
        return(
            <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
                <Animated.View style={{width:'100%', transform:[{translateX:xpos1}]}}>
                    <RenderItem 
                        item = {this.props.dishes.dishes.filter((dish)=>dish.featured)[0]}
                        isLoading = {this.props.dishes.isLoading}
                        errMess = {this.props.dishes.errMess}    
                    />
                </Animated.View>
                <Animated.View style={{width:'100%', transform:[{translateX:xpos2}]}}>
                    <RenderItem 
                        item = {this.props.promotions.promotions.filter((promo)=>promo.featured)[0]}
                        isLoading = {this.props.promotions.isLoading}
                        errMess = {this.props.promotions.errMess}
                    />
                </Animated.View>
                <Animated.View style={{width:'100%', transform:[{translateX:xpos3}]}}>
                    <RenderItem 
                        item = {this.props.leaders.leaders.filter((leader)=>leader.featured)[0]}
                        isLoading = {this.props.leaders.isLoading}
                        errMess = {this.props.leaders.errMess}
                    />
                </Animated.View>
            </View>
        );
    }
}

export default connect(mapStateToProps)(Home);