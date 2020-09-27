import firestore from '@react-native-firebase/firestore';



// clockIn =============================
// first time adding TagId to Worksite

export const initTagIdClockInDb = async (
    year: string,
    worksite: string,
    tagId: string,
    staffId: string,
    phoneUniId: string
) => {
    const phoneNServerTime = {
        staffId: staffId,
        phoneTime_createdAt: Date.now(),
        serverTime_createdAt: firestore.FieldValue.serverTimestamp()

    }

    const map = new Map([
        [phoneUniId, phoneNServerTime]
    ])

    const Obj = Object.fromEntries(map)

    const dataSet = await firestore()
        .doc(`clockInDb/${year}/${worksite}/${tagId}`)
        .set(Obj)
        .then(() => {
            console.log(`Created 
            Year : ${year} 
            Worksite : ${worksite}
            TagId : ${tagId}
            `)
        })
        .catch(e => console.log(e))

    return dataSet

}

// Add => random Document ID
// Set => your Own Document ID 

// first time adding WorkSite 
export const addWSites = async (
    year: string,
    worksite: string
) => {
    const wSites = firestore()
        .collection('clockInDb')
        .doc(year)
        .set({
            wSites: worksite
        })
        .catch(e => console.log(e))

    return wSites
}


// export const addTagIdInWSites = async (
//     year: string,
//     worksite: string,
//     tagId : string
// ) => {
    
//     const addedTagId = firestore()
//         .doc(`clockInDb/${year}/${worksite}/${tagId}`)
//         .set({})
//         .catch(e => console.log(e))

//     return addedTagId
// }

// =========================================

// test ======================================
export const addtest = async () => {
    const phoneNServerTime = {
        phoneTime_createdAt: Date.now(),
        serverTime_createdAt: firestore.FieldValue.serverTimestamp(),
        staffId: 'staffid1232'
    }

    const map = new Map([
        ['tag123123', phoneNServerTime]
    ])

    const Obj = Object.fromEntries(map)

    const dataSet = await firestore()
        .doc('clockInDb/2020/hongkong/tag343433')
        .set(Obj)
    return dataSet

}
// test ======================================