import Project from "../models/project.model.js";
import ProjectApi from "../projects.api.js";
import GeocodingApi from "../geocoding.api.js";

const projectApi = new ProjectApi;
const geocodingApi = new GeocodingApi;
const form = document.getElementById('projectForm');
const titleInput = document.getElementById('title');
const addressInput = document.getElementById('address');
const descriptionInput = document.getElementById('description');
const latInput = document.getElementById('lat');
const longInput = document.getElementById('long');
const customCoordinateInput = document.getElementById('customCoordinate');


customCoordinateInput.addEventListener('change', function (event) {
    if (this.checked) {
        console.log('checked !');

    } else {
        console.log('unchecked !');
    }
    console.log(customCoordinateInput.checked);
})


form.addEventListener('submit', function (event) {

    event.preventDefault(); // Empêche la soumission par défaut du formulaire
    const title = titleInput.value;
    const address = addressInput.value;
    const description = descriptionInput.value;
    const lat = latInput.value;
    const long = longInput.value;
    const customCoordinate = customCoordinateInput.checked;

    if (title < 5) {
        console.log("titre trop petit !");
        return;
    }

    if (address < 1) {
        console.log("address !");
        return
    }


    if (!customCoordinate) {
        geocodingApi.getCoordinateFromAddress(address)
            .then(res => {
                const project = new Project(title, res.lat, res.lng, address, 'https://imgur.com/ZJZaSEs', description);
                projectApi.createNewProject(project);
            })
            .catch(error => console.error(error));
    } else {
        const project = new Project(title, lat, long, address, 'https://imgur.com/ZJZaSEs', description);
        projectApi.createNewProject(project);
    }
});



