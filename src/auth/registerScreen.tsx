import React from 'react'
import {

    Text,

    Button,

} from "react-native"
import { Center } from '../comps/center'
import { AuthParamList, AuthNavProps } from './authParamsList'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'

interface registerScreenProps {
    navigation: StackNavigationProp<AuthParamList, 'Register'>
    route: RouteProp<AuthParamList, 'Register'>
}


export const RegisterScreen: React.FC<registerScreenProps> = ({ navigation, route }) => {
    return (<Center>
        <Text>
            route name : {route.name} key : {route.key}
        </Text>
        <Text>
            This is register screen
                    </Text>

        <Button
            title="Back to Login Screen"
            onPress={() => {
                navigation.navigate("Login")
            }}
        />
    </Center>);
}  