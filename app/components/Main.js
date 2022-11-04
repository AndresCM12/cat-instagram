import {
  URL_UPLOAD,
  API_KEYa,
  API_KEYq,
  saveFavoriteCat,
} from "../helpers/catApi.js";

export function Main() {
  $app.innerHTML = "";
  const $mainNav = document.createElement("main");
  $mainNav.id = "main";
  //$mainNav.classList.add('slide-in-right')
  $mainNav.innerHTML = $main;
  $app.appendChild($mainNav);

  const $inputImg = document.querySelector("#load_img");
  const $inputImgLabel = document.querySelector('form label[for="load_img"]');
  const $formImg = document.querySelector('form img[alt="upload"]');
  const $preview = document.querySelector("main#main form #preview");
  const $imgPreview = document.querySelector("main#main #img_preview");
  const $uploadButton = document.querySelector("button#uploadButton");

  $uploadButton.addEventListener("click", async () => {
    const $form = document.querySelector("#uploadForm");
    const formData = new FormData($form);
    console.log(formData.get("file"));

    const response = await fetch(URL_UPLOAD, {
      method: "POST",
      headers: {
        "x-api-key": API_KEYa,
      },
      body: formData,
    });

    const data = await response.json();
    console.log(data);
    if (response.status != 201) {
      location.hash = "";
    } else {
      saveFavoriteCat(data.id);
    }
  });

  $inputImg.addEventListener("change", () =>
    loadImgPreview($inputImg, $preview, $inputImgLabel, $formImg, $uploadButton)
  );

}

async function loadImgPreview(
  inputImg,
  preview,
  inputImgLabel,
  formImg,
  uploadButton
) {
  const files = inputImg.files[0];
  if (files) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files);
    fileReader.addEventListener("load", function () {
      preview.style.display = "block";
      preview.src = this.result;
      inputImgLabel.style.display = "none";
      formImg.style.display = "none";
      uploadButton.style.display = "block";
    });
  }
}

