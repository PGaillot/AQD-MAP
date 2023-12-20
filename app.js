import Project from "./project.model.js";
import ProjectApi from "./api/projects.api.js";
import ImageApi from "./api/image.api.js";

const imageApi = new ImageApi();
const projectApi = new ProjectApi();
// le point initial sur Henriville,
// avec  sa Latitude :49.884195 et sa longitude :  2.299391
const henrivilleLocation = [49.884195, 2.299391];

//TODO close the pop up //
const closeButton = document.querySelector(".close-button");
const popUp = document.getElementById("show-popUp");

closeButton.addEventListener("click", () => {
  // popUp.classList.toggle("hide");
  gsap.to(popUp, { duration: 1, ease: "expoScale(0.5,7,none)", x: -1000 });
});

// cration de la map (vide)
// set view prend deux parametres : lat long et zoom.
var map = L.map("map").setView(henrivilleLocation, 16);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

function loadPopUp(project) {
  document.getElementById("address").textContent = project.address;
  document.getElementById("description").textContent = project.description;
  document.getElementById("title").textContent = project.title;
  
  
  //? "APPEL D'API, de l'image " // 
  imageApi.getProjectImageUrl(project.imgId)
  .then(data =>{
    document.getElementById("img").src = data;
  })
  .catch(error => console.error(error))
  .finally(()=>console.log("It's over"));

  
}

function onMarkerClick(project) {
  gsap.to(popUp, { duration: 1, ease: "expoScale(0.5,7,none)", x: 0 });
  console.log(project);
  loadPopUp(project);
}

projectApi
  .getProjects()
  .then((projects) => {
    projects.forEach((project) => {
      // if (project.lat && project.long)
      //   L.marker([project.lat, project.long])
      //     .bindPopup(project.address)
      //     .addTo(map);
      if (project.lat && project.long)
        L.marker([project.lat, project.long])
          .bindPopup(project.address)
          .addTo(map)
          .on("click", onMarkerClick.bind(null, project));
    });
  })
  .catch((e) => console.error(e));
