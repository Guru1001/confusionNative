import React, { Component } from "react";
import { View, Text, FlatList, Animated, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { Loading } from "./LoadingComponent";
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/FontAwesome"

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
            const renderRightAction = (text, color) => {
                const pressHandler = () => {
                    this.props.deleteFavorite(item._id);
                };
                return (
                    <Animated.View style={{ flex: 1, transform: [{ translateX: 0 }] }}>
                        <RectButton
                            style={[styles.rightAction, { backgroundColor: color }]}
                            onPress={pressHandler}>
                            <Icon
                                name="trash"
                                size={32}
                                color="#fff"
                            />
                            <Text style={styles.actionText}>{text}</Text>
                        </RectButton>
                    </Animated.View>
                );
            };
            const renderRightActions = progress => (
                <View style={{ width: 128 }}>
                    {renderRightAction("Delete",'#dd2c00')}
                </View>
            );
            return(
                <Swipeable
                    friction={2}
                    rightThreshold={40}
                    renderRightActions={renderRightActions}
                >
                    <ListItem 
                        key = {item._id}
                        onPress = {()=> navigate('Dishdetail', {dishId: item._id})}>
                        <Avatar source={{uri: baseUrl + item.image}} rounded/>
                        <ListItem.Content>
                            <ListItem.Title>{item.name}</ListItem.Title>
                            <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                </Swipeable>
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

const styles = StyleSheet.create({
    actionText: {
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent',
        padding: 10,
    },
    rightAction: {
        alignItems: 'center',
        backgroundColor: '#dd2c00',
        flex: 1,
        justifyContent: 'center',
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);