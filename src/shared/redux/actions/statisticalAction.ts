import firestore from "@react-native-firebase/firestore";

export const insertDate = (user: string, body: any, resolve: () => void, reject: (error: any) => void) => {
    try {
        firestore().collection(`/Userinfo/'${user}'/data`)
    } catch (e) {
        reject && reject(e)
    }
}
