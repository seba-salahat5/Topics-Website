import { API_URL } from "./constants.js";
import { showLoadingSpinner, hideLoadingSpinner } from "./render_functions.js";

export let fetchTopics = async function (searchInput) {
    let url = new URL(`${API_URL}/list`);
    
    if(searchInput){
        url.searchParams.set('phrase', searchInput);
    }
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

export let fetchTopicDetails = async function (topicID) {
    let url = new URL(`${API_URL}/details/${topicID}`);

    try{
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
}