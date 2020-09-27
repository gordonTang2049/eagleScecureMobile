import React, {
    useCallback,
    useRef,
    useState,
    useEffect
} from 'react'
import {
    View,
    Text,
    Button,
    ScrollView,
    StyleSheet
} from 'react-native';
import { Center } from "../../comps/center"
import { RegisterNavProps } from './registerParamsList'
import {
    useSetReadTag,
    registerTag,
    cleanTag
} from '../../utilFunc/nfcOperation/tagOperations';
import {
    updateSingleTag,
    getAllTagId
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

const styles = StyleSheet.create({
    textField: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "flex-start"

    },
    childTextField: {
        flex: 1
    }

});

interface Props {

}

interface Tag {

}


export const RegisterScreen: React.FC<RegisterNavProps<'RegisterScreen'>> = ({ navigation, route }) => {

    const [fetchedData, setFetchedData] = useState<object | null>(null)
    const [isTagExists, setIsTagExists] = useState<boolean>(false)
    // const [scannedTagIdInfor, setScannedTagIdInfor] = useState<string | null | undefined>(null)

    const scannedTagId = useSetReadTag(null)

    const scannedTagIdRef = useRef<string | null>()

    scannedTagIdRef.current = scannedTagId

    useEffect(() => {
        console.log('=====================================================')
        console.log('regsiter screen start')

        const fetching = async () => {

            console.log('Fetching Firebase data +++++++++++++')

            const data = await getAllTagId()

            const flattenedData = flatten(data)

            setFetchedData(flattenedData)

            // console.log(checkTagExists(tagId, data))

        }

        fetching()

        // setScannedTagIdInfor(scannedTagIdRef.current)


        return () => {
            // setScannedTagIdInfor(null)
            console.log('regsiter screen end')
            console.log('=====================================================')
        }

    }, [scannedTagIdRef.current])

    return (
        <ScrollView>

            <Text>This is Register Screen</Text>

            {/* =============================================================== */}
            <Formik

                initialValues={{
                    tagsInfor: []
                }}
                onSubmit={(values, { setSubmitting }) => {
                    try {
                        
                        values.tagsInfor.forEach((tag) : void =>{
                            updateSingleTag('kowloon', tag.tagId, tag.tagLocation, tag.tagNum)
                            console.log(`${tag.tagId} ${tag.tagLocation} ${tag.tagNum} has been updated`)   
                        })


                    } catch (e) {
                        console.log(e)
                    }
                }}

            >{({ values, errors, handleSubmit, handleChange }) => (

                <View>
                    <FieldArray name="tagsInfor">

                        {(arrayHelpers: ArrayHelpers): any => (
                            <View>
                                {values.tagsInfor && values.tagsInfor.map((tag, idx) => {
                                    return (
                                        <>
                                            <Text>{tag.tagId}</Text>
                                            <View style={styles.textField} >
                                                <TextInput
                                                    style={styles.childTextField}
                                                    key={tag.tagId}
                                                    label="Tag Location"
                                                    mode="outlined"
                                                    name={`tagsInfor[${idx}].tagLocation`}
                                                    value={tag.tagLocation}
                                                    onChangeText={handleChange(`tagsInfor[${idx}].tagLocation`)}
                                                />
                                                <TextInput
                                                    style={styles.childTextField}
                                                    label="Tag Number"
                                                    mode="outlined"
                                                    name={`tagsInfor[${idx}].tagNum`}
                                                    value={tag.tagNum}
                                                    onChangeText={handleChange(`tagsInfor[${idx}].tagNum`)}
                                                    keyboardType="numeric"
                                                />
                                            </View>
                                        </>
                                    )

                                })}

                                {
                                    // if Current Scanned tag and tag Id is not repeated
                                    (scannedTagIdRef.current && !values.tagsInfor.map(tag => tag.tagId).includes(scannedTagIdRef.current))
                                        ? arrayHelpers.push({
                                            tagId: scannedTagIdRef.current,
                                            tagLocation: "",
                                            tagNum: ""
                                        })
                                        : null
                                }

                                <Button
                                    title="Add Tag"
                                    onPress={() => {
                                        console.log(scannedTagIdRef.current)
                                        registerTag()
                                    }}
                                />

                            </View>
                        )}

                    </FieldArray>

                    <Text>
                        {JSON.stringify(values, null, 2)}
                    </Text>

                    <Button
                        title="Submit Tag Information"
                        onPress={handleSubmit}
                    />

                </View>
            )}
            </Formik>
            {/* =============================================================== */}

            <Button
                title="Go back to Admin Screen"
                onPress={() => {
                    navigation.goBack()
                }}
            />
            <View>
                {/* <Button
                    title="Read Tag"
                    onPress={registerTag}
                /> */}
                <Button
                    title="Cancel Register Tag"
                    onPress={cleanTag}
                />

                <Text>{scannedTagId && scannedTagId}</Text>
                <Text>{fetchedData && JSON.stringify(fetchedData)}</Text>

            </View>
        </ScrollView>
    )
}