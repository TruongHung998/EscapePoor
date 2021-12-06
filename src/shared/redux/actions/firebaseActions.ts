import {AppDispatch} from '../store/index';
import firestore from "@react-native-firebase/firestore";

export const getDataFromFireBase = (collectionId: string, docId: string, resolve: (data: any) => void, reject: (error: any) => void) => async (dispatch: AppDispatch) => {
    try {
        firestore().collection(collectionId).doc(docId).get().then(((data) => {
            if (data && data.exists) {
                const _data = data.data()
                resolve && resolve(_data)
            } else {
                reject && reject('error')
            }
        }));
    } catch (e) {
        reject && reject(e)
    }
}

export const postDataToFireBase = (collectionId: string, docId: string, body: any, resolve: () => void, reject: (error: any) => void) => async (dispatch: AppDispatch) => {
    try {
        firestore()
            .collection(collectionId)
            .doc(docId)
            .set(body)
            .then(() => {
                resolve && resolve()
            }).catch((error) => {
            reject(error)
        })
    } catch (e) {
        reject && reject(e)
    }
}
export const postDataToFireBaseRandomDoc = (collectionId: string, body: any, resolve: () => void, reject: (error: any) => void) => async (dispatch: AppDispatch) => {
    try {
        firestore()
            .collection(collectionId)
            .add(body)
            .then(() => {
                resolve && resolve()
            }).catch((error) => {
            reject(error)
        })
    } catch (e) {
        reject && reject(e)
    }
}

export const updateDataToFireBase = (collectionId: string, docId: string, body: any, resolve: () => void, reject: (error: any) => void) => async (dispatch: AppDispatch) => {
    try {
        firestore()
            .collection(collectionId)
            .doc(docId)
            .update(body)
            .then(() => {
                resolve && resolve()
            }).catch((error) => {
            reject(error)
        })
    } catch (e) {
        reject && reject(e)
    }
}
