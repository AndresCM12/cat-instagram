const URL = `https://api.thecatapi.com/v1/`;
const URL_UPLOAD = `${URL}images/upload`;
const URL_SEARCH = `${URL}images/search?limit=6`;
const URL_FAVORITE = `${URL}favourites`;

const API_KEYa = "fc58aa8e-f119-4f6f-8daa-5f6ec8ce0830";
const API_KEYq = "8df7c620-7370-43e2-a968-a6f357e43b1d";

export {URL,  URL_UPLOAD, URL_SEARCH, URL_FAVORITE, API_KEYa, API_KEYq }

export async function loadRandomCat() {
  //const order = 'DESC'

  const res = await fetch(URL_SEARCH, {
    headers: {
      "x-api-key": API_KEYq,
    },
  });

  if (res.status != 200) {
    location.hash = "";
  } else {
    const data = await res.json();
    console.log(data);
    return data;
  }
}

export async function loadFavoriteCat() {
  const response = await fetch(URL_FAVORITE, {
    headers: {
      "x-api-key": API_KEYq,
    },
  });

  if (response.status != 200) {
    console.log(response);
    if (response.status == 401) {
      location.hash = "";
    }
  } else {
    const data = await response.json();

    if (data.length < 1) {
      //console.log("No tienes favs :c");
    } else {
      //console.log(data);
      return data;
    }
  }
}

export async function saveFavoriteCat(id) {
  console.log(id);
  const response = await fetch(URL_FAVORITE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEYq,
    },
    body: JSON.stringify({
      image_id: id,
    }),
  });
  const data = response.json();
  return data;
}

export async function unSaveFavoriteCat(id) {
  //console.log(id);
  const response = await fetch(`${URL_FAVORITE}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEYq,
    },
  });
  const data = await response.json();
  return data;
}

export async function uploadCat() {
  const random = Math.floor(Math.random() * (459 - 1) + 2);
  console.log(random);
  const response = await fetch(URL_UPLOAD, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEYq,
    },
    body: JSON.stringify({
      sub_id: "" + random,
    }),
  });
  const data = response.json();
  return data;
}
