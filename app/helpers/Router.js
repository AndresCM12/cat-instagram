import { Login } from "../components/Login.js";
import { Main } from "../components/Main.js";
import { OptionsButton } from "../components/Options.js";
import { SwiperApp } from "../components/SwiperApp.js";
import {
  loadFavoriteCat,
  loadRandomCat,
  saveFavoriteCat,
  unSaveFavoriteCat,
} from "./catApi.js";

//app container
const $appContainer = document.querySelector("body");

let swiper;

export async function Router() {
  let { hash } = location;
  console.group("Router");
  if (!hash || hash === "#/") {
    const $html = document.querySelector("html");
    $html.style.backgroundColor = "#191c1a";

    const $index = document.querySelector("#app");
    $index.innerHTML = null;
    Login();
    // console.log("home");
  } else if (hash.includes("#/inicio")) {
    if (mainIsRendered()) {
      Main();
      const $loaderDos = document.querySelector("#loadingBarMain");
      $loaderDos.style.display = "grid";
      swiper = SwiperApp();
    }
    if (document.querySelectorAll("main#main .cards-wrapper div").length == 0) {
      renderRandomCats();
    }
    initScrollup();
    OptionsButton();

    const randomCatsWrapper = document.querySelector("#randomWrapper");
    randomCatsWrapper.style.display = "grid";
  } else if (hash.includes("#/favorito")) {
    if (mainIsRendered()) {
      Main();
      swiper = SwiperApp();
    }
    const $optionButton = document.querySelector("#optionsButton");
    $optionButton ? $optionButton.remove() : null;
    initScrollup();
    renderFavoriteCats();
  } else if (hash.includes("#/subir")) {
    if (mainIsRendered()) {
      Main();
      swiper = SwiperApp();
    }
  } else {
    alert("error");
  }

  navColor(hash, swiper);
  console.groupEnd();
}

function navColor(hash, swiper) {
  //navbar
  const $swiper = document.querySelector("main#main .swiper-scrollbar-drag");
  const $p1 = document.querySelector("main#main nav p:nth-child(1)");
  const $p2 = document.querySelector("main#main nav p:nth-child(2)");
  const $p3 = document.querySelector("main#main nav p:nth-child(3)");
  const $optionButton = document.querySelector("#optionsButton");
  const $loader = document.querySelector("main#main #loadingBar");
  const $html = document.querySelector("html");
  const randomCatsWrapper = document.querySelector("#randomWrapper");
  if (hash.includes("#/inicio")) {
    $p1.classList.add("activep");
    $p2.classList.remove("activep");
    $p3.classList.remove("activep");
    fixHeight();
    $html.style.backgroundColor = "var(--background)";
    randomCatsWrapper.style.display = "grid";

    //$loader.style.display = "grid";

    swiper.slideTo(0, 0, false);
  }
  if (hash.includes("#/favoritos")) {
    $loader.style.display = "grid";
    randomCatsWrapper.style.display = "none";

    $optionButton ? $optionButton.remove() : null;
    $p1.classList.remove("activep");
    $p2.classList.add("activep");
    $p3.classList.remove("activep");
    fixHeight();
    $html.style.backgroundColor = "#fbfdf8";
    swiper.slideTo(1, 0, false);
  }
  if (hash.includes("#/subir")) {
    $loader.style.display = "none";

    const $imgPreview = document.querySelector("main#main #img_preview");
    $imgPreview.classList.add("slide-in-bottom");
    const $textWrapper = document.querySelector("#textWrapperUpload");
    $textWrapper.classList.add("slide-in-bottom");
    $optionButton ? $optionButton.remove() : null;
    $p1.classList.remove("activep");
    $p2.classList.remove("activep");
    $p3.classList.add("activep");
    fixHeight();
    randomCatsWrapper.style.display = "none";

    $html.style.backgroundColor = "#fbfdf8";
    swiper.slideTo(2, 0, false);
  } else {
    const $imgPreview = document.querySelector("main#main #img_preview");
    $imgPreview.classList.remove("slide-in-bottom");
    $imgPreview.style.opacity = "0%";
    const $textWrapper = document.querySelector("#textWrapperUpload");
    $textWrapper.classList.remove("slide-in-bottom");
    $textWrapper.style.opacity = "0%";
  }
}

export async function renderRandomCats() {
  const randomCatsWrapper = document.querySelector("#randomWrapper");
  // randomCatsWrapper.innerHTML = "";
  OptionsButton();
  const randomCatsArray = await loadRandomCat();
  cancelLoader();

  randomCatsArray.forEach((cat) => {
    let randomCard = document.createElement("div");
    randomCard.classList.add("fade-in-fwd-mid");
    randomCatsWrapper.appendChild(randomCard);
    randomCard.classList.add("card");
    randomCard.innerHTML = $card;
    const imgRandomCat = randomCard.querySelector("img");
    const url = cat.url;
    const datasetId = cat.id;
    imgRandomCat.dataset.urlImg = url;
    imgRandomCat.dataset.id = datasetId;
    imgRandomCat.style.objectFit = "cover";
    imgRandomCat.src = imgRandomCat.dataset.urlImg;
    imgRandomCat.classList.add("fade-in");

    imgRandomCat.removeEventListener("load", () => {}, false);
    randomCard.id = cat.id;

    const favButton = randomCard.querySelector(".fav-container");
    favButton.addEventListener("click", async () => {
      const selfCard = document.querySelector(`div#${CSS.escape(cat.id)}`);
      selfCard.style.display = "none";
      const save = await saveFavoriteCat(cat.id);
    });
  });
}

function mainIsRendered() {
  const $mainIsRendered = document.querySelector("main#main");
  if ($mainIsRendered == null) {
    return true;
  } else {
    return false;
  }
}

async function renderFavoriteCats() {
  const randomCatsWrapper = document.querySelector(
    "#main#main .cards-wrapper-favorites"
  );
  const randomCatsArray = await loadFavoriteCat();
  cancelLoader();

  try {
    randomCatsArray.forEach((cat) => {
      let randomCard = document.createElement("div");
      randomCard.classList.add("card");
      randomCard.classList.add("fade-in-fwd-mid");
      randomCard.innerHTML = $cardFavorite;
      const imgRandomCat = randomCard.querySelector("img");
      const url = cat.image.url;
      const datasetId = cat.id;
      randomCard.id = cat.image_id;
      imgRandomCat.style.objectFit = "cover";

      imgRandomCat.src = url;
      imgRandomCat.style.objectFit = "cover";

      imgRandomCat.src = url;

      randomCatsWrapper.appendChild(randomCard);
      const unFavButton = randomCard.querySelector(".fav-container");
      imgRandomCat.addEventListener("load", (e) => {
        // imgRandomCat.style.objectFit = "cover";
        // console.log(e);
        // console.log(url);
        // imgRandomCat.src = url;
      });
      unFavButton.addEventListener("click", async () => {
        const selfCard = document.querySelector(`#${CSS.escape(cat.image_id)}`);
        const $divGatos = document.querySelectorAll(
          ".cards-wrapper-favorites .card"
        );
        //console.log(selfCard, "selfcard");
        randomCard.remove();

        const unfav = await unSaveFavoriteCat(cat.id);

        //console.log(cat.image_id);
        //console.log($divGatos.length);
        if ($divGatos.length == 1) {
          const $cardBug = document.querySelector(
            "main#main .cards-wrapper-favorites .card"
          );
          selfCard.remove();
          //$cardBug.remove();

          noFavsAlert();
        }
        //console.log(unfav);
      });
    });
  } catch (eror) {
    //console.log(eror);
    noFavsAlert();
  }
}

function fixHeight() {
  const favoriteCatsWrapper = document.querySelector(
    "main#main .cards-wrapper-favorites"
  );
  const randomCatsWrapper = document.querySelector("#randomWrapper");

  randomCatsWrapper.style.height = "fit-content";
  favoriteCatsWrapper.innerHTML = "";
  favoriteCatsWrapper.style.height = "fit-content";
}

function noFavsAlert() {
  const $favwrapper = document.querySelector(
    "main#main .cards-wrapper-favorites"
  );
  //console.log("no tienes favs");
  const $noFavs = document.createElement("div");
  $noFavs.classList.add("slide-in-bottom");
  $noFavs.id = "noFavsAlert";
  $noFavs.innerHTML = `
  <img src="./app/assets/imgs/nofavorite.png">
  <h2>Aún no tienes ninguno :c</h2>
  <p>Puedes agregar un michi clickeando en el botón de agregar a favoritos en la sección de inicio:)</p>
  `;

  $favwrapper.style.height = "500px";
  $favwrapper.appendChild($noFavs);
}

function cancelLoader() {
  const $loader = document.querySelector("main#main #loadingBar");
  $loader.style.display = "grid";
  $loader.style.display = "none";

  const $loaderDos = document.querySelector("#loadingBarMain");
  $loaderDos.style.display = "none";
}

function initScrollup() {
  const $inicioBullet = document.querySelector(
    "main#main .swiper-pagination-bullet"
  );
  const $favBullet = document.querySelector(
    "main#main .swiper-pagination-bullet:nth-child(2)"
  );

  $inicioBullet.addEventListener("click", () => {
    if (location.hash.includes("#/inicio")) {
      smoothscroll();
    }
    if (location.hash.includes("#/favoritos")) {
      smoothscroll();
    }
  });
  $favBullet.addEventListener("click", () => {
    if (location.hash.includes("#/favoritos")) {
      smoothscroll();
    }
  });
}
function smoothscroll() {
  const currentScroll =
    document.documentElement.scrollTop || document.body.scrollTop;
  if (currentScroll > 0) {
    window.requestAnimationFrame(smoothscroll);
    window.scrollTo(0, currentScroll - currentScroll / 5);
  }
}
