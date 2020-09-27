// React.Context<null>.Provider: React.Provider<null>
import { StackNavigationProp } from "@react-navigation/stack"
import { RouteProp } from "@react-navigation/native"
import { FirebaseAuthTypes } from "@react-native-firebase/auth"
import {
  Dispatch,
  SetStateAction,
  DependencyList
} from 'react'



// pages type 
export type AuthParamList = {
  Login: undefined
  Register: undefined

}

// T => it is taking that generic ,  Because we don't know  what the page name is
//  it expect T as key => so to extend the AuthParamList => component name

export type AuthNavProps<T extends keyof AuthParamList> = {
  navigation: StackNavigationProp<AuthParamList, T>;
  route: RouteProp<AuthParamList, T>
}

export type initialAuthContext = FirebaseAuthTypes.User | null

export type AuthContextType = any | {
  currentUser: initialAuthContext
  setCurrentUser : Dispatch<SetStateAction<initialAuthContext>>
  
}


// =========================================================================
export type IsAdminContextType = null | false | {
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>
  isAdmin: boolean
}

export type PendingContextType = null | false | {
  setPending: React.Dispatch<React.SetStateAction<boolean>>
  Pending: boolean
}

