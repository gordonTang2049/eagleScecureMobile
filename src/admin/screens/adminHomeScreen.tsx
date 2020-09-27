import React, {
    useContext
} from 'react'
import {
    Text,
    Button,
    ScrollView
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { Center } from "../../comps/center"
import { AdminStackNavProps } from './adminHomeParamsList'

// ===============================
import {
    AuthContextType
} from '../../auth/authParamsList'

import {
    AuthContext
} from "../../auth/authProvider"

// ===============================
interface AdminHomeScreenProps {

}

export const AdminHomeScreen: React.FC<AdminStackNavProps<'AdminHomeScreen'>> = ({ navigation, route }) => {
    const currentUser = useContext<AuthContextType>(AuthContext)


    const signOut = () => {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    }

    return (
        <ScrollView>
            <Center>

                <Button
                    title="Register Tag"
                    onPress={() => {
                        // 
                        navigation.navigate("RegisterScreen")
                    }}
                />

                <Button
                    title="Clock-in"
                    onPress={() => {
                        navigation.navigate("ClockinScreen")
                    }}
                />

                <Button
                    title="Inspect Tag"
                    onPress={() => {
                        navigation.navigate("TagInspectScreen")
                    }}
                />
                
                <Button
                    title="Sign out"
                    onPress={signOut}
                />
                <Text>{JSON.stringify(currentUser, null, 2)} </Text>
                <Text>{typeof currentUser}</Text>

            </Center>
        </ScrollView>
    )
}