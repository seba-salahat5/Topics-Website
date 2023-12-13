import { API_URL } from "./constants.js";
import { showLoadingSpinner, hideLoadingSpinner } from "./render_functions.js";

export let fetchTopics = async function () {
    let url = `${API_URL}/list`;
    try {
        showLoadingSpinner();

        let response = await fetch(url);

        switch (response.status) {
            case 200:
                hideLoadingSpinner();
                return response.json();
            default:
                hideLoadingSpinner();
                return null;
        }
    } catch (error) {
        hideLoadingSpinner();
        return null;
    }
};