import DeviceInfo from 'react-native-device-info';



// getAndroidId() =>   getUniqueId() same getting unique id of android phone
// get IOS phone uniqueID 

export const getAndroidPhoneInfor = async () => {
    
    const osFeature =  await DeviceInfo.getSystemAvailableFeatures()

    const phoneId : string  = await DeviceInfo.getAndroidId()
    const os = await DeviceInfo.getSystemName()
    const osV = await DeviceInfo.getSystemVersion()
    const device = await DeviceInfo.getDevice()
    const brand =  DeviceInfo.getBrand()
    const bdID = await DeviceInfo.getBuildId()	
    const batteryLvl = await DeviceInfo.getBatteryLevel()
    const apiLvl = await DeviceInfo.getApiLevel()

    console.log(`${phoneId} ${os} ${osV} ${device} ${brand} ${bdID} ${batteryLvl} ${apiLvl}` )
    
}

export const getAndroidPhoneId =  async () : string  => {
    const phoneId : string  = await DeviceInfo.getAndroidId()
    return phoneId
}


export const flatten = (dataArr: any[]) : string [] => {
    const flattenDataArr =
        dataArr.reduce(
            (accumulator, currentValue) => accumulator.concat(currentValue),
            []
        )
    return flattenDataArr
}

export const checkTagExists = (tagId : string, dataArr : string []) : boolean => {

    return dataArr.includes(tagId)
    
}


