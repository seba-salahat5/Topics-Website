import { SORT_OPTIONS_ID, Filter_OPTIONS_ID, SEARCH_INPUT_ID } from "./constants.js";

let debounceDelay;

export let onSelectEvent = function (cb) {
    const sortOptions = document.getElementById(SORT_OPTIONS_ID);
    const filterOptions = document.getElementById(Filter_OPTIONS_ID);
    let selectedValue = "Default";
    sortOptions.addEventListener("change", handleSelectChange);
    filterOptions.addEventListener("change", handleSelectChange);

    function handleSelectChange(event) {
        const selectElement = event.target;
        selectedValue = selectElement.value;

        selectElement.id == SORT_OPTIONS_ID
            ? cb(selectedValue, "sort")
            : cb(selectedValue, "filter");
    }

}

export let onSearchEvent = function (cb) {
    const inputField = document.getElementById(SEARCH_INPUT_ID);
    inputField.addEventListener('input', async (event) => {
        clearTimeout(debounceDelay);
        debounceDelay = setTimeout(() => {
            cb(event.target.value);
        }, 300);
    });
}