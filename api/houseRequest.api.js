import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
import config from '../config.js';

const app = initializeApp(config.firebaseConfig);
const db = getFirestore(app);
const houseRequestCollectionName = config.HOUSE_REQUEST_COLLECTION;

export default class HouseRequestApi {

    /**
     * 
     * @param {*} houseRequest 
     */
    async createHouseRequest(houseRequest) {
        try {
           const docRef = await addDoc(collection(db, houseRequestCollectionName), {
                email: houseRequest.email,
                address: houseRequest.address,
                lat: houseRequest.lat,
                long: houseRequest.long,
                city: houseRequest.city,
                district: houseRequest.district,
                zipCode: houseRequest.zipCode,
                imgList: houseRequest.imgList,
                msg: houseRequest.msg,
                status: 'pending'
            });
            console.log("Document written with ID: ", docRef.id);
            try {
                const currentDocRef = doc(db, houseRequestCollectionName, docRef.id);
                await updateDoc(currentDocRef, {
                    id: docRef.id
                })
                console.log("Document updated with ID: ", docRef.id);
            } catch (e) {console.error(e)}
        } catch (e) {console.error(e) }
    }
}