import {
    useState,
    useEffect
} from 'react'
import NfcManager, {
    NfcEvents, Ndef,
} from 'react-native-nfc-manager';


export const cleanTag = () => {

    NfcManager
        .unregisterTagEvent()
        .catch(e => console.log(e))

    console.warn('NFC Tag Cancelled')
}

export const useSetReadTag = (defaultVal: null | string) => {

    // Generic or TagID Type 
    const [tagId, setTagId] = useState(defaultVal)

    const nfcReadOperationStart = () => {

        NfcManager.start()

        NfcManager
            .setEventListener(NfcEvents.DiscoverTag, async (tag: any) => {

                setTagId(tag.id)
                cleanTag()
            })
    }

    useEffect(() => {
        // 1. first lifecycle running ========================
        console.log('----------------------------------------------------')
        console.log('Start => Set read NFC useeffect')

        nfcReadOperationStart()
        // 1. first lifecycle running ========================
        return () => {

            console.log('End => Set read NFC useeffect')
            console.log('----------------------------------------------------')
            NfcManager
                .setEventListener(NfcEvents.DiscoverTag, null);

            cleanTag()
        }
    }, [tagId])

    return tagId
}

export const registerTag = async () => {

    try {

        NfcManager
            .registerTagEvent()

        console.warn('Tag is registering')

    } catch (ex) {

        cleanTag()

        console.warn('There is an error on Register Tag ', ex)
    }

}
