import { fb } from "../firebase";
import { collection, getDocs, getFirestore } from 'firebase/firestore'

export default async function getDb(){
    const fireDb = getFirestore(fb)
    let a = []
    const querySnapshot = await getDocs(collection(fireDb, "encuestados"))
    querySnapshot.forEach(doc => {
        a.push(doc.data())
     })    
    return a;
}