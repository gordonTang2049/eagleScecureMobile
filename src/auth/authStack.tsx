import React, {
    useContext
} from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import { AuthParamList } from "./authParamsList"
import { LoginScreen } from './loginScreen'
import { RegisterScreen } from './registerScreen'


interface authProps {

}


const Stack = createStackNavigator<AuthParamList>()


export const AuthStack: React.FC<authProps> = () => {
    return (<Stack.Navigator
        // screenOptions={{
        //     header : () => null
        // }}  
        initialRouteName="Login"
    >
        {/* name is type safe, when you miss type the page name, it will remind you  */}
        <Stack.Screen name="Login" component={LoginScreen}
        // Set up options
        // options={{header : () => null }}
        />

        {/*   Register Screen headerTitle Becomes sign up  */}

        <Stack.Screen options={{
            headerTitle: "Sign Up"
        }}
            name="Register"
            component={RegisterScreen}
        />

    </Stack.Navigator>);
}