import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
// import { v4 as uuidv4 } from 'uuid';

const storage = getStorage();

export default class ImageApi {

    /**
     * Prend en parametre un fichier (à charger via un inuput type file)
     * et upload 
     * @param {*} file 
     * @returns 
     */
    uploadImage(file) {
        const uuid = uuidv4();
        console.log(uuid);
        // Create a reference to the root of the storage bucket
        const storageRef = ref(storage);

        // Create a reference to the file
        const fileRef = ref(storageRef, file.name);

        // Upload the file and metadata
        const uploadTask = uploadBytes(fileRef, file, { contentType: file.type });

        // Get the download URL after the upload is complete
        return new Promise((resolve, reject) => {
            uploadTask.then(() => getDownloadURL(fileRef))
                .then(url => {
                    resolve(url)
                })
                .catch(error => {
                    console.error('Error uploading image:', error);
                    alert('Error uploading image. Please try again.');
                    reject(e);
                });
        })
    }

    /**
     * 
     */
    getProjectImageUrl(){

    }

}