import { LOAD_CONTAINER_ID, CARDS_CONTAINER_ID, SPINNER_CONTAINER_ID, Filter_OPTIONS_ID, MAIN_ID, FAV_FLEXBOX_ID,DETAILS_CONTAINER_ID } from "./constants.js";

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
      cardNavigator.addEventListener('click', () => {
        let parameter = new URLSearchParams();
        parameter.append("id", `${topic.id}`);
        let href = "https://seba-salahat5.github.io/Seba-Salahat-JS/details.html?" + parameter.toString();
        window.location.href = href;
      });

      let topicCard = document.createElement('div');
      topicCard.setAttribute('class', 'column');

      topicCard.innerHTML = `<div class="card-box default-bg">
        <img class="logo" src="assets/Logos/${topic.image}" alt=${topic.topic} />
        <div class="card-body">
          <h3 class="card-text">${topic.category}</h3>
          <h4 class="card-text card-title">${topic.topic}</h4>
          <div class="raiting-bar" id="raitingBar-${topic.id}"->
          </div>
          <h5 class="light-text card-text">Author: ${topic.name}</h5>
        </div>
      </div>`;
      cardNavigator.appendChild(topicCard);
      cardsContainer.appendChild(cardNavigator);
      renderRatingbar(topic.rating, `raitingBar-${topic.id}`);
    };
  }

};

export let renderFavourites = function (favourateTopics) {
  const favPanel = document.getElementById(FAV_FLEXBOX_ID);
  favPanel.innerHTML = ``;
  for (let topic of favourateTopics) {
    const flexItem = document.createElement('div');
    flexItem.setAttribute('class', 'flexitem default-bg');

    flexItem.innerHTML = `
    <div class="fav-card-box">
      <img class="favourite-logo" src="assets/Logos/${topic.image}" alt="${topic.topic}" />
      <div class="info-box">
        <h2 class="card-text card-title favorites-title">${topic.topic}</h2>
        <div class="raiting-bar favorites-rating" id="favRaitingBar-${topic.id}"></div>
      </div>
    </div>`;
    favPanel.appendChild(flexItem);
    renderRatingbar(topic.rating, `favRaitingBar-${topic.id}`);
  };
}

export let renderRatingbar = function (topicRating, ratingContainerID) {
  const ratingContainer = document.getElementById(ratingContainerID);

  const filledStars = Math.floor(topicRating);
  const halfFilledStar = topicRating - filledStars;

  const filledStarsHTML = '<span><ion-icon class="star" name="star"></ion-icon></span>'.repeat(filledStars);
  const halfFilledStarHTML = `<span><ion-icon class="star" name="star-half"></ion-icon></span>`;
  const emptyStars = '<span><ion-icon class="star" name="star-outline"></ion-icon></span>'.repeat(5 - (filledStars + halfFilledStar));
  const ratingHTML = filledStarsHTML + (halfFilledStar > 0 ? halfFilledStarHTML : '') + emptyStars;
  ratingContainer.innerHTML = ratingHTML;
}

export let showLoadingSpinner = function () {
  const spinnerContainer = document.getElementById(SPINNER_CONTAINER_ID);
  if (spinnerContainer) {
    spinnerContainer.style.display = "flex";
  }
}


export let hideLoadingSpinner = function () {
  const spinnerContainer = document.getElementById(SPINNER_CONTAINER_ID);
  if (spinnerContainer) {
    spinnerContainer.style.display = "none";
  }
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

/********************************************* Details Page *******************************************/

export let displayDetails = function (data, fav) {
  let favBtnText = fav ? 'Remove From Favourites' : 'Add to Favourites';
  const mainContainer = document.getElementById(MAIN_ID);
  const detailsContainer = document.getElementById(DETAILS_CONTAINER_ID);
  detailsContainer.innerHTML = `<section>
  <div class="topic-details">
      <h2 class="topic-title">${data.category}</h2>
      <h1 class="heighlited-text ">${data.topic}</h1>
      <div class="raiting-bar no-space" id="ratingBar">
      </div>
      <p class="details-paragraph heighlited-text">${data.description}</p>
      <aside>
          <div class="card">
              <img src="assets/Logos/${data.image}" alt="${data.topic}" style="width:100%">
              <div class="card-body margin-10">
                  <h3 class="details-box-text">${data.topic} by <a class="details-box-text" href="#">${data.name}</a></h3>
                  <div class="inner-box">
                      <h4 class="details-box-text">Interested about this topic?</h4>
                      <button class="favourite-button heighlited-text" id="favAddBtn">
                          ${favBtnText}
                          <ion-icon name="heart-outline" class="fav-icon heighlited-text"></ion-icon>
                      </button>
                      <h5 class="light-text details-box-text centered">Unlimited Credits</h5>
                  </div>
              </div>
          </div>
      </aside>
  </div>
</section>`;
let subtopicsContainer = document.createElement('div');
  subtopicsContainer.setAttribute('class', 'details');

  let detailsTitlePanel = document.createElement('div');
  detailsTitlePanel.setAttribute('class', 'details-title details-box default-bg');
  detailsTitlePanel.innerHTML = `<h2>${data.topic} Sub Topics</h2>`;
  subtopicsContainer.appendChild(detailsTitlePanel);

  for (let subTopic of data.subtopics) {
    let subTopicPanel = document.createElement('div');
    subTopicPanel.setAttribute('class', 'details-box default-bg');
    subTopicPanel.innerHTML = `<h3><ion-icon name="checkmark-circle-outline"></ion-icon>${subTopic}</h3>`;
    subtopicsContainer.appendChild(subTopicPanel);
  };

  detailsContainer.appendChild(subtopicsContainer);
  mainContainer.appendChild(detailsContainer);
  renderRatingbar(data.rating, 'ratingBar');
}