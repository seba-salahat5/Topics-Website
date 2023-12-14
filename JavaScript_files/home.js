import { fetchTopics } from "./API_functions.js";
import { renderTopics, addFilterOptions } from "./render_functions.js";
import { onSortChange, extractCategories, onFilterChange } from "./topics_functions.js";
import { onSelectEvent, onSearchEvent  } from "./event_handling_functions.js";
import {initializeDarkMode} from "./dark_mode_functions.js";


let topics = [];
let selectedSort = "Default";
let selectedFilter = "Default";
let searchValue = "";
let favouritesTopics = [];

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

    topics = await fetchTopics("");
    extractCategories(topics, (categories) => {
        addFilterOptions(categories);
    });
    updateTopics();
    initializeDarkMode();
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