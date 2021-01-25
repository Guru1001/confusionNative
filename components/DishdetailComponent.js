import React, { Component, useState } from "react";
import { View, Text, ScrollView, Modal, Button, PanResponder, StyleSheet, Alert, Share } from "react-native";
import { Card, Icon, Input, Rating } from "react-native-elements";
import * as Animatable from 'react-native-animatable';
import { postFavorite, postComment } from "../redux/ActionCreators"


import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

const mapStateToProps = state => ({
    dishes  : state.dishes,
    comments: state.comments,
    favorites: state.favorites,
});

const mapDispatchToProps = dispatch =>({
    postFavorite : (dishId) => dispatch(postFavorite(dishId)),
    postComment : (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
});

const RenderDish = (props) =>{
    const [view, setView] = useState(0);
    const dish = props.dish;
    const handleViewRef = ref => { setView(ref) };
    const recognizeDrag = ({moveX, moveY, dx, dy}) => {
        if(dx < -200 && Math.abs(dy) < 100 ) return true;
        else return false;
    }
    const recognizeComment = ({moveX, moveY, dx, dy}) => {
        if(dx > 200 && Math.abs(dy) < 100 ) return true;
        else return false;
    }
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder:(e, gestureState) => {
            return true;
        },
        onPanResponderGrant : () => {
            view.rubberBand(1000);
        },
        onPanResponderEnd : (e, gestureState) => {
            if(recognizeDrag(gestureState)){
                Alert.alert(
                    'Add to Favorites?',
                    'Are you sure you wish to add ' + dish.name + 'to your favorites?',
                    [
                        {
                            text : 'Cancel',
                            style: 'cancel'
                        },
                        {
                            text: 'Ok',
                            onPress: () => {
                                props.favorite ? 
                                console.log("Already favorite"):
                                props.onPress()
                            }
                        }
                    ],
                    { cancelable: false }
                );
            }
            if(recognizeComment(gestureState)){
                props.toggleModal();
            }
            return true;
        }
    });

    const shareDish = (title, message, url) => {
        Share.share({
            title : title,
            message : title + ' : ' + message + ' ' + url,
            url : url
        }, {
            dialogTitle: 'Share ' + title,
        });
    }
    if(dish != null){
        return (
            <Animatable.View 
                animation='fadeInDown' 
                duration={2000} 
                delay={1000}
                ref = {handleViewRef}
                {...panResponder.panHandlers}
            >
                <Card>
                    <Card.Title>{dish.name}</Card.Title>
                    <Card.Divider/>
                    <Card.Image source={{uri : baseUrl + dish.image}} />
                    <Text style={{marginBottom: 10}}>
                    {dish.description}
                    </Text>
                    <View style={styles.styleIcons}>
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
                        <Icon
                            raised
                            reverse
                            name="pencil"
                            type="font-awesome"
                            color="#512DA8"
                            onPress={() => 
                                props.toggleModal()
                            }
                        />
                        <Icon
                            raised
                            reverse
                            name = 'share'
                            type = 'font-awesome'
                            color = '#51D2A8'
                            onPress={()=> 
                                shareDish(dish.name, dish.description, baseUrl+dish.image)
                            }
                        />
                    </View>
                </Card>
            </Animatable.View>
        );
    }
    else{
        return(<View></View>);
    }
}

const RenderComments = ({comments})=>(
    <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
        <Card>
            <Card.Title>Comments</Card.Title>
            <Card.Divider/>
            {comments.map(
                item => (
                    <View key={item.id} style={{margin:10}}>
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
                )
            )}
        </Card>
    </Animatable.View>
);

class Dishdetail extends Component{

    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
            rating : 3,
            author : "",
            comment: "",
        }
    }

    markFavorite(dishId){
        this.props.postFavorite(dishId)
    }

    toggleModal(){
        this.setState({modalVisible:!this.state.modalVisible});
    }

    resetForm(){
        this.setState({
            rating : 3,
            author : "",
            comment: "",
        });
    }

    submitForm(){
        this.props.postComment(
            1,
            this.state.rating,
            this.state.author,
            this.state.comment
        );
    }

    render(){
        const dishId = this.props.route.params.dishId;
        return(
        <ScrollView nestedScrollEnabled>
            <RenderDish 
                dish={this.props.dishes.dishes.filter((dish)=> dish._id == dishId)[0]}
                favorite = {this.props.favorites.includes(dishId)}
                onPress = {() => this.markFavorite(dishId)}
                toggleModal = {() => this.toggleModal()}
            />
            <RenderComments 
                comments={this.props.comments.comments.filter(
                    (comment)=> comment.dishId == 1
                )}
            />
            <Modal
                animated={"slide"}
                transparent={false}
                visible={this.state.modalVisible}
                onDismiss={()=> {this.toggleModal();this.resetForm();}}
                onRequestClose = {()=> {this.toggleModal();this.resetForm();}}
            >
                <Rating
                    showRating
                    ratingCount ={5}
                    onFinishRating={(rating)=>this.setState({rating:rating})}
                    style = {{marginTop: 30, marginBottom:20}}
                />
                <Input
                    placeholder = "Author"
                    leftIcon = {{type: "font-awesome", name: "user-o"}}
                    onChangeText={value=>this.setState({author:value})}
                    inputContainerStyle = {styles.formFields}
                />
                <Input
                    placeholder = "Comment"
                    leftIcon = {{type: "font-awesome", name: "comment-o"}}
                    onChangeText={value=>this.setState({comment:value})}
                    inputContainerStyle = {styles.formFields}
                />
                <View style = {styles.buttonStyle}>
                    <Button
                        onPress = {()=> {
                            this.toggleModal();
                            this.submitForm();
                            this.resetForm();
                        }}
                        color="#512DA8"
                        title="Submit"
                        style = {{marginBottom:10}}
                    />
                </View>
                <View style = {styles.buttonStyle}>
                    <Button
                        onPress = {()=> {
                            this.toggleModal();
                            this.resetForm();
                        }}
                        color="grey"
                        title="Close"
                    />
                </View>
            </Modal>
        </ScrollView>
        )
    }    
}

const styles = StyleSheet.create({
    styleIcons :{
        flex : 1,
        flexDirection: "row",
        justifyContent:"center"
    },
    formFields:{
        marginLeft: 10,
        marginRight: 10,
    },
    buttonStyle:{
        marginBottom:20,
        marginLeft: 10,
        marginRight: 10,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);