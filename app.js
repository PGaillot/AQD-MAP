import Project from './models/project.model.js';
import GeocodingApi from './api/geocoding.api.js'
import ProjectApi from './api/projects.api.js';
import ImageApi from './api/image.api.js';

// le point initial sur Henriville,
// avec  sa Latitude :49.884195 et sa longitude :  2.299391
const henrivilleLocation = [49.884195, 2.299391];

const projectApi = new ProjectApi;
const geoCodingApi = new GeocodingApi;
const imgApi = new ImageApi;

const imgRef = document.getElementById('img-ref');
const projectTitleRef = document.getElementById('project-title');
const projectAddressRef = document.getElementById('project-address');

var map;

function resetImgRef() {
    this.imgRef.src = ''
}

function showProject(project, event) {
    updateContent(project);
}

function updateContent(project) {

    imgApi.getProjectImageUrl(project.imgId)
        .then(url => {
            imgRef.src = url;
            console.log(url);
        }).catch((e) => console.error(e))

    projectAddressRef.textContent = project.address;
    projectTitleRef.textContent = project.title;
}

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
            if (project.lat && project.long) L.marker([project.lat, project.long]).bindPopup(project.address).addTo(map).on('click', showProject.bind(null, project));
        });
    })
    .catch((e) => console.error(e));
