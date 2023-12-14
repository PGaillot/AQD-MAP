import Project from "./project.model.js";
import ProjectApi from "./api/projects.api.js";


// le point initial sur Henriville,
// avec  sa Latitude :49.884195 et sa longitude :  2.299391
const henrivilleLocation = [49.884195, 2.299391];

// cration de la map (vide)
// set view prend deux parametres : lat long et zoom.
var map = L.map("map").setView(henrivilleLocation, 16);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// les projets de tata Camille !
const camHome = new Project(
  49.8817568673084,
  2.2977756999391756,
  "5 Rue Camille Saint-Saëns, 80000 Amiens",
  true
);
const home1 = new Project(
  49.88244987606139,
  2.295839761994673,
  "324 Rue mon cul, 80000 Amiens",
  true
);

const projetApi = new ProjectApi ;
projetApi.getProjects().subscribe(projects=>{
  projects.forEach(projet=>{
    L.marker(projet.coordinate).bindPopup(projet.address).addTo(map)
  })
}) 