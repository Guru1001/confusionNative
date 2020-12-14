import React, { Component } from "react";
import { Text, View, Alert, StyleSheet, Switch, Button, Modal } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";
import * as Animatable from 'react-native-animatable';

class Reservation extends Component{
    constructor(props){
        super(props);
        this.state = {
            guests : 1,
            smoking: false,
            date   : new Date().toLocaleString(),
            isDatePickerVisible: false,
        }
    }
    handleReservation(){
        Alert.alert(
            'Your Reservation OK?',
            'Number of Guests : ' + this.state.guests +
            '\nSmoking? '+ this.state.smoking +
            '\nDate and Time : ' + this.state.date,
            [
                {
                    text : 'Cancel',
                    onPress : () => this.resetForm(),
                    style: 'cancel'
                },
                {
                    text: 'Ok',
                    onPress: () => this.resetForm(),
                }
            ],
            { cancelable: false }
        );
    }

    resetForm(){
        this.setState({
            guests   : 1,
            smoking  : false,
            date     : new Date().toLocaleString(),
            isDatePickerVisible: false,
        });
    }
    render(){
        return(
            <Animatable.View animation='zoomIn' duration={1000} delay={1000}>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Guests</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue = {this.state.guests}
                        onValueChange = {
                            (itemValue, itemIndex)=>this.setState({guests:itemValue})
                        }
                    >
                        <Picker.Item label="1" value="1"/>
                        <Picker.Item label="2" value="2"/>
                        <Picker.Item label="3" value="3"/>
                        <Picker.Item label="4" value="4"/>
                        <Picker.Item label="5" value="5"/>
                        <Picker.Item label="6" value="6"/>
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                    <Switch
                        style={styles.formItem}
                        value = {this.state.smoking}
                        trackColor = {{ true : "#512DA8", false: "grey"}}
                        onValueChange = {
                            (value)=>this.setState({smoking:value})
                        }
                    >
                    </Switch>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date and Time</Text>
                    <Text style={styles.formItem}
                        onPress={()=>this.setState({
                            isDatePickerVisible: true})}
                    >{this.state.date}</Text>
                    <DateTimePickerModal
                        style={{flex : 2, marginRight : 20}}
                        isVisible={this.state.isDatePickerVisible}
                        onConfirm={(date) => this.setState({
                            date: date.toLocaleString(),
                            isDatePickerVisible: false,
                        })}
                        onCancel={()=>this.setState({
                            isDatePickerVisible: false})}
                        mode="datetime"
                        date = {new Date()}
                        minimumDate = {new Date()}
                    />
                </View>
                <View style={styles.formRow}>
                    <Button
                        title = "Reserve"
                        color = "#512DA8"
                        onPress = {() => this.handleReservation()}
                        accessibilityLabel = "Learn more about this purple button"
                    />
                </View>
            </Animatable.View>
        );
    }
}

const styles = StyleSheet.create({
    formRow : {
        alignItems : "center",
        justifyContent: "center",
        flex : 1,
        flexDirection: "row",
        margin: 20,
    },
    formLabel : {
        fontSize :18,
        flex : 2,
    },
    formItem : {
        flex : 1,
    },
    modal: {
        justifyContent: "center",
        margin: 20
    },
    modalTitle:{
        fontSize:24,
        fontWeight:"bold",
        backgroundColor:"#512DA8",
        textAlign:"center",
        color: "white",
        marginBottom:20,
    },
    modalText:{
        fontSize:18,
        margin:10
    }
});

export default Reservation;