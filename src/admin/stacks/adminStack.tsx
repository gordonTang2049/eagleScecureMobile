import React, {
    useContext,
    useRef,
    useState,
    useEffect
} from 'react'
import { 
    Text, 
    TouchableOpacity, 
    FlatList, 
    Button
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack'
import {Center} from '../../comps/center'
import { AdminStackParamsList } from './adminStackParamsList';

import {AdminHomeScreen} from '../screens/adminHomeScreen'
import {RegisterScreen} from '../screens/registerScreen'
import {ClockinScreen} from '../screens/clockinScreen'
import {TagInspectScreen} from '../screens/tagInspectScreen'


const Stack = createStackNavigator<AdminStackParamsList>()

// RegisterScreen : undefined
// TagInspectScreen : undefined
// ClockinScreen : undefined
export const AdminStack : React.FC<AdminStackParamsList> = () => {
    return(
        <Stack.Navigator initialRouteName="AdminHomeScreen">
            <Stack.Screen
                options={{
                    // When test sucessful, use params to change header Title as User name 
                    headerTitle : "Admin Home"
                }}
                name="AdminHomeScreen"
                component={AdminHomeScreen}
            />
            <Stack.Screen
                options={{
                    headerTitle : "Register Tag"
                }}
                name="RegisterScreen"
                component={RegisterScreen}
            />
            <Stack.Screen
                options={{
                    headerTitle : "Clock-in"
                }}
                name="ClockinScreen"
                component={ClockinScreen}
            />
            <Stack.Screen
                options={{
                    headerTitle : "Inspect Tag"
                }}
                name="TagInspectScreen"
                component={TagInspectScreen}
            />
        </Stack.Navigator>
    )
}




// import { AuthContext } from './authProvider';
// import { HomeStackParamList, HomeStackNavProps } from 'homeStackParamsList';
// import { addProductRoutes } from 'addProductRoute';
// Children tabs need to type 
// e.g. 
// export type AdminParamsList = {

//     RegisterScreen : undefined => child Component 
//     TagInspectScreen : undefined => child Component 
//     ClockinScreen : undefined => child Component 
// }