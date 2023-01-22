import { fb } from "../firebase";
import { collection, addDoc, getFirestore } from 'firebase/firestore'

export default async function saveDv(obj){
    const fireDb = getFirestore(fb)
    try {
        const docRef = await addDoc(collection(fireDb, "encuestados"), obj)
        console.log("Document writen with ID: ", docRef.id)
    } catch (e){
        console.error("Error adding document: ", e)
    }
}
