import React, { Component } from "react";
import { ScrollView, View, Text } from "react-native";
import { Card } from "react-native-elements";
import { Loading } from "./LoadingComponent";

import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

const mapStateToProps = state => ({
    dishes    : state.dishes,
    promotions: state.promotions,
    leaders   : state.leaders,
})


class Home extends Component{
    RenderItem = ({item, isLoading, errMess}) => {
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
        
    render(){
        return(
            <ScrollView>
                <this.RenderItem 
                    item = {this.props.dishes.dishes.filter((dish)=>dish.featured)[0]}
                    isLoading = {this.props.dishes.isLoading}
                    errMess = {this.props.dishes.errMess}    
                />
                <this.RenderItem 
                    item = {this.props.promotions.promotions.filter((promo)=>promo.featured)[0]}
                    isLoading = {this.props.promotions.isLoading}
                    errMess = {this.props.promotions.errMess}
                />
                <this.RenderItem 
                    item = {this.props.leaders.leaders.filter((leader)=>leader.featured)[0]}
                    isLoading = {this.props.leaders.isLoading}
                    errMess = {this.props.leaders.errMess}
                />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);