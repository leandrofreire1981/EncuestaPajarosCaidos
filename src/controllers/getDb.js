import { fb } from "../../firebase";
import { collections, getDocs, getFirestore } from 'firebse/firestore'

export default async function getDb(){
    const fireDb = getFirestore(fb)
    let a = []
    const querySnapshot = await getdoct(collections(fireDb, "encuestados"))
    querySnapshot.foreach(doc => {
        a.push(doc.data())
    })    
    return a;
}