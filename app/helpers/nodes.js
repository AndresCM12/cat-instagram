//Primary nodes
const $app = document.querySelector("#app");

//templates
const $login = `
<div  class="logo slide-in-left ">
<img src="./app/assets/imgs/rat.png" alt="" />
<h1>Pet Cat</h1>
</div>
<form class="fade-in-fwd" id="apiKey">
<label for="x-key">Introduce tu clave</label>
<input
  type="text"
  id="x-key"
  placeholder="a4208469-53ba-4yt8-bd6d-54798gy0pioc"
/>
<button id="login">Ingresar</button>
</form>
<div class="instrucciones fade-in-fwd">
<h2>¿Dónde consigo mi clave?</h2>
<p>Puedes encontrar una después de que te registres en este link:</p>
<a href="https://thecatapi.com/signup">https://thecatapi.com/signup</a>
<p>
  Una vez te registres te llegará a tu correo y después la colocas aquí
</p>
<span><a href="https://andrescm12-mx.web.app/#work">@AndresCM12</a></span>
</div>`;

const $main = `
<div class="header">
  <h2>Pet Cat</h2>
</div>
<div class="nav-container">
  <nav>
    <p>INICIO</p>
    <p>FAVORITOS</p>
    <p>SUBIR</p>
  </nav>
  <div class="swiper-scrollbar"></div>
  <div class="swiper-pagination"></div>
</div>

<div class="swiper mySwiper">
  <div class="swiper-wrapper">
  <div class="lds-ring" id="loadingBarMain">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  </div>
    <div data-hash="#/inicio" class="swiper-slide uno">
      <div class="cards-wrapper" id="randomWrapper">

      </div>

    </div>

    <div data-hash="#/favoritos" class="swiper-slide dos">
      <div class="cards-wrapper-favorites">

      </div>
    </div>
    
    <div data-hash="#/subir" class="swiper-slide tres">
     <div id="img_preview" class="fade-in-fwd-mid">
      <form id="uploadForm">
      <img class="fade-in-fwd " id="preview" src=""  alt="">
      <img  src="./app/assets/imgs/upload.png" alt="upload">
        <label for="load_img">Seleccionar una foto</label>
        <input type="file" style="display:none" name="file" id="load_img">
      </form>
    </div>
    
    <button id="uploadButton">Subir</button>
    <div class="upload-text-wrapper" id="textWrapperUpload">
      <h2>¿Qué pasa cuando subo una foto?</h2>
      <p>En cuanto la subas, se agregará a tus favoritos y además le podrá salir a los demás usuarios</p>
    </div>
  </div>
  <div class="lds-ring" id="loadingBar">
<div></div>
<div></div>
<div></div>
<div></div>
</div>
</div>
</div>
`;

const $card = `
<img loading='lazy' class="skeleton fade-in" src="./app/assets/imgs/spinner.gif" data-id="" alt="" />
<div class="fav-container">
  <p>Añadir a favoritos</p>
  <img src="./app/assets/imgs/favorite.png" alt="" />
</div>
`;

const $cardFavorite = `
<img loading='lazy' class="skeleton" src="./app/assets/imgs/spinner.gif" alt="" />
<div class="fav-container">
  <p>Quitar de favoritos</p>
  <img src="./app/assets/imgs/un-favorite.png" alt="" />
</div>
`;
