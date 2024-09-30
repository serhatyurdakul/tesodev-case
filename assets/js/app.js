const searchInput = document.querySelector(".search-input");
const searchResultsHome = document.querySelector(".search-results-home");
const resultsList = document.querySelector(".results-list");
const searchButton = document.querySelector(".btn-searchbar");
searchButton.style.visibility = "hidden";

searchResultsHome.style.display = "none";

searchInput.addEventListener("input", () => {
  const searchText = searchInput.value;
  const results = performSearch(searchText, 3);

  resultsList.innerHTML = "";
  results.forEach((item) => {
    resultsList.appendChild(createResultItem(item));
  });

  if (results.length > 0) {
    searchResultsHome.style.display = "flex";
    searchButton.style.visibility = "visible";
    updateSearchLink(searchText);
  } else {
    searchResultsHome.style.display = "none";
    searchButton.style.visibility = "hidden";
  }
});
