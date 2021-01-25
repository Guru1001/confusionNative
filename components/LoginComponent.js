import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import { Icon, Input, CheckBox, Button } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { baseUrl } from '../shared/baseUrl';

class LoginTab  extends Component{
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
            remember : false,
        }
    }

    componentDidMount(){
        SecureStore.getItemAsync('userinfo')
        .then((userdata)=>{
            let userinfo = JSON.parse(userdata);
            if(userinfo){
                this.setState({username: userinfo.username});
                this.setState({password: userinfo.password});
                this.setState({remember: true});
            }
        })
    }

    static navigationOptions = {
        title : 'Login',
        tabBarIcon : ({ tintColor }) => (
            <Icon
                name = 'sign-in'
                type = 'font-awesome'
                size = {24}
                iconStyle = {{color: tintColor}}
            />
        )
    }

    handleLogin(){
        console.log(JSON.stringify(this.state));
        if(this.state.remember){
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({username: this.state.username, password: this.state.passowrd})    
            )
            .catch(error=> console.log("Could not save user info ", error))
        }else{
            SecureStore.deleteItemAsync('userinfo')
            .catch(error=> console.log("Could not delete user info ", error))
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <Input
                    placeholder="username"
                    leftIcon={{type:'font-awesome', name:'user-o'}}
                    onChangeText={(username)=>this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                />
                <Input
                    placeholder="password"
                    leftIcon={{type:'font-awesome', name:'key'}}
                    onChangeText={(password)=>this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                />
                <CheckBox
                    title="Remember Me"
                    center
                    checked={this.state.remember}
                    onPress={()=>this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckbox}
                />
                <View style={styles.formButton}>
                    <Button
                        onPress={()=>this.handleLogin()}
                        title='  Login'
                        icon={<Icon 
                            name='sign-in' 
                            type='font-awesome'
                            size={24} 
                            color='white'
                        />}
                        buttonStyle={{backgroundColor:'#512DA8'}}
                    />
                </View>
                <View style={styles.formButton}>
                    <Button
                        onPress={()=>this.props.navigation.navigate('Register')}
                        title='  Register'
                        icon={<Icon 
                            name='user-plus' 
                            type='font-awesome'
                            size={24} 
                            color='white'
                        />}
                        buttonStyle={{backgroundColor:'blue'}}
                    />
                </View>
            </View>
        );
    }
}

class RegisterTab extends Component{
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
            firstname: '',
            lastname: '',
            email : '',
            remember : false,
            imageUrl : baseUrl + 'images/logo.png'
        }
    }
    
    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync()
    }

    static navigationOptions = {
        title : 'Register',
        tabBarIcon : ({ tintColor }) => (
            <Icon
                name = 'user-plus'
                type = 'font-awesome'
                size = {24}
                iconStyle = {{color: tintColor}}
            />
        )
    }

    render(){
        return(
            <ScrollView>
                <View style={styles.container}>
                    <Input
                        placeholder="Username"
                        leftIcon={{type:'font-awesome', name:'user-o'}}
                        onChangeText={(username)=>this.setState({username})}
                        value={this.state.username}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder="Password"
                        leftIcon={{type:'font-awesome', name:'key'}}
                        onChangeText={(password)=>this.setState({password})}
                        value={this.state.password}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder="First Name"
                        leftIcon={{type:'font-awesome', name:'user-o'}}
                        onChangeText={(firstname)=>this.setState({firstname})}
                        value={this.state.firstname}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder="Last Name"
                        leftIcon={{type:'font-awesome', name:'user-o'}}
                        onChangeText={(lastname)=>this.setState({lastname})}
                        value={this.state.lastname}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder="Email"
                        leftIcon={{type:'font-awesome', name:'envelope-o'}}
                        onChangeText={(email)=>this.setState({email})}
                        value={this.state.email}
                        containerStyle={styles.formInput}
                    />
                    <CheckBox
                        title="Remember Me"
                        center
                        checked={this.state.remember}
                        onPress={()=>this.setState({remember: !this.state.remember})}
                        containerStyle={styles.formCheckbox}
                    />
                    <View style={styles.formButton}>
                        <Button
                            onPress={()=>this.handleRegister()}
                            title='  Register'
                            icon={<Icon 
                                name='user-plus' 
                                type='font-awesome'
                                size={24} 
                                color='white'
                            />}
                            buttonStyle={{backgroundColor:'#512DA8'}}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    } 
}
const Tab = createBottomTabNavigator();

function Login(){
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeBackgroundColor:'#9575CD',
                inactiveBackgroundColor: '#D1C4E9',
                activeTintColor: 'white',
                inactiveTintColor: 'gray',
            }}
        >
                <Tab.Screen 
                    name='Login' 
                    component={ LoginTab }
                    options={{
                        title:'Login',
                        tabBarLabel:'Login',
                        tabBarIcon : ({ color }) => (
                            <Icon
                                name = 'sign-in'
                                type = 'font-awesome'
                                size = {22}
                                iconStyle = {{color}}
                            />
                        )
                    }}
                />
                <Tab.Screen 
                    name='Register' 
                    component={RegisterTab}
                    options={{
                        title:'Register',
                        tabBarLabel:'Register',
                        tabBarIcon : ({ color }) => (
                            <Icon
                                name = 'user-plus'
                                type = 'font-awesome'
                                size = {22}
                                iconStyle = {{color}}
                            />
                        )
                    }}
                />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        margin : 40,
        marginTop: 80,
        marginBottom: 80
    },
    imageContainer:{
        flex:1,
        flexDirection: "row",
        margin: 20
    },
    image:{
        margin: 10,
        width: 80,
        height: 60,
    },
    formCheckbox:{
        margin: 10,
        backgroundColor: null,
        borderWidth: 0
    },
    formButton:{
        margin:10,
        marginLeft:40,
        marginRight: 40,
        borderRadius: 15,
        overflow: "hidden"
    }
})

export default Login;