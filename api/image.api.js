import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';



export default class ImageApi {

    /**
     * Prend en parametre un fichier (à charger via un inuput type file)
     * et upload 
     * @param {*} file 
     * @returns 
     */
    uploadImage(file) {
        const storage = getStorage();
        const storageRef = ref(storage);

        // Generate an unique Id for the image reference.
        const uid = new Date().getTime().toString();

        // Create a reference to the root of the storage bucket

        // Create a reference to the file
        const fileRef = ref(storageRef, uid);

        // Upload the file and metadata
        const uploadTask = uploadBytes(fileRef, file, { contentType: file.type });

        // Get the download URL after the upload is complete
        return new Promise((resolve, reject) => {
            uploadTask
                .then(data => resolve(data))
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
    getProjectImageUrl(imgId) {
        const storage = getStorage();
        const storageRef = ref(storage);

        const imgRef = ref(storage, imgId + '.jpg');

        return new Promise((resolve, reject) => {
            getDownloadURL(imgRef)
            .then(url => {
                resolve(url)
            })
            .catch(e => {
                switch(e.code){
                    case 'storage/object-not-found' : 
                    console.error("File doesn't exist, ", e)
                    break;
                    
                    case 'storage/unauthorized' : 
                    console.error("User doesn't have permission to access the object, ", e)
                    break;
                    
                    case 'storage/canceled' : 
                    console.error("User canceled the upload,", e)
                    break;
                    
                    case 'storage/unknown' : 
                    console.error("Unknown error occurred, inspect the server response,", e)
                    break;
                }

                reject(e)
            })
        }) 
    }

}