
export let onSortChange = function (topics, selectedSort) {
  let sortedTopics = topics;
  if (selectedSort == "Default") return sortedTopics;
  else {
    selectedSort == "Topic Title"
      ? sortedTopics = topics.slice().sort((a, b) => {
        const titleA = a.topic.toLowerCase();
        const titleB = b.topic.toLowerCase();

        if (titleA < titleB) {
          return -1;
        } else if (titleA > titleB) {
          return 1;
        } else {
          return 0;
        }
      })
      : sortedTopics = topics.slice().sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        if (nameA < nameB) {
          return -1;
        } else if (nameA > nameB) {
          return 1;
        } else {
          return 0;
        }
      });
  }
  return sortedTopics;
}


export let onFilterChange = function (topics, selectedFilter) {
  let filteredTopics = topics.filter(topic => topic.category == selectedFilter || selectedFilter == "Default");
  return filteredTopics;
}

export let extractCategories = function (topics, cb) {
  let categories = [];

  if (topics != null) {
    // here I used the set to ensure that each category stored once and then returned it back to an array
    categories = [...new Set(topics.map(topic => topic.category))];
  }
  cb(categories);
}

