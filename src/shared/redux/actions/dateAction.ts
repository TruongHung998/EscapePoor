import firestore from "@react-native-firebase/firestore";
import config from "../../../config";
import {Item, User} from "@shared/redux/constants/modalTypes";
import {numberWithCommas, toTimestamp} from "@utilities/helper";

var start = new Date();
start.setUTCHours(0, 0, 0, 0);
var end = new Date();
end.setUTCHours(23, 59, 59, 999);

export const insertDate = async (data: any, resolve: (data: any) => void, reject: (error: any) => void) => {
    try {
        const formInput = {
            ...data
        }
        console.log(formInput)
        firestore().collection(`DateInfo/${config.ENV}/data`).add(formInput)
            .then((data) => {
                resolve && resolve(data)
            }).catch((error) => {
            reject && reject('error')
        })
    } catch (e) {
        console.log(e, 'error')
        reject && reject(e)
    }
}

export const requestDateNowInfo = (resolve: (data: any) => void, reject: (error: any) => void) => {
    try {
        firestore().collection(`DateInfo/${config.ENV}/data`)
            .where('time', '>=', toTimestamp(start))
            .where('time', '<=', toTimestamp(end))
            .get().then((result: any) => {
            const _data = result
            console.log(_data)
            if (_data && _data.docs) {
                resolve && resolve(_data.docs)
            } else reject && reject('error')
        })
    } catch (e) {
        console.log(e, 'error')
        reject && reject(e)
    }
}

export const sumDate = (array: Item[]) => {
    if (array.length > 0) {
        let i = 0
        array.map((item: Item) => {
            const data = item._data
            if (data && data?.money && Number.isInteger(data.money)) {
                if (data.type)
                    i = i + data.money
                else i = i - data.money
            }
        })
        return numberWithCommas(i)
    } else return 0
}

export const onDeleteDate = async (resolve: (data: any) => void, reject: (error: any) => void) => {
    try {
        const docId = await firestore().collection(`DateInfo/${config.ENV}/data`)
            .orderBy('time', 'desc')
            .limit(1).get()
        if (docId) {
            const id = docId.docs[0].id
            await firestore().collection(`DateInfo/${config.ENV}/data`).doc(id).delete().then(() => {
                resolve && resolve('')
            })
                .catch((e) => {
                    reject && reject('e')
                })
        } else reject && reject('e')
    } catch (e) {
        console.log(e, 'error')
        reject && reject(e)
    }
}
