import ProjectApi from "./api/projects.api.js";
import ImageApi from "./api/image.api.js";
import HouseRequestApi from "./api/houseRequest.api.js";
import HouseRequest from "./houseRequest.model.js";

const mapLayer = document.getElementById("map");
const houseRequestApi = new HouseRequestApi();
const imageApi = new ImageApi();
const projectApi = new ProjectApi();
// MODAL 💬
const askHouse = document.getElementById("ask-house");
const modalCloseButton = document.getElementById("close-button");

// MAP 🗺️
const henrivilleLocation = [49.884195, 2.299391];
const requestForm = document.getElementById("request-form");
const modal = document.getElementById("modal");

// POP-UP 💥
const closeButton = document.querySelector(".close-button");
const arrow = document.getElementById("arrow");
const popUp = document.getElementById("popUp");

//?----------------- 🗺️🗺️ MAP 🗺️🗺️ -----------//

mapLayer.addEventListener("click", () => {
  if (modal.classList[0] === "show-modal") {
    toggleModal();
  }
});

var map = L.map("map").setView(henrivilleLocation, 16);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

let greenIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/7191/7191059.png",
  iconSize: [38, 40], // size of the icon
  shadowSize: [50, 85], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

//? -------- 💥💥💥 POP-UP 💥💥💥 ----------------//

function togglePopUp() {
  popUp.classList.toggle("show-popup");
  popUp.classList.toggle("hidden-popup");
}

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

  //! "APPEL D'API, de l'image "//
  imageApi
    .getProjectImageUrl(project.imgId)
    .then((data) => {
      document.getElementById("img").src = data;
    })
    .catch((error) => console.error(error))
    .finally(() => console.log("It's over"));
}

function onMarkerClick(project) {
  togglePopUp();
  loadPopUp(project);
}

closeButton.addEventListener("click", () => {
  togglePopUp();
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

//? --------------------💬💬 MODAL 💬💬--------------------//

function toggleModal() {
  modal.classList.toggle("show-modal");
  modal.classList.toggle("hidden-modal");
}

askHouse.addEventListener("click", () => {
  if (popUp.classList[0] === "show-popup") {
    togglePopUp();
    setTimeout(() => {
      toggleModal();
    }, 400);
  }else{
    toggleModal();
  }
});

modalCloseButton.addEventListener("click", toggleModal);

//^ START on form submit //

requestForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Empêche la soumission par défaut du formulaire
  const emailInput = document.getElementById("email");
  const addressInput = document.getElementById("address");
  const msgInput = document.getElementById("msg");
  const cityInput = document.getElementById("city");
  const districtInput = document.getElementById("district");
  const zipCodeInput = document.getElementById("zip-code");

  const email = emailInput.value;
  const address = addressInput.value;
  const city = cityInput.value;
  const district = districtInput.value;
  const zipCode = zipCodeInput.value;
  const msg = msgInput.value;
  //   const imgFiles = imgInput.files;

  const houseRequest = new HouseRequest(
    email,
    address,
    null,
    null,
    city,
    district,
    zipCode,
    [],
    msg
  );

  houseRequestApi.createHouseRequest(houseRequest);
});
