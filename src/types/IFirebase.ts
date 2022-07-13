import firebase from "firebase"

export interface IFirebase {
    id: string
    info: firebase.firestore.DocumentData
}