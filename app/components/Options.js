import { renderRandomCats } from "../helpers/Router.js";

export function OptionsButton() {
  const $button = document.createElement("div");
  $button.id = "optionsButton";
  $button.innerHTML = `
    <div class="button-wrapper">    
        <img src="./app/assets/imgs/filtrar.png" alt="imagen de filtrar">        </img>
    </div>
     `;
  $button.addEventListener("click", (event) => {
    reload();
  });

  $button.classList.add("fade-in");
  document.querySelector("body").appendChild($button);
}

async function reload() {
  const randomCatsWrapper = document.querySelector("#randomWrapper");
  const $loader = document.querySelector("main#main #loadingBar");
  $loader.style.display = "grid";
  //randomCatsWrapper.innerHTML = "";
  renderRandomCats();
}
