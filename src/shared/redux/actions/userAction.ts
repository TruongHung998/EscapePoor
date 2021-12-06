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

export const insertTarget = (data: any, resolve: (data: any) => void, reject: (error: any) => void) => {
    try {
        firestore().collection('Userinfo').doc(`${config.ENV}`).update((item: any) => {
            console.log(item)
            return data
        })
            .then((data) => {
                console.log(data)
                resolve && resolve(data)
            }).catch((error) => {
            console.log(error)
        })
    } catch (e) {
        console.log(e, 'error')
        reject && reject(e)
    }
}

export const insertMoneyAmount = (data: string, resolve: (data: any) => void, reject: (error: any) => void) => {
    try {
        firestore().collection(`/Userinfo/${config.ENV}/data/`).get().then((data: any) => {
            const _data = data as User
            if (_data) {
                const _data = data.docs[1]._data
                resolve && resolve(_data)
            } else reject && reject('error')
        })
    } catch (e) {
        console.log(e, 'error')
        reject && reject(e)
    }
}
