import { StackNavigationProp } from "@react-navigation/stack"
import { RouteProp } from "@react-navigation/native"



// concat param list 
export type AdminHomeStackParamList = {
    AdminHomeScreen : undefined
    RegisterScreen : undefined
    TagInspectScreen : undefined
    ClockinScreen : undefined

} 


export type AdminStackNavProps<T extends keyof AdminHomeStackParamList> = {
        navigation : StackNavigationProp<AdminHomeStackParamList,T>;
        route :      RouteProp<AdminHomeStackParamList, T>
    
}


    