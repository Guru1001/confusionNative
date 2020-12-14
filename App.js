import 'react-native-gesture-handler';
import React from "react";
import Main from "./components/MainComponent";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";
import { PersistGate } from 'redux-persist/es/integration/react'
import { Loading }  from './components/LoadingComponent'

const { persistor, store } = ConfigureStore();

export default class App extends React.Component{
    render(){
        return (
            <NavigationContainer>
                <Provider store={store}>
                    <PersistGate
                        loading={<Loading/>}
                        persistor={persistor}
                    >
                        <Main/>
                    </PersistGate>
                </Provider>
            </NavigationContainer>
        );
    }
}
