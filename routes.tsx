
import React, {
    useContext,
    useState,
    useEffect
} from "react"
import {

    ActivityIndicator

} from "react-native"

// import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import {
    AuthContext,
    pendingContext
} from "./src/auth/authProvider"

import {
    AuthContextType,
    PendingContextType
} from './src/auth/authParamsList'

import { AdminStack } from './src/admin/stacks/adminStack'
import { AuthStack } from './src/auth/authStack'
import { Center } from './src/comps/center'
import { AdminStackParamsList } from "./src/admin/stacks/adminStackParamsList"

interface RoutesProps {
}

// could be conditional type of 

export const Routes: React.FC<RoutesProps> = () => {

    //  current  no bracket or bracket need to understand 
    // what context is returning and what useMemo is returning 
    const currentUser = useContext<AuthContextType>(AuthContext)
    
    // const pending = useContext<PendingContextType>(pendingContext)
    // if (currentUser) {
    //     console.log('pass')
    //     return <ActivityIndicator size='large' />
    // }

    
    return currentUser.currentUser
        ? ( <AdminStack />  )
        : ( <AuthStack />   )

}

/*
    Tenary Operator note 

    When condition fulfil
    it will stop in there, 
    don't mess up with
        if is currentUser.currentUser true 
            then it will stop in Layer => checkWhetherTrue 
                and return whatever checkWhetherTrue 
    
    if currentUser.currentUser is false,
        it goes to checkWhetherFalse but not stop in here 
            and then flow true to <C_Stack /> 
            or false to <D_Stack />
                
    currentUser.currentUser
    ?   ( checkWhetherTrue  )
    :   ( checkWhetherFalse  )
    ?   ( <C_Stack />  )
    :   ( <D_Stack />  )

*/
