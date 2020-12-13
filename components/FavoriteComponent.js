import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { Loading } from "./LoadingComponent";

import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { deleteFavorite } from "../redux/ActionCreators"

const mapStateToProps = state => ({
    dishes    : state.dishes,
    favorites : state.favorites,
})

const mapDispatchToProps = dispatch => ({
    deleteFavorite : (dishId) => dispatch(deleteFavorite(dishId))
})

class Favorites extends Component {
    render(){
        const { navigate } = this.props.navigation;
        const renderFavoriteItem = ({item}) => {
            return(
                    <ListItem 
                        key = {item._id}
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
                    renderItem = {renderFavoriteItem}
                    keyExtractor = { item => item._id}
                />
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);