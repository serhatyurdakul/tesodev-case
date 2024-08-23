import {
  getDataFromLocalStorage,
  performSearch,
  displaySearchResults,
  getSearchQueryFromURL,
  setSearchQueryInURL,
  saveSearchResults,
  getLastSearchResults,
} from "./search.js";

const searchInput = document.querySelector(".search-input-mainpage");
const searchResultsHome = document.querySelector(".search-results-home");
const resultsList = document.querySelector(".results-list");
const searchButton = document.querySelector(".btn-searchbar");

const combinedData = getDataFromLocalStorage();

searchButton.style.visibility = "hidden"; // Başlangıçta gizli
searchResultsHome.style.display = "none";

// Sayfa yüklendiğinde önceki aramayı geri yükleme
document.addEventListener("DOMContentLoaded", () => {
  const lastQuery = getSearchQueryFromURL();
  if (lastQuery) {
    searchInput.value = lastQuery;
    const lastResults = getLastSearchResults();
    if (lastResults) {
      displaySearchResults(lastResults, resultsList, 3);
      searchResultsHome.style.display = "flex";
      searchButton.style.visibility = "visible";
    } else {
      search(lastQuery);
    }
  }
});

// Arama fonksiyonu
function search(query = null) {
  const searchText = query || searchInput.value.trim().toLowerCase();

  if (searchText.length < 2) {
    resultsList.innerHTML = "";
    searchResultsHome.style.display = "none";
    searchButton.style.visibility = "hidden";
    return;
  }

  const results = performSearch(searchText, combinedData);

  const displayedResultsCount = displaySearchResults(results, resultsList, 3);

  if (displayedResultsCount > 0) {
    searchResultsHome.style.display = "flex";
    searchButton.style.visibility = "visible";
    document.querySelectorAll(".search-link").forEach((el) => {
      el.setAttribute("href", "./results.html?s=" + searchText);
    });
    setSearchQueryInURL(searchText);
    saveSearchResults(results, searchText);
  } else {
    searchResultsHome.style.display = "none";
    searchButton.style.visibility = "hidden";
  }
}

// Input event listener
searchInput.addEventListener("input", () => search());

// "search-input-mainpage" sınıfı kontrolü
const isMainPageInput = searchInput.classList.contains("search-input-mainpage");

// Arama düğmesine tıklama olayı
searchButton.addEventListener("click", () => {
  const searchText = searchInput.value.trim().toLowerCase();
  if (searchText.length >= 2) {
    window.location.href = `./results.html?s=${searchText}`;
  }
});
