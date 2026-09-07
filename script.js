const form = document.querySelector("#routeForm");

const routePages = {
  mot: "mot.html",
  ward76: "ward76.html",
  soch: "soch.html"
};

const places = {
  mot: {
    name: "Major Operating Theatre (MOT)",
    image: "images/place-mot.svg"
  },
  ward76: {
    name: "Ward 76",
    image: "images/place-ward76.svg"
  },
  soch: {
    name: "SOC H",
    image: "images/place-soch.svg"
  },
  academia: {
    name: "Academia Auditorium",
    image: "images/academia-auditorium.svg"
  }
};

if (form) {
  const startSelect = document.querySelector("#startLocation");
  const destinationSelect = document.querySelector("#destination");
  const message = document.querySelector("#formMessage");

  function updatePreview(value, previewId, imageId, nameId) {
    const preview = document.querySelector(previewId);
    const image = document.querySelector(imageId);
    const name = document.querySelector(nameId);
    const place = places[value];

    if (!place) {
      preview.hidden = true;
      image.removeAttribute("src");
      image.alt = "";
      name.textContent = "";
      return;
    }

    image.src = place.image;
    image.alt = "Preview photograph for " + place.name;
    name.textContent = place.name;
    preview.hidden = false;
  }

  startSelect.addEventListener("change", function () {
    updatePreview(startSelect.value, "#startPreview", "#startPreviewImage", "#startPreviewName");
    message.textContent = "";
  });

  destinationSelect.addEventListener("change", function () {
    updatePreview(destinationSelect.value, "#destinationPreview", "#destinationPreviewImage", "#destinationPreviewName");
    message.textContent = "";
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const startLocation = startSelect.value;
    const destination = destinationSelect.value;

    if (!startLocation || !destination) {
      message.textContent = "Please select your current location and destination.";
      return;
    }

    // Academia Auditorium is the only MVP destination, so routing is based on the start point.
    window.location.href = routePages[startLocation];
  });
}
