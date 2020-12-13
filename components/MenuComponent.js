import React, { Component } from "react";
import { FlatList } from "react-native";
import { Tile } from "react-native-elements";
import { Loading } from "./LoadingComponent";

import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

const mapStateToProps = state => ({
    dishes    : state.dishes,
})

class Menu extends Component{
    render(){
        const renderMenuItem = ({ item, index }) => (
            <Tile 
                key = {index}
                title = {item.name}
                imageSrc = {{ uri : baseUrl + item.image }}
                caption = { item.description }
                featured
                onPress = {()=> navigate('Dishdetail', { dishId : item._id})}
            />
        )
        const { navigate } = this.props.navigation;
        if(this.props.dishes.isLoading){
            return(<Loading/>);
        }else if(this.props.dishes.errMess){
            return(
                <View>
                    <Text>{this.props.dishes.errMess}</Text>
                </View>
            );
        }
        else return(
            <FlatList
                keyExtractor = {item => item._id}
                data={this.props.dishes.dishes}
                renderItem = { renderMenuItem }
            />
        );
    }
    
}

export default connect(mapStateToProps)(Menu);