import React, {
    useState,
    useEffect,
    createContext,
    useMemo,
    ProviderProps
} from 'react';
import { useTheme } from 'react-native-paper';
import {
    AuthContextType,
    initialAuthContext,
    IsAdminContextType,
    PendingContextType
} from './authParamsList'

import auth from '@react-native-firebase/auth';

export const AuthContext = createContext<initialAuthContext>(null)

export const isAdminContext = createContext<IsAdminContextType>(null)
export const pendingContext = createContext<PendingContextType>(null)


interface AuthProviderProps {

}


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    // useState dont know how to type

    const [currentUser, setCurrentUser] = useState<initialAuthContext>(null)

    const userProvider = useMemo<AuthContextType>(
        () => ({ currentUser, setCurrentUser }), [currentUser, setCurrentUser]
    )

        
    const [isAdmin, setIsAdmin] = useState(false);

    const isAdminProvider = useMemo<IsAdminContextType>(
        () => ({ isAdmin, setIsAdmin }), [isAdmin, setIsAdmin]
    )

    const [pending, setPending] = useState<any>(null)

    useEffect(() => {

        const subscriber = auth()
            // every paramerter must have a return type checking 
            // otherwise it would complain
            .onAuthStateChanged((user: React.SetStateAction<initialAuthContext>) => {

                setCurrentUser(user)
                // if (user) {
                //     const userEmail = user.providerData[0].email
                //     setIsAdmin(userEmail === "admin@admin.com")
                // }

                setPending(false)
            })
        return subscriber
    }, [])

    return (
        <isAdminContext.Provider
            value={isAdminProvider}
        >
            {/* How to type it passing the entire object
            How to pass generic type of Object
            userProvider.currentUser => it works because it is 
        */}
            <AuthContext.Provider
                value={userProvider}
            >
                <pendingContext.Provider
                    value={pending}
                >
                    {children}
                </pendingContext.Provider>
            </AuthContext.Provider>
        </isAdminContext.Provider>
    )
}



//{/* <Text style={styles.item}> {item.name} </Text> */}