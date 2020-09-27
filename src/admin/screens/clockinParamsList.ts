import { StackNavigationProp } from "@react-navigation/stack"
import { RouteProp } from "@react-navigation/native"
import {AdminHomeStackParamList} from "./adminHomeParamsList"


export type ClockinNavProps<T extends keyof AdminHomeStackParamList> = {
        navigation : StackNavigationProp<AdminHomeStackParamList,T>;
        route :      RouteProp<AdminHomeStackParamList, T>
    
    }