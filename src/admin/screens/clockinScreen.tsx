import React, {
    useContext,
    useRef,
    useState,
    useEffect
} from 'react'
import {
    View,
    Text,
    Button,
    ScrollView
} from 'react-native';

import {
    fetchAllTagIDs
} from '../../api/firebase/firebaseHooks';
import {
    flatten,
    checkTagExists
} from '../../utilFunc/generalFunc';
import {
    useTheme,
    TextInput
} from 'react-native-paper';
import {
    Formik,
    Field,
    Form,
    useField,
    FieldAttributes,
    FieldArray,
    FieldArrayConfig,
    ArrayHelpers
} from "formik"
import { Center } from "../../comps/center"
import { ClockinNavProps } from "./clockinParamsList"
import {
    useSetReadTag,
    registerTag,
    cleanTag
} from '../../utilFunc/nfcOperation/tagOperations';

import {
    hasTagIdinClockInDb,
    hasTagIdInWSite,
    isRegisterTagId
} from '../../api/firebase/firebaseValidationFunc';
import { newClockInRecord } from '../../api/firebase/firebaseUpdateFunc';
import { initTagIdClockInDb } from '../../api/firebase/firebaseAddFunc';
import {generate} from 'shortid'


import NfcManager, {
    NfcEvents, Ndef,
} from 'react-native-nfc-manager';

interface Props {

}

// tem function for Demo Clock-in 
// later to build a structure for 
// register Tag Infor transfer to ClockIn Db



// tagLocation tagNum
// rearrange the information before submit

export const ClockinScreen: React.FC<ClockinNavProps<'ClockinScreen'>> = ({ navigation, route }) => {
    // fix the tag Id scanning 

    const scannedTagIdRef = useRef<string | null>()
    // scannedTagIdRef.current = scannedTagId


    const [isClockingIn, setIsClockingIn] = useState<boolean>(false)
    // ==== start Set Read Tag lifecycle 
    // const scannedTagId = useSetReadTag(null)

    // temporary
    const handleClockIn = async (scannedTagId : string | null) => {

        console.log('Handle Clock in Func is CLock in ')
        

        if(scannedTagId){

        console.log('Handle Clock in => scanner' + scannedTagId)
            
            const isRegister = await isRegisterTagId(scannedTagId)
            console.log('is register TagId ' + isRegister)
                if(isRegister){
                    // Later develop check year exist and check Worksite exist
                    const hasTagId = await hasTagIdInWSite('2020','kowloon',scannedTagId)
                        if(hasTagId){
                            const randId = generate()
                            const now = Date.now()
                            console.log('update record')
                            newClockInRecord('2020','kowloon',scannedTagId, 'StaffId_Dev007',`Smartphone009_${randId}_${now}`)
                        }else{
                            const randId = generate()
                            const now = Date.now()
                            console.log('create record')
                            initTagIdClockInDb('2020','kowloon',scannedTagId, 'StaffId_Dev007',`Smartphone001_${randId}_${now}`)
                        }
                }else{
                    console.log('This Tag has not been registered')
                }


        }

    }

    const nfcReadOperationStart = () => {

        NfcManager
            .setEventListener(NfcEvents.DiscoverTag, async (tag: any) => {

                // scannedTagIdRef.current = await tag.id
                
                handleClockIn(tag.id)
                cleanTag()
                
                console.warn(`Clock-In ID : ${tag.id} | Time : ${Date.now()}` )
            })
    }

    useEffect(() => {

        console.log('====================================================')
        // console.log('is Clock ' + isClockingIn)
        // console.log('Scannered Id ' + scannedTagId) // stop here when first get in screen
        console.log(' Nfc Manager is start')
        NfcManager.start()
        
        return () => {
            
            NfcManager
                .setEventListener(NfcEvents.DiscoverTag, null);
                
            cleanTag()
            
        console.log('Nfc End')
        console.log('====================================================')
        }
    }, [])

    

    return (
        <Center>
            {/* <Text> Scanned Tag ID : {scannedTagId} </Text> */}

            <Text>Scanned Tag : {scannedTagIdRef.current && scannedTagIdRef.current.toString()}</Text>
            <Text>  Is Scanning : {isClockingIn.toString()}</Text>
            <Text>  Is Tag Id registered  : {}</Text>
            <Button
                title="Clock-in"
                onPress={async () => {
                    // setIsClockingIn(true)
                    // const regiTag = await registerTag()
                    // regiTag
                    // handleClockIn(scannedTagId)
                    const op1 = await nfcReadOperationStart()
                    op1
                    registerTag()
                    
                }}
            />

            <Button
                title="Cancel Clock-in"
                onPress={() => {
                    cleanTag
                }}
            />


            <Button
                title="Go back to Admin Screen"
                onPress={() => {
                    navigation.goBack()
                }}
            />
        </Center>

    )
}


// ============================================================================
    // async function temClockIn(scannedTagId: string | null) {

    //     if (scannedTagId) {
    //         const hasRecordInClockin = await hasTagIdinClockInDb('2020', 'kowloon', scannedTagId)

    //         console.log(isRegisterTagId(scannedTagId))
            
    //         if (isRegisterTagId(scannedTagId)) {
    //             if (!hasRecordInClockin) {
    //                 initTagIdClockInDb('2020', 'kowloon', scannedTagId, 'staffId_dev01', 'phoneId_smart01')
    //             } else {
    //                 newClockInRecord('2020', 'kowloon', scannedTagId, 'staffId_dev01', 'phoneId_smart01')
    //             }

    //         } else {
    //             console.log('invalid Tag Id')
    //             setIsClockingIn(false)
    //         }
    //     }

    //     setIsClockingIn(false)
    // }
// ============================================================================


/*
                Doc
clockInDB => year (2020_2021) => worksiteName => tagId1 => employeeID
                                                           ServerTimeStamp
                                                           PhoneTimeStamp



    Normal Life cycle
=====================================================
    Start
    1. start NFC UseEffect
    2. start Register screen
    3. Fetching data in Register screen useEffect

After pressing add button, it won't run the cycle

    and then starts of register tag function

    b1. NFC useEffect ends
    b2. start NFC useEffect
=====================================================

    End
    1. end NFC UseEffect
    2. end Register screen

    For some reason it starts once more
    a1. start NFC UseEffect
    a2. start Register screen
    a3. Fetching data in Register screen useEffect
===================================================

Closure problem


Possible solution
  1. useref inject TagId into Field array value
     drawback => it will mess up the

   2. A call back function in useEffect?

    useCallback function + if TagId is not null

*/

/*
    name={name}
    value={p.firstname}
    onChange={handleChange}
*/
/*
    const input = ({field, form: {errors } }: FieldProps) => {
        // can be
            const errorMessage = getIn(errors, name)

        return (
            <View>
            <TextInput
                {...field}
            />
            {errorMessage && (<Text>{errorMessage}</Text>)}
            </View>
        )
    }



    <ScrollView>
            <Text>Test Formik Array Field</Text>
            <Text> 1. want to have no initialValues until I scanned the Tag </Text>
            <Text> 2. want to have no initialValues until I scanned the Tag </Text>
            <Formik

                initialValues={{
                    tagsInfor: [{ tagId: "10", tagLocation: "", tagNum: "" }]
                }}
                onSubmit={(values, { setSubmitting }) => {

                }}

            >{({ values, errors, handleSubmit, handleChange }) => (

                <View>
                    <FieldArray name="tagsInfor">

                        {(arrayHelpers: ArrayHelpers): any => (
                            <View>
                                {values.tagsInfor.map((tag, idx) => {
                                    return (
                                        <View key={tag.tagId}>

                                            <Text>{tag.tagId}</Text>

                                            <TextInput
                                            key={tag.tagId}
                                                label="Tag Location"
                                                mode="outlined"
                                                name={`tagsInfor[${idx}].tagLocation`}
                                                value={tag.tagLocation}
                                                onChangeText={handleChange(`tagsInfor[${idx}].tagLocation`)}
                                            />
                                            <TextInput
                                                label="Tag Number"
                                                mode="outlined"
                                                name={`tagsInfor[${idx}].tagNum`}
                                                value={tag.tagNum}
                                                onChangeText={handleChange(`tagsInfor[${idx}].tagNum`)}
                                            />
                                        </View>
                                    )
                                })}
                                <Button
                                    title="Add Tag"
                                    onPress={() => {
                                        arrayHelpers.push({
                                            tagId: generate(),
                                            tagLocation: "",
                                            tagNum: ""
                                        })
                                    }}
                                />
                            </View>
                        )}

                    </FieldArray>
                    <Text>
                        {JSON.stringify(values, null, 2)}
                    </Text>
                </View>
            )}
            </Formik>

            <Button
                title="Back to Admin home screen"
                onPress={() => {
                    navigation.goBack()
                }}
            />

        </ScrollView>

*/



