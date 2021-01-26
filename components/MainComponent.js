import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Reservation from "./ReservationComponent";
import Favorites from "./FavoriteComponent";
import Login from "./LoginComponent";
import { View, Image, StyleSheet, SafeAreaView, Text, ToastAndroid } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import  NetInfo  from '@react-native-community/netinfo';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Icon } from "react-native-elements";

import { connect } from "react-redux";
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from "../redux/ActionCreators";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    fetchDishes : () => dispatch(fetchDishes()),
    fetchComments : () => dispatch(fetchComments()),
    fetchPromos : () => dispatch(fetchPromos()),
    fetchLeaders : () => dispatch(fetchLeaders()),
})

const HomeStack = createStackNavigator();
const MenuStack = createStackNavigator();
const AboutStack = createStackNavigator();
const ContactStack = createStackNavigator();
const ReservationStack = createStackNavigator();
const FavoriteStack = createStackNavigator();
const LoginStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MenuNavigator = () => (
    <MenuStack.Navigator
        screenOptions={{
            headerStyle:{
            backgroundColor: '#512DA8'
            },
            headerTintColor:'#fff',
            headerTitleStyle:{
                color:'#ff f'
            },
        }}

        >
        <MenuStack.Screen 
            name='Menu' 
            component={Menu} 
            options={({navigation})=>({
                title: "Menu",
                headerLeft:()=>(
                    <Icon 
                        name="menu" 
                        size={32}
                        color="#ffff"
                        onPress={()=>navigation.toggleDrawer()}
                    />
                ),
            })}/>
        <MenuStack.Screen 
            name='Dishdetail' 
            component={Dishdetail}
            />
    </MenuStack.Navigator>
);

const HomeNavigator = () => (
    <HomeStack.Navigator
        screenOptions={{
            headerStyle:{
            backgroundColor: '#512DA8'
            },
            headerTintColor:'#fff',
            headerTitleStyle:{
                color:'#fff'
            }
        }}>
        <HomeStack.Screen 
            name='Home'
            component={Home}
            options={({navigation})=>({
                title:"Home",
                headerLeft:()=>(
                    <Icon
                        name="menu"
                        size={32}
                        color="#fff"
                        onPress={()=>{navigation.toggleDrawer()}}
                    />
                )
            })}/>
    </HomeStack.Navigator>
);

const AboutNavigator = () =>(
    <AboutStack.Navigator
        screenOptions={{
            headerStyle:{
            backgroundColor: '#512DA8'
            },
            headerTintColor:'#fff',
            headerTitleStyle:{
                color:'#fff'
            }
        }}>
        <AboutStack.Screen 
            name='About Us'
            component={About}
            options={({navigation})=>({
                title:"About Us",
                headerLeft:()=>(
                    <Icon
                        name="menu"
                        size={32}
                        color="#fff"
                        onPress={()=>{navigation.toggleDrawer()}}
                    />
                )
            })}/>
    </AboutStack.Navigator>
);

const ContactNavigator = () =>(
    <ContactStack.Navigator
        screenOptions={{
            headerStyle:{
            backgroundColor: '#512DA8'
            },
            headerTintColor:'#fff',
            headerTitleStyle:{
                color:'#fff'
            }
        }}>
        <ContactStack.Screen 
            name='Contact'
            component={Contact}
            options={({navigation})=>({
                title:"Contact",
                headerLeft:()=>(
                    <Icon
                        name="menu"
                        size={32}
                        color="#fff"
                        onPress={()=>{navigation.toggleDrawer()}}
                    />
                )
            })}/>
    </ContactStack.Navigator>
);

const ReservationNavigator = () =>(
    <ReservationStack.Navigator
        screenOptions={{
            headerStyle:{
            backgroundColor: '#512DA8'
            },
            headerTintColor:'#fff',
            headerTitleStyle:{
                color:'#fff'
            }
        }}>
        <ReservationStack.Screen 
            name='Reserve Table'
            component={Reservation}
            options={({navigation})=>({
                title:"Reserve Table",
                headerLeft:()=>(
                    <Icon
                        name="menu"
                        size={32}
                        color="#fff"
                        onPress={()=>{navigation.toggleDrawer()}}
                    />
                )
            })}/>
    </ReservationStack.Navigator>
);

const FavoriteNavigator = () =>(
    <FavoriteStack.Navigator
        screenOptions={{
            headerStyle:{
            backgroundColor: '#512DA8'
            },
            headerTintColor:'#fff',
            headerTitleStyle:{
                color:'#fff'
            }
        }}>
        <FavoriteStack.Screen 
            name='Reserve Table'
            component={Favorites}
            options={({navigation})=>({
                title:"My Favorites",
                headerLeft:()=>(
                    <Icon
                        name="menu"
                        size={32}
                        color="#fff"
                        onPress={()=>{navigation.toggleDrawer()}}
                    />
                )
            })}/>
    </FavoriteStack.Navigator>
);

const LoginNavigator = () =>(
    <LoginStack.Navigator
        screenOptions={{
            headerStyle:{
            backgroundColor: '#512DA8'
            },
            headerTintColor:'#fff',
            headerTitleStyle:{
                color:'#fff'
            }
        }}>
        <LoginStack.Screen 
            name='Login'
            component={Favorites}
            options={({navigation})=>({
                title:"Login",
                headerLeft:()=>(
                    <Icon
                        name="menu"
                        size={32}
                        color="#fff"
                        onPress={()=>{navigation.toggleDrawer()}}
                    />
                )
            })}/>
    </LoginStack.Navigator>
);

const CustomDrawerContentComponent = (props) =>(
    <DrawerContentScrollView {...props}>
        <SafeAreaView 
            style={styles.container}
            forceInset={{ top:"always", horizontal:"never"}}
        >
            <View style={styles.drawerHeader}>
                <View style={{flex:1}}>
                    <Image 
                        source={require("./images/logo.png")}
                        style={styles.drawerImage}
                    />
                </View>
                <View style={{flex:2}}>
                    <Text style={styles.drawerHeaderText}>
                        Ristorante Confusion
                    </Text>
                </View>
            </View>
            <DrawerItemList {...props}/>
        </SafeAreaView>
    </DrawerContentScrollView>
)

class Main extends Component{
    unsubscribe = null;
    componentDidMount(){
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
        NetInfo.fetch()
        .then(state => {
            ToastAndroid.show("Initial Network Connectivity Type:" 
            + state.type, ToastAndroid.SHORT)

        });
        this.unsubscribe = NetInfo.addEventListener(state => this.handleConnectivityChange(state));
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    handleConnectivityChange = (state) => {
        switch(state.type){
            case 'none':
                ToastAndroid.show("You are offline!", ToastAndroid.SHORT);
                break;
            case 'wifi':
                ToastAndroid.show("You are on wifi network!", ToastAndroid.SHORT);
                break;
            case 'cellular':
                ToastAndroid.show("You are on cellular network!", ToastAndroid.SHORT);
                break;
            case 'unknown':
                ToastAndroid.show("You are on mars!", ToastAndroid.SHORT);
                break;
            default:
                break;
        }
    }

    render(){
        return(
            <Drawer.Navigator 
                drawerContent = { props => <CustomDrawerContentComponent {...props}/>}
                drawerContentOptions ={{
                    style: {
                        backgroundColor:'#D1C4E9'
                    },
                }}
                initialRouteName = "Home"
            >
                <Drawer.Screen 
                    name="Login" 
                    component={Login}
                    options={{
                        title:"Login",
                        drawerLabel:"Login",
                        drawerIcon:({tintColor})=> (
                            <Icon
                                name="sign-in"
                                type="font-awesome"
                                size={22}
                                color={tintColor}
                            />
                        )
                    }}
                />
                <Drawer.Screen 
                    name="Home" 
                    component={HomeNavigator}
                    options={{
                        title:"Home",
                        drawerLabel:"Home",
                        drawerIcon:({tintColor})=> (
                            <Icon
                                name="home"
                                type="font-awesome"
                                size={20}
                                color={tintColor}
                            />
                        )
                    }}
                />
                <Drawer.Screen 
                    name="About" 
                    component={AboutNavigator}
                    options={{
                        title:"About",
                        drawerLabel:"About",
                        drawerIcon:({tintColor})=> (
                            <Icon
                                name="info-circle"
                                type="font-awesome"
                                size={20}
                                color={tintColor}
                            />
                        )
                    }}
                />
                <Drawer.Screen 
                    name="Menu" 
                    component={MenuNavigator}
                    options={{
                        title:"Menu",
                        drawerLabel:"Menu",
                        drawerIcon:({tintColor})=> (
                            <Icon
                                name="list"
                                type="font-awesome"
                                size={20}
                                color={tintColor}
                            />
                        )
                    }}
                />
                <Drawer.Screen 
                    name="Contact" 
                    component={ContactNavigator}
                    options={{
                        title:"Contact Us",
                        drawerLabel:"Contact Us",
                        drawerIcon:({tintColor})=> (
                            <Icon
                                name="address-card"
                                type="font-awesome"
                                size={20}
                                color={tintColor}
                            />
                        )
                    }}
                />
                <Drawer.Screen 
                    name="My Favorites" 
                    component={FavoriteNavigator}
                    options={{
                        title:"My Favorites",
                        drawerLabel:"My Favorites",
                        drawerIcon:({tintColor})=> (
                            <Icon
                                name="heart"
                                type="font-awesome"
                                size={22}
                                color={tintColor}
                            />
                        )
                    }}
                />
                <Drawer.Screen 
                    name="Reserve Table" 
                    component={ReservationNavigator}
                    options={{
                        title:"Reserve Table",
                        drawerLabel:"Reserve Table",
                        drawerIcon:({tintColor})=> (
                            <Icon
                                name="cutlery"
                                type="font-awesome"
                                size={22}
                                color={tintColor}
                            />
                        )
                    }}
                />
            </Drawer.Navigator>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    drawerHeader:{
        backgroundColor:"#512DA8",
        height:140,
        alignItems: "center",
        justifyContent: "center",
        flex:1,
        flexDirection: "row",
    },
    drawerHeaderText:{
        color:"#ffffff",
        fontSize:24,
        fontWeight:"bold",
    },
    drawerImage:{
        margin:10,
        width:80,
        height:60,
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Main);