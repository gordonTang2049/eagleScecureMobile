import { StackNavigationProp } from "@react-navigation/stack"
import { RouteProp } from "@react-navigation/native"
import {AdminHomeStackParamList} from "./adminHomeParamsList"


export type RegisterNavProps<T extends keyof AdminHomeStackParamList> = {
        navigation : StackNavigationProp<AdminHomeStackParamList,T>;
        route :      RouteProp<AdminHomeStackParamList, T>
    
    }