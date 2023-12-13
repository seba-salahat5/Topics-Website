import { fetchTopics } from "./API_functions.js";
import { renderTopics, addFilterOptions } from "./render_functions.js";
import { onSortChange, extractCategories, onFilterChange } from "./topics_functions.js";
import { onSelectEvent } from "./event_handling_functions.js";


let topics = [];
let selectedSort = "Default";
let selectedFilter = "Default";
let searchValue = "";
let favouritesTopics = [];

async function homePageController() {
    /*onSearchEvent();
    onFilterEvent();*/

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
}

let updateTopics = function () {
    let filteredTopics = onFilterChange(topics, selectedFilter);
    let sortedTopics = onSortChange(filteredTopics, selectedSort);
    renderTopics(sortedTopics);
};

homePageController();