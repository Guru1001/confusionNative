import React, { Component } from "react";
import { View, Text, FlatList, Alert, Animated, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { Loading } from "./LoadingComponent";
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/FontAwesome"
import * as Animatable from 'react-native-animatable';

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
        const { navigate }  = this.props.navigation;
        const renderFavoriteItem = ({item}) => {
            let _swipeableRow;
            const renderRightAction = (text, color, x, progress) => {
                const trans = progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [x, 0],
                });
                const pressHandler = () => {
                    Alert.alert(
                        'Delete Favorite?',
                        'Are you sure you wish to delete the favorite dish ' + item.name +'?',
                        [
                            { 
                                text : 'Cancel',
                                onPress : () => close(),
                                style: 'cancel'
                            },
                            {
                                text : 'OK',
                                onPress : () => this.props.deleteFavorite(item._id),
                            }
                        ],
                        { cancelable : false }
                    );
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
                    {renderRightAction("Delete",'#dd2c00', 64, progress)}
                </View>
            );
    
            const updateRef = ref => {
                _swipeableRow = ref;
            }
            const close = () => {
                _swipeableRow.close();
            }
            return(
                <Swipeable
                    friction={2}
                    ref={updateRef}
                    rightThreshold={40}
                    renderRightActions={renderRightActions}
                >
                    <Animatable.View animation='fadeInRightBig' duration={2000}>
                        <ListItem 
                            key = {item._id}
                            onPress = {()=> this.navigate('Dishdetail', {dishId: item._id})}>
                            <Avatar source={{uri: baseUrl + item.image}} rounded/>
                            <ListItem.Content>
                                <ListItem.Title>{item.name}</ListItem.Title>
                                <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    </Animatable.View>
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