import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
import config from './config.js';

const app = initializeApp(config.firebaseConfig);
const db = getFirestore(app);
const projectsCollectionName = config.PROJECTS_COLLECTION;

export default class ProjectApi {
    // app = initializeApp(config.firebaseConfig);
    // db = getFirestore(app);
    // projectsCollectionName = config.PROJECTS_COLLECTION;
    getProjects() {
        return new Promise((resolve, reject) => {
            const collectionRef = collection(db, projectsCollectionName);
            getDocs(collectionRef)
            .then((querySnapshot) => {
                const data = [];
                querySnapshot.forEach((doc) => {
                    // Utilisez doc.data() pour obtenir les données du document
                    data.push(doc.data());
                });

                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
        });
    }

}