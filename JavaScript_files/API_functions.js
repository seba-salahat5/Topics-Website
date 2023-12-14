import { API_URL } from "./constants.js";
import { showLoadingSpinner, hideLoadingSpinner } from "./render_functions.js";

export let fetchTopics = async function (searchInput) {
    let url;
    if(searchInput == ""){
        url = `${API_URL}/list` ;
    }
    else url= `${API_URL}/list?phrase=${searchInput}`;

    try {
        showLoadingSpinner();

        let response = await fetch(url);
        switch (response.status) {
            case 200:
                hideLoadingSpinner();
                return response.json();
            default:
                console.log(error);
                hideLoadingSpinner();
                return null;
        }
    } catch (error) {
        console.log(error);
        hideLoadingSpinner();
        return null;
    }
};