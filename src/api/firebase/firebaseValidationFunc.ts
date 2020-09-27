import {
    fetchAllRegisterTagIds,
    fetchAllClockInDbYears
} from './firebaseHooks'
import firestore from '@react-native-firebase/firestore';


export const isRegisterTagId = async (tagId: string | null) => {

    if(tagId){
        const allRegisterTagIds = await fetchAllRegisterTagIds()

        
        const isRegistered = allRegisterTagIds.includes(tagId)

        

        return isRegistered
    }else{
        return false
    }

}

// clockIn Validation==========================

export const hasBusYear = async (year: string) => {

    const allYears = await fetchAllClockInDbYears()

    const hasYear = allYears.includes(year)

    return hasYear

}

export const hasWSites = async (year: string) => {

    const isWsitesExist = await firestore()
        .collection('clockInDb')
        .doc(year)
        .get()
        .then(documentSnapshot => {
            return documentSnapshot.exists
        })
        .catch(e => console.log(e))

    return isWsitesExist
}

export const hasTagIdInWSite = async (
    year: string,
    worksite: string,
    tagId: string
) => {

    const hasTagId = await firestore()
        .doc(`clockInDb/${year}/${worksite}/${tagId}`)
        .get()
        .then(doc => {
            return doc.exists
        })
        .catch(e => console.log(e))

    return hasTagId
}


// ClockInDB if no then give 

export const hasTagIdinClockInDb = async (
    year: string,
    worksite: string,
    tagId: string
) => {

    const hasTagId = await firestore()
        .doc(`clockInDb/${year}/${worksite}/${tagId}`)
        .get()
        .then(documentSnapshot => {
            return documentSnapshot.exists
        })
        .catch(e => console.log(e))

    return hasTagId
}
