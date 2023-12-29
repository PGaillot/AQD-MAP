import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getFirestore, collection, getDocs, setDoc, doc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
import config from '../config.js';

const app = initializeApp(config.firebaseConfig);
const db = getFirestore(app);
const houseRequestCollectionName = config.HOUSE_REQUEST_COLLECTION;

export default class HouseRequestApi {
    
    createHouseRequest(houseRequest) {
        return setDoc(doc(collection(db, houseRequestCollectionName)), {
            email : houseRequest.email,
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
    }
}