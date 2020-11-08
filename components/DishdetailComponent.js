import React, { Component } from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import { Card, Icon } from "react-native-elements";
import { COMMENTS } from "../shared/comments";
import { postFavorite } from "../redux/ActionCreators"

import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

const mapStateToProps = state => ({
    dishes  : state.dishes,
    comments: state.comments,
    favorites: state.favorites,
});

const mapDispatchToProps = dispatch =>({
    postFavorite : (dishId) => dispatch(postFavorite(dishId)),
});

const RenderDish = (props) =>{
    const dish = props.dish;
    if(dish != null){
        return (
            <Card>
                <Card.Title>{dish.name}</Card.Title>
                <Card.Divider/>
                <Card.Image source={{uri : baseUrl + dish.image}} />
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
                keyExtractor={item=>item._id}
            />
        </Card>
    );
}

class Dishdetail extends Component{

    constructor(props){
        super(props);
        this.state = {
            comments : COMMENTS,
        }
    }

    markFavorite(dishId){
        this.props.postFavorite(dishId)
    }

    render(){
        const dishId = this.props.route.params.dishId;
        return(
        <ScrollView>
            <RenderDish 
                dish={this.props.dishes.dishes.filter((dish)=> dish._id == dishId)[0]}
                favorite = {this.props.favorites.includes(dishId)}
                onPress = {() => this.markFavorite(dishId)}
            />
            <RenderComments 
                comments={this.state.comments.filter(
                    (comment)=> comment.dishId == 1
                )}
            />
        </ScrollView>
        )
    }    
}

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);