import Project from "./project.model.js";
import ProjectApi from "./api/projects.api.js";
import ImageApi from "./api/image.api.js";

const imageApi = new ImageApi();
const projectApi = new ProjectApi();

const henrivilleLocation = [49.884195, 2.299391];

const closeButton = document.querySelector(".close-button");
const popUp = document.getElementById("show-popUp");
const arrow = document.getElementById("arrow");
popUp.style.left = -1000 + "px";

const mapLayer = document.getElementById("map");

mapLayer.addEventListener("click", () => {
  gsap.to(popUp, { duration: 1, ease: "expoScale(0.5,7,none)", x: -1000 });
})
closeButton.addEventListener("click", () => {
  gsap.to(popUp, { duration: 1, ease: "expoScale(0.5,7,none)", x: -1000 });
});

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
  document.getElementById("city").textContent = project.city;
  document.getElementById("district").textContent = project.district;

  if (project.district === "" || project.district === undefined) {
    arrow.style.display = "none";
  } else {
    arrow.style.display = "block";
  }

  //? "APPEL D'API, de l'image "//
  imageApi
    .getProjectImageUrl(project.imgId)
    .then((data) => {
      document.getElementById("img").src = data;
    })
    .catch((error) => console.error(error))
    .finally(() => console.log("It's over"));
}

function onMarkerClick(project) {
  gsap.to(popUp, { duration: 1, ease: "expoScale(0.5,7,none)", x: 1000 });
  loadPopUp(project);
}

let greenIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/7191/7191059.png",
  iconSize: [38, 40], // size of the icon
  shadowSize: [50, 85], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

projectApi
  .getProjects()
  .then((projects) => {
    projects.forEach((project) => {
      if (project.lat && project.long)
        L.marker([project.lat, project.long], { icon: greenIcon })
          .bindPopup(project.address)
          .addTo(map)
          .on("click", onMarkerClick.bind(null, project));
    });
  })
  .catch((e) => console.error(e));

  // fill ask house 
// close pop up on ask-house click 

  const askHouse = document.getElementById("ask-house");
  const modal = document.getElementById("modal")
  const modalCloseButton = document.getElementById('close-button');

      function toggleModal() {
        modal.classList.toggle("show-modal");
      }

      askHouse.addEventListener("click", toggleModal);
      modalCloseButton.addEventListener("click", toggleModal);




