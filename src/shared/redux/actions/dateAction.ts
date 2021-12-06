import firestore from "@react-native-firebase/firestore";
import config from "../../../config";

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

// export const requestDateNowInfo = (resolve: (data: any) => void, reject: (error: any) => void) => {
//     try {
//         firestore().collection(`Userinfo`).doc(`${config.ENV}`).get().then((data: any) => {
//             const _data = data as User
//             if (_data) {
//                 const _data = data._data
//                 resolve && resolve(_data)
//             } else reject && reject('error')
//         })
//     } catch (e) {
//         console.log(e, 'error')
//         reject && reject(e)
//     }
// }
