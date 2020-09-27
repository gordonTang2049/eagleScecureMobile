import React, {
    useContext,
    useRef,
    useState,
    useEffect
} from 'react'
import {
    useTheme,
    TextInput
} from 'react-native-paper';

import {
    View,
    Text,
    Button,
    ScrollView
} from 'react-native';
import { Center } from "../../comps/center"
import { TagInspectNavProps } from "./tagInspectParamsList"

import { ClockinNavProps } from "./clockinParamsList"

import { createIconSetFromFontello } from 'react-native-vector-icons';

import { hasTagIdinClockInDb} from '../../api/firebase/firebaseValidationFunc';
import { newClockInRecord } from '../../api/firebase/firebaseUpdateFunc';
import {initTagIdClockInDb } from '../../api/firebase/firebaseAddFunc';

import { fetchWsites } from '../../api/firebase/firebaseFetchFunc';
// import { hasBusYear } from '../../api/firebase/firebaseHooks';


interface Props {
}


// tem function for Demo Clock-in 
// later to build a structure for 
    // register Tag Infor transfer to ClockIn Db

async function temClockIn(scannedTagId : string ){
    // pre set year
    // 
   const hasRecordInClockin = await hasTagIdinClockInDb('2020','kowloon',scannedTagId)

   !hasRecordInClockin 
   ? initTagIdClockInDb('2020', 'kowloon', scannedTagId, 'staffId_dev01', 'phoneId_smart01')
   : newClockInRecord('2020', 'kowloon', scannedTagId, 'staffId_dev01', 'phoneId_smart01')

}


export const TagInspectScreen: React.FC<TagInspectNavProps<'TagInspectScreen'>> = ({ navigation, route }) => {

    return (
        <ScrollView>
            <Text>Test empty initialValues </Text>

            <Button
                title="Fetch All ClockIN testing"
                onPress={ async  ()=>{

                    
                    
                }}
            />

            <Button
                title="Back to Admin home screen"
                onPress={() => {
                    navigation.goBack()
                }}
            />

        </ScrollView>
    )
}