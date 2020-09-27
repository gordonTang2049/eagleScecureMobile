import firestore from '@react-native-firebase/firestore';


// ClockIn ===========================================
export const newClockInRecord = async (
    year: string,
    worksite: string,
    tagId: string,
    staffId: string,
    phoneUniId: string) => {

    const phoneNServerTime = {
        staffId: staffId,
        phoneTime_createdAt: Date.now(),
        serverTime_createdAt: firestore.FieldValue.serverTimestamp()
    }

    const map = new Map([
        [phoneUniId, phoneNServerTime]
    ])

    const Obj = Object.fromEntries(map)

    const data = await firestore()
        .collection('clockInDb')
        .doc(`${year}/${worksite}/${tagId}`)
        .update(Obj)
        .then(() => {
            console.log(`
            clockIn Infor : 
                Year : ${year}
                Worksite : ${worksite}
                TagId : ${tagId}
                staffId : ${staffId}
                Phone Time : ${phoneNServerTime.phoneTime_createdAt}
                Server Time : ${phoneNServerTime.serverTime_createdAt}
            `)
        })
        .catch(e => console.log(e))

    return data
}

export const updateClockInWSites = async (
    year: string,
    worksite: string
) => {

    const dateSet = await firestore()
        .collection('clockInDb')
        .doc(year)
        .update({
            wSites: firestore.FieldValue.arrayUnion(worksite)
        })
        .catch(e => console.log(e))

    return dateSet
}

