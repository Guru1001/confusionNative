import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { Loading } from "./LoadingComponent";

import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

const mapStateToProps = state => ({
    dishes    : state.dishes,
    favorites : state.favorites,
})

class Favorites extends Component {
    render(){
        const { navigate } = this.props.navigation;
        const renderMenuItem = ({ item, index }) => {
            return(
                <ListItem 
                    key = {index}
                    onPress = {()=> navigate('Dishdetail', {dishId: item._id})}>
                    <Avatar source={{uri: baseUrl + item.image}} rounded/>
                    <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            );
        }
        
        if (this.props.dishes.isLoading){
            return(
                <Loading/>
            );
        }
        else if(this.props.dishes.errMess){
            return(
                <View>
                    <Text>{this.props.dishes.errMess}</Text>
                </View>
            );
        }
        else {
            return(
                <FlatList
                    data = {this.props.dishes.dishes.filter(dish => this.props.favorites.includes(dish._id.toString()))}
                    renderItem = {renderMenuItem}
                    keyExtractor = { item => item._id}
                />
            );
        }
    }
}

export default connect(mapStateToProps)(Favorites);