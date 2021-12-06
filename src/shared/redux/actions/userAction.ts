import firestore from "@react-native-firebase/firestore";
import config from '../../../config'
import {User} from "@shared/redux/constants/modalTypes";

export const requestUserInfo = (resolve: (data: any) => void, reject: (error: any) => void) => {
    try {
        firestore().collection(`Userinfo`).doc(`${config.ENV}`).get().then((data: any) => {
            const _data = data as User
            if (_data) {
                const _data = data._data
                resolve && resolve(_data)
            } else reject && reject('error')
        })
    } catch (e) {
        console.log(e, 'error')
        reject && reject(e)
    }
}

export const insertField = async (data: any, resolve: (data: any) => void, reject: (error: any) => void) => {
    try {
        const _data: any = await firestore().collection(`Userinfo`).doc(`${config.ENV}`).get()
        if (_data) {
            const firebase = _data?._data
            const formInput = {
                ...firebase,
                ...data
            }
            firestore().collection('Userinfo').doc(`${config.ENV}`).update(formInput)
                .then((data) => {
                    resolve && resolve(data)
                }).catch((error) => {
                reject && reject('error')
            })
        } else reject && reject('error')
    } catch (e) {
        console.log(e, 'error')
        reject && reject(e)
    }
}
