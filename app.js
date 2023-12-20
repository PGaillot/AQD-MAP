import Project from "./project.model.js";
import ProjectApi from "./api/projects.api.js";

const projectApi = new ProjectApi();
// le point initial sur Henriville,
// avec  sa Latitude :49.884195 et sa longitude :  2.299391
const henrivilleLocation = [49.884195, 2.299391];

//TODO close the pop up //
const closeButton = document.querySelector(".close-button");
const popUp = document.getElementById("show-popUp");

closeButton.addEventListener("click", () => {
  // popUp.classList.toggle("hide");
  gsap.to(popUp, {duration: 1, ease : "power1.out", x : -1000});
});

// cration de la map (vide)
// set view prend deux parametres : lat long et zoom.
var map = L.map("map").setView(henrivilleLocation, 16);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

/// ---A CORRIGER---------- 
let marker = L.marker([49.884195, 2.299391]).addTo(map);

marker.addEventListener("click", () => {
  
  gsap.to(popUp, {duration: 1, ease : "power1.out", x : 0});
});

projectApi
  .getProjects()
  .then((projects) => {
    projects.forEach((project) => {
      if (project.lat && project.long)
        L.marker([project.lat, project.long])
          .bindPopup(project.address)
          .addTo(map);
      // if (project.lat && project.long) L.marker([project.lat, project.long]).bindPopup(project.address).addTo(map).on('click', showProject.bind(null, project));
    });
  })
  .catch((e) => console.error(e));
