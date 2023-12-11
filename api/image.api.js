import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';

import config from '../config.js';

const firebaseConfig = config.firebaseConfig;
const app = initializeApp(firebaseConfig);

const storage = getStorage();

console.log(app);
export default class ImageApi {

    uploadImage(file) {
        // Create a reference to the root of the storage bucket
        const storageRef = ref(storage);

        // Create a reference to the file
        const fileRef = ref(storageRef, file.name);

        // Upload the file and metadata
        const uploadTask = uploadBytes(fileRef, file, { contentType: file.type });

        // Get the download URL after the upload is complete
        return new Promise((resolve, reject) => {
            uploadTask.then((data) =>
                    resolve(data)
                )
                .catch(error => {
                    console.error('Error uploading image:', error);
                    alert('Error uploading image. Please try again.');
                    reject(error)
                });
        })

    }

}