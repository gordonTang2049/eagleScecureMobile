import firestore from '@react-native-firebase/firestore';
import { flatten } from '../../utilFunc/generalFunc';


export const fetchAllWorksiteName = async () => {

    const dataSet = await firestore()
        .collection('worksite')
        .get()
        .then(querySnapshot => {
            const workSiteNames: string[] = []

            querySnapshot.forEach(documentSnapshot => {

                workSiteNames.push(documentSnapshot.id)
            })
            return workSiteNames
        })

    return dataSet

}

export const fetchAllRegisterTagIds = async () => {

    const dataSet = await firestore()
        .collection('worksite')
        .get()
        .then(querySnapshot => {
            const tagIds: any[][] = []

            querySnapshot.forEach(documentSnapshot => {

                tagIds.push(Object.keys(documentSnapshot.data()))
            })
            return tagIds
        })

    const flattenDataSet = flatten(dataSet)

    return flattenDataSet

}

// =ClockIn===========================

export const fetchWsites = async (year: string) => {

    // extend type (Fix it)
    const dataSet = await firestore()
        .collection('clockInDb')
        .doc(year)
        .get()
        .then(documentSnapshot => {

            return documentSnapshot.data().wSites
        })
        .catch(e => console.log(e))

     
    return dataSet
}



