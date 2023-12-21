import Project from "../../models/project.model.js";
import ProjectApi from "../../api/projects.api.js";
import GeocodingApi from "../../api/geocoding.api.js";
import ImageApi from "../../api/image.api.js";


const projectApi = new ProjectApi;
const geocodingApi = new GeocodingApi;
const imgApi = new ImageApi;

const form = document.getElementById('projectForm');
const titleInput = document.getElementById('title');
const addressInput = document.getElementById('address');
const imgInput = document.getElementById('img');
const descriptionInput = document.getElementById('description');
const latInput = document.getElementById('lat');
const longInput = document.getElementById('long');
const customCoordinateInput = document.getElementById('customCoordinate');
const cityInput = document.getElementById('city');


customCoordinateInput.addEventListener('change', function (event) {
    if (this.checked) {
        latInput.disabled = false;
        longInput.disabled = false;

    } else {
        latInput.disabled = true;
        longInput.disabled = true;
    }
})


form.addEventListener('submit', function (event) {

    event.preventDefault(); // Empêche la soumission par défaut du formulaire

    const title = titleInput.value;
    const address = addressInput.value;
    const city = cityInput.value;
    const description = descriptionInput.value;
    const lat = latInput.value;
    const long = longInput.value;
    const customCoordinate = customCoordinateInput.checked;
    const imgFiles = imgInput.files;

    if (title < 5) {
        console.log("titre trop petit !");
        return;
    }

    if (address < 1) {
        console.log("address !");
        return
    }

    if (!imgFiles) {
        console.log('vous devez uploader au moins une image.')
        return
    } else {
        imgApi.uploadImage(imgFiles[0])
            .then(data => {
                console.log('okayyyy');
                const imgUrl = data.metadata.name;
                if (!customCoordinate) {
                    geocodingApi.getCoordinateFromAddress(address)
                    .then(res => {
                            console.log('okayyyy 2 ')
                            const project = new Project(title, res.lat, res.lng, address, city, imgUrl, true, description);
                            projectApi.createNewProject(project);
                        })
                        .catch(error => console.error(error));
                } else {
                    const project = new Project(title, lat, long, address, imgUrl, true, description);
                    projectApi.createNewProject(project);
                }
            })
            .catch((e) => console.error(e))
    }
});



