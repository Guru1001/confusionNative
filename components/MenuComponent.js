import React, { Component } from "react";
import { FlatList } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { DISHES } from "../shared/dishes";

class Menu extends Component{

    constructor(props){
        super(props);
        this.state = {
            dishes: DISHES,
        }
    }


    render(){
        const renderMenuItem = ({ item }) => (
            <ListItem 
                bottomDivider 
                onPress = {()=> navigate('Dishdetail', { dishId : item.id})}
                >
                <Avatar title={item.name} source={require("./images/elaicheesecake.png")}/>
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        )
        const { navigate } = this.props.navigation;

        return(
            <FlatList
                keyExtractor = {item => item.id.toString()}
                data={this.state.dishes}
                renderItem = { renderMenuItem }
            />
        );
    }
    
}

export default Menu;