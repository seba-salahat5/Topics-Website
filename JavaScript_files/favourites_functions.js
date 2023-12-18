import { FAV_BTN_ID, FAV_PANEL_ID} from "./constants.js";

export let initializeFavourites = function () {
  const FavBtn = document.getElementById(FAV_BTN_ID);
  FavBtn.addEventListener('click', (event) => {
    showHideFav();
  });
};

let showHideFav = function () {
  const FavPanel = document.getElementById(FAV_PANEL_ID);
  if (FavPanel.style.display === 'none') {
    FavPanel.style.display = 'block';
  } else {
    FavPanel.style.display = 'none';
  }
};

export let ifFav = function (topic, favorites){
  if(favorites.some((favTopic) => favTopic.id == topic.id)) return true;
  return false;
}

