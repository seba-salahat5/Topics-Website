import {fetchTopics} from "./API_functions.js";
import { renderTopics, addFilterOptions, renderFavourites } from "./render_functions.js";
import { onSortChange, extractCategories, onFilterChange } from "./topics_functions.js";
import { onSelectEvent, onSearchEvent} from "./event_handling_functions.js";
import {initializeDarkMode} from "./dark_mode_functions.js";
import {initializeFavourites} from "./favourites_functions.js";
import {getFromLocalStorage } from "./local_storage_functions.js";


let topics = [];
let selectedSort = "Default";
let selectedFilter = "Default";
let searchValue = "";
let favourateTopics = getFromLocalStorage('favourites') || [];

async function homePageController() {
    
    onSearchEvent(async (searchString) => {
        searchValue = searchString;
        topics = await fetchTopics(searchValue);
        updateTopics();
    });


    onSelectEvent((selectedOption, select) => {
        // select = "sort" or "filter" indicates which select caused the event
        if (select == "sort") {
            selectedSort = selectedOption;
        }
        else if (select == "filter") {
            selectedFilter = selectedOption;
        }
        updateTopics();
    });

    topics = await fetchTopics();
    extractCategories(topics, (categories) => {
        addFilterOptions(categories);
    });
    updateTopics();
    renderFavourites(favourateTopics);
    initializeDarkMode();
    initializeFavourites();
}

let updateTopics = function () {
    if(topics != null){
        let filteredTopics = onFilterChange(topics, selectedFilter);
        let sortedTopics = onSortChange(filteredTopics, selectedSort);
        renderTopics(sortedTopics);
    }
    else{
        renderTopics(topics);
    }
};
homePageController();