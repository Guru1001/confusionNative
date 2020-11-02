import React from "react";
import { FlatList } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

function Menu(props){
    const renderMenuItem = ({ item }) => (
        <ListItem 
            bottomDivider 
            onPress = {()=> props.onPress(item.id)}
            >
            <Avatar title={item.name} source={require("./images/elaicheesecake.png")}/>
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )

    return(
        <FlatList
            keyExtractor = {item => item.id.toString()}
            data={props.dishes}
            renderItem = {renderMenuItem}
        />
    );
}

export default Menu;