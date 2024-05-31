const imgContainer = document.getElementById("img-container");
const loader = document.getElementById("loader");

let isInitialLoad = true;
let initialCount = 5;

//UNSPLASH API
const apiKEY = "knKjKcNr1_viuvgtJPqWrC9XNaYhh2-N1Or5_yll7RY";
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKEY}&count=${initialCount}`;

let ready = false;
let totalImages = 0;
let imagesLoaded = 0;
let photoArray = [];

// Update API url with new count
function updateAPIURLwithNewCount(picCount) {
  apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKEY}&count=${picCount}`;
}

//Check if all images have been loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

//Helper function
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//Create and display each photo from api
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photoArray.length;
  // run function for each object in photoArray
  photoArray.forEach((photo) => {
    //ceate <a> tag to link to unsplash page
    const item = document.createElement("a");

    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    //create <img>  for photo
    const img = document.createElement("img");

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event listener, check when an image has finisehd loading
    img.addEventListener("load", imageLoaded);
    // put <img> inside <a>, then put them both insde the image container
    item.appendChild(img);
    imgContainer.appendChild(item);
  });
}

// Get photos from Unspalsh API
const getPhotos = async function () {
  try {
    const respone = await fetch(apiUrl);
    photoArray = await respone.json();
    displayPhotos();
    if (isInitialLoad) {
      updateAPIURLwithNewCount(30);
      isInitialLoad = false;
    }
  } catch (error) {
    console.log(error);
  }
};

//check to see if scrolling to bottom of page to load more photos
window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

//on load
getPhotos();
