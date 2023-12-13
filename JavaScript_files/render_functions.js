import { LOAD_CONTAINER_ID, CARDS_CONTAINER_ID, SPINNER_CONTAINER_ID, Filter_OPTIONS_ID } from "./constants.js";

export let renderTopics = function (topics) {
  const cardsContainer = document.getElementById(CARDS_CONTAINER_ID);
  const loadingContainer = document.getElementById(LOAD_CONTAINER_ID);
  if (topics == null) {
    loadingContainer.innerHTML = `<h3><strong>Something went wrong. Web topics failed to load.</strong></h3>`;
  }
  else {
    cardsContainer.innerHTML = '';
    loadingContainer.innerHTML = `<h3><strong>"${topics.length}" Web Topics Found</strong></h3>`;

    for (let topic of topics) {
      let cardNavigator = document.createElement('a');
      cardNavigator.setAttribute('href', 'details.html');

      let topicCard = document.createElement('div');
      topicCard.setAttribute('class', 'column');

      topicCard.innerHTML = `<div class="card-box default-bg">
        <img class="logo" src="assets/Logos/${topic.image}" alt=${topic.topic} />
        <div class="card-body">
          <h3 class="card-text">${topic.category}</h3>
          <h4 class="card-text card-title">${topic.topic}</h4>
          <div class="raiting-bar" id="raitingBar">
            <span><ion-icon class="star" name="star"></ion-icon></span>
            <span><ion-icon class="star" name="star"></ion-icon></span>
            <span><ion-icon class="star" name="star"></ion-icon></span>
            <span><ion-icon class="star" name="star"></ion-icon></span>
            <span><ion-icon class="star" name="star-outline"></ion-icon></span>
          </div>
          <h5 class="light-text card-text">Author: ${topic.name}</h5>
        </div>
      </div>`;

      cardNavigator.appendChild(topicCard);

      cardsContainer.appendChild(cardNavigator);
    };
  }

};

export let showLoadingSpinner = function () {
  const spinnerContainer = document.getElementById(SPINNER_CONTAINER_ID);
  spinnerContainer.style.display = "flex";
}


export let hideLoadingSpinner = function () {
  const spinnerContainer = document.getElementById(SPINNER_CONTAINER_ID);
  spinnerContainer.style.display = "none";
}

export let addFilterOptions = function (categories) {
  const filterOptions = document.getElementById(Filter_OPTIONS_ID);
  for (let category of categories) {
    let filterOption = document.createElement('option');
    filterOption.setAttribute('value', `${category}`);
    filterOption.innerHTML = `${category}`;
    filterOptions.appendChild(filterOption);
  }

}
