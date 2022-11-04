export function Login() {
  const $container = document.createElement("main");
  $container.id = "login";
  //$container.style.transition = 'all 500ms ease'
  $container.innerHTML = $login;
  $app.appendChild($container);

  const $button = document.querySelector("#login");
  $button.addEventListener("click", validateKey);
}

function validateKey() {
  $app.innerHTML = "";
  location.hash = "#/inicio";
}
