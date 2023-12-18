import {displayDetails, renderFavourites} from "./render_functions.js";
import {fetchTopicDetails} from "./API_functions.js";
import {initializeDarkMode} from "./dark_mode_functions.js";
import {initializeFavourites, ifFav} from "./favourites_functions.js";
import {onAddToFavEvent} from "./event_handling_functions.js";
import { setInLocalStorage, getFromLocalStorage } from "./local_storage_functions.js";

let favourateTopics = getFromLocalStorage('favourites') || [];
export let detailsPageController = async function (){
    let params = new URL(document.location).searchParams;
    let id = params.get("id");
    let topicDetails = await fetchTopicDetails(id);
    displayDetails(topicDetails, ifFav(topicDetails, favourateTopics));

    renderFavourites(favourateTopics);
    initializeDarkMode();
    initializeFavourites();

    onAddToFavEvent(topicDetails,favourateTopics, async (favourites) => {
        favourateTopics = favourites;
        setInLocalStorage('favourites', favourateTopics);
        renderFavourites(favourateTopics);
    });
}

detailsPageController();