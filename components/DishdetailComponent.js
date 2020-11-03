import React, { Component } from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import { Card, Icon } from "react-native-elements";
import { DISHES } from "../shared/dishes";
import { COMMENTS } from "../shared/comments";

const RenderDish = (props) =>{
    const dish = props.dish;

    if(dish != null){
        return (
            <Card>
                <Card.Title>{dish.name}</Card.Title>
                <Card.Divider/>
                <Card.Image source={require('./images/uthappizza.png')} />
                <Text style={{marginBottom: 10}}>
                {dish.description}
                </Text>
                <Icon
                    raised
                    reverse
                    name={props.favorite ? "heart" : "heart-o"}
                    type="font-awesome"
                    color="#f50"
                    onPress={() => 
                        props.favorite ? 
                        console.log("Already favorite"):
                        props.onPress()
                    }
                />
            </Card>
        );
    }
    else{
        return(<View></View>);
    }
}

const RenderComments = (props)=>{
    const comments = props.comments;
    const renderCommentItem = ({item, index}) =>{
        return(
            <View key={index} style={{margin:10}}>
                <Text style={{fontSize:14}}>
                    {item.comment}
                </Text>
                <Text style={{fontSize:12}}>
                    {item.rating} Stars
                </Text>
                <Text style={{fontSize:12}}>
                    {"-- " + item.author + ", " + item.date.substring(0,10)}
                </Text>
            </View>
        );
    }
    return(
        <Card>
            <Card.Title>Comments</Card.Title>
            <Card.Divider/>
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item=>item.id.toString()}
            />
        </Card>
    );
}

class Dishdetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            dishes : DISHES,
            comments: COMMENTS,
            favorites: [],
        };
    }

    markFavorite(dishId){
        this.setState({favorites: this.state.favorites.concat(dishId)})
    }

    render(){
        const dishId = this.props.route.params.dishId;
        return(
        <ScrollView>
            <RenderDish 
                dish={this.state.dishes[+dishId]}
                favorite = {this.state.favorites.includes(dishId)}
                onPress = {() => this.markFavorite(dishId)}
            />
            <RenderComments 
                comments={this.state.comments.filter(
                    (comment)=>comment.dishId == dishId
                )}
            />
        </ScrollView>
        )
    }    
}

export default Dishdetail;