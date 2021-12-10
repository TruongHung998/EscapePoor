import firestore from "@react-native-firebase/firestore";
import config from "../../../config";
import {Item} from "@shared/redux/constants/modalTypes";
import {numberWithCommas, toTimestamp} from "@utilities/helper";
import moment from "moment";

var start = new Date();
start.setUTCHours(0, 0, 0, 0);
var end = new Date();
end.setUTCHours(23, 59, 59, 999);

export const insertDate = async (data: any, resolve: (data: any) => void, reject: (error: any) => void) => {
    try {
        const formInput = {
            ...data
        }
        firestore().collection(`DateInfo/${config.ENV}/data`).add(formInput)
            .then(async () => {
                await accessTotal(data?.money || 0, data?.type || false)
                await onAddDate()
                resolve && resolve('')
            }).catch((error) => {
            reject && reject('error')
        })
    } catch (e) {
        console.log(e, 'error')
        reject && reject(e)
    }
}

export const accessTotal = async (number: any, type: boolean) => {
    const _data: any = await firestore().collection(`Userinfo`).doc(`${config.ENV}`).get()
    if (_data) {
        const firebase = _data?._data
        console.log(parseInt(firebase.total) - parseInt(number))
        const formInput = {
            ...firebase,
            total: type ? parseInt(firebase.total) + parseInt(number) : parseInt(firebase.total) - parseInt(number)
        }
        await firestore().collection('Userinfo').doc(`${config.ENV}`).update(formInput)
            .then((data) => {
            }).catch((error) => {
            })
    }
}

export const requestDateNowInfo = (resolve: (data: any) => void, reject: (error: any) => void) => {
    try {
        firestore().collection(`DateInfo/${config.ENV}/data`)
            .where('time', '>=', toTimestamp(start))
            .where('time', '<=', toTimestamp(end))
            .get().then((result: any) => {
            const _data = result
            if (_data && _data.docs) {
                resolve && resolve(_data.docs)
            } else reject && reject('error')
        })
    } catch (e) {
        console.log(e, 'error')
        reject && reject(e)
    }
}

export const requestCalendar = (resolve: (data: any) => void, reject: (error: any) => void) => {
    try {
        firestore().collection(`DateInfo/${config.ENV}/dataDay`)
            .get().then((result: any) => {
            const _data = result
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

const sumRequest = async () => {
    const result = await firestore().collection(`DateInfo/${config.ENV}/data`)
        .where('time', '>=', toTimestamp(start))
        .where('time', '<=', toTimestamp(end))
        .get().then((result: any) => {
            const _data = result
            if (_data && _data.docs) {
                const sum = sumDate(_data.docs)
                return sum
            } else return 0
        })
    return result
}

const addExistDay = async (docId: any, sum: any) => {
    await firestore().collection(`DateInfo/${config.ENV}/dataDay`).doc(docId).update({
        date: moment(new Date()).format('MM/DD/YYYY'),
        money: sum,
        time: toTimestamp(new Date())
    }).then((e) => {
    }).catch((e) => {
    })
}

export const deleteDay = async () => {
    await firestore().collection(`DateInfo/${config.ENV}/data`).onSnapshot((snap) => {
        snap.docs.forEach(async doc => {
            await firestore().collection(`DateInfo/${config.ENV}/data`).doc(doc.id).delete().then(async () => {
            })
                .catch((e) => {
                    console.log(e)
                })
        })
    })
}


const addDay = async (sum: any) => {
    await deleteDay()
    await firestore().collection(`DateInfo/${config.ENV}/dataDay`).add({
        date: moment(new Date()).format('MM/DD/YYYY'),
        money: sum,
        time: toTimestamp(new Date())
    }).then((e) => {
        console.log(e)
    }).catch((e) => {
        console.log(e)
    })
}

const onAddDate = async () => {
    const sum = await sumRequest()
    firestore().collection(`DateInfo/${config.ENV}/dataDay`)
        .where('date', '==', moment(new Date()).format('MM/DD/YYYY'))
        .get().then(async (result) => {
        if (!result.empty) {
            await addExistDay(result.docs[0].id, sum)
        } else {
            await addDay(sum)
        }
    })
}

export const onDeleteDate = async (resolve: (data: any) => void, reject: (error: any) => void) => {
    try {
        const docId = await firestore().collection(`DateInfo/${config.ENV}/data`)
            .orderBy('time', 'desc')
            .limit(1).get()
        if (docId) {
            const id = docId.docs[0].id
            const _data: any = await firestore().collection(`DateInfo/${config.ENV}/data`).doc(id).get()
            if (_data) {
                const sub = _data._data
                await accessTotal(sub.money, !sub.type)
            }
            await firestore().collection(`DateInfo/${config.ENV}/data`).doc(id).delete().then(async () => {
                await onAddDate()
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
