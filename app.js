import Project from './models/project.model.js';
import GeocodingApi from './api/geocoding.api.js'
import ProjectApi from './api/projects.api.js';

// le point initial sur Henriville,
// avec  sa Latitude :49.884195 et sa longitude :  2.299391
const henrivilleLocation = [49.884195, 2.299391];

const projectApi = new ProjectApi;
const geoCodingApi = new GeocodingApi;

var map;


function initLeafletMap() {
    // cration de la map (vide) 
    // set view prend deux parametres : lat long et zoom.
    map = L.map('map').setView(henrivilleLocation, 16);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

}

// -------------START 🚀🧑‍🚀
initLeafletMap();
projectApi.getProjects()
    .then(projects => {
        projects.forEach(project => {
            if (project.lat && project.long) L.marker([project.lat, project.long]).bindPopup(project.address).addTo(map);
        });
    })
    .catch((e) => console.error(e));
