import React, {
    useContext
} from 'react';
import {
    TouchableWithoutFeedback,
    Keyboard,
    View,
    Text
} from 'react-native';

import {
    useTheme,
    TextInput,
    Button
} from 'react-native-paper';

import {
    Formik
} from 'formik';

// import { theme } from 'src/theme/default';
import { Center } from '../comps/center'
import { LoginInputParamsList } from './loginParamsList'

import { AuthNavProps } from './authParamsList'
import auth from '@react-native-firebase/auth';

import {
    AuthContext,
    pendingContext
} from "./authProvider"

import {
    AuthContextType,
    PendingContextType
} from './authParamsList'

interface loginScreenProps {

}

export const LoginScreen: React.FC<AuthNavProps<'Login'>> = ({ navigation, route }) => {
    const currentUser = useContext<AuthContextType>(AuthContext)

    return (


        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Formik
                initialValues={{ username: '', password: '' }}

                onSubmit={(values, { setSubmitting }) => {

                    try {
                        const username =
                            values.username
                                .toLowerCase()
                                .trim()
                        const password =
                            values.password
                                .trim()
                        auth()
                            .signInWithEmailAndPassword(username, password)
                            .then(() => {
                                    
                                console.log(values.username);
                                console.log(values.password);
                                console.log('signed in!');

                            })

                    } catch (error) {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(`Errors => ${errorCode} ${errorMessage}`)
                    }

                }}
            >
                {({ values, errors, isSubmitting, handleSubmit, handleChange }) =>
                    <View>
                        <TextInput
                            label="username"
                            onChangeText={handleChange('username')}
                            mode="outlined"
                            value={values.username}
                        />
                        <TextInput
                            label="password"
                            onChangeText={handleChange('password')}
                            mode="outlined"
                            value={values.password}
                            secureTextEntry={true}
                        />
                        
                        <Button
                            icon="account-box"
                            mode="contained"
                            onPress={handleSubmit}
                        >
                            Submit
                        </Button>

                        <Text>{JSON.stringify(values, null, 2)} </Text>
                        <Text>{isSubmitting.toString()} </Text>
                        <Text>{JSON.stringify(currentUser, null, 2)} </Text>

                    </View>
                }

            </Formik>
        </TouchableWithoutFeedback>

    )


}

//{/* <Text style={styles.item}> {item.name} </Text> */}




// export const LoginScreen : React.FC<{}> = ()  =>{
//     const { colors } = useTheme();

//     const userInputRef = useRef<{}>(null)
//     const [input, setInput] = useState<LoginInputParamsList>({
//                                         username : '',
//                                         password : ''
//                                 })


//     return(
//         <>      

//                 <Center>
//                     <Text style={{color : colors.primary}}> Testing </Text>  
//                 </Center>

//                 <TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
//                     <View>
//                         <TextInput 
//                             ref={userInputRef}
//                             label="username"
//                             value={input.username}
//                             // onChangeText={}
//                         />
//                         <TextInput 
//                             label="password"
//                             value={input.password}
//                             // onChangeText={}
//                         />
//                     </View>
//                 </TouchableWithoutFeedback>

//         </>
//            )
// }