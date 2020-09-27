import firestore from '@react-native-firebase/firestore';
import { doc } from 'prettier';
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

export const getAllTagId = async () => {

    let dataSet: any[] = []

    await firestore()
        .collection('worksite')
        .get()
        .then(querySnapshot => {

            querySnapshot.forEach(doc => {

                const resp = doc.data()

                if (resp.hasOwnProperty('tagsInfor')) {
                    const tagId = Object.keys(resp.tagsInfor)
                    dataSet.push(tagId)

                }

            })

        })

    return dataSet
}

export const registerTag = async () => {

    let dataSet: any[] = []

    await firestore()
        .collection('worksite')
        .get()
        .then(querySnapshot => {

            querySnapshot.forEach(doc => {

                const resp = doc.data()

                if (resp.hasOwnProperty('tagsInfor')) {
                    const tagId = Object.keys(resp.tagsInfor)
                    dataSet.push(tagId)

                }

            })

        })

    return dataSet
}

// update => update the existing document

export const updateSingleTag = async (
    worksiteName: string,
    tagId: string,
    tagLocation: string,
    tagNum: number
) => {

    const map = new Map([
        [tagId, {
            'tagLocation': tagLocation,
            'tagNum': tagNum
        }]
    ])

    const obj = Object.fromEntries(map)

    firestore()
        .collection('worksite')
        .doc(worksiteName)
        .update(obj)
        .then(() => {
            console.log(`${worksiteName} ${tagId} ${tagLocation} updated`);
        });
}

export const fetchAllTagIDs = async (worksiteName: string) => {

    const fetchedData = await firestore()
        .collection('worksite')
        .doc(worksiteName)
        .get()
        .then((documentSnapshot) => {

            let dataSet: string[] | undefined = []
            const resp = documentSnapshot.data()

            if (resp) {
                dataSet = Object.keys(resp)
            }

            return dataSet
        })

    return fetchedData
}

// ClockIn db=========================================

export const fetchAllClockInDbYears = async () =>{

    const dataSet = await firestore()
        .collection('clockInDb')
        .get()
        .then(querySnapshot => {
            const recordDocYears : string[] = []

            querySnapshot.forEach(documentSnapshot => {

                recordDocYears.push(documentSnapshot.id)
            })

            return recordDocYears
        })

    return dataSet
} 


// ==========================================================


// later cache the register tagID
// cache Register Tag ID Information to 

// year should be changable
// export const clockInRecord = async (tagId: string, staffId: string, phoneUniId : string) => {
//     const phoneNServerTime = {
//         phoneTime_createdAt: Date.now(),
//         serverTime_createdAt: firestore.FieldValue.serverTimestamp(),
//         staffId : staffId
//     }

//     const map = new Map([
//         [phoneUniId, phoneNServerTime]
//     ])

//     const Obj = Object.fromEntries(map)

//     const data = await firestore()
//         .doc(`clockInDb/2020/kowloon/${tagId}`)
//         .update(Obj)
//         .catch(e => console.log(e))

//     return data
// }




//         createdAt: firestore.FieldValue.serverTimestamp()

//     const addData = await firestore()
//         .collection('testing')
//         .add(food)
//         .collection('testing')
//         .then(snapshot => console.log(snapshot))
//         .catch(error => console.log(error))

//     return addData

// }


// testing=====================
export const testing1 = async () => {
    const data = await firestore()
        .collection('clockInDb/2020_2021/kowloon')
        .get()
        .then((querySnapshot) => {

            querySnapshot.docs.forEach((doc) => console.log(doc.data()))

        });

    return data
}
// testing=====================