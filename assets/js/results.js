import {
  getDataFromLocalStorage,
  performSearch,
  displaySearchResults,
  getSearchQueryFromURL,
  setSearchQueryInURL,
  saveSearchResults,
  getLastSearchResults,
} from "./search.js";
import { setupPagination } from "./pagination.js";

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector(".searchInput-resultspage");
  const resultsList = document.querySelector(".results-list");
  const searchButton = document.querySelector(".btn-searchbar");
  const addNewRecordButton = document.querySelector(".btn-add-new-record");
  const sortBtn = document.querySelector(".orderby-list");

  const combinedData = getDataFromLocalStorage();
  let sortKey;
  let currentPage = 1;

  function setSortKey(key, sort, self) {
    sortKey = { key, sort };
    search(searchInput.value);
    document
      .querySelectorAll(".orderby-item a")
      .forEach((item) => item.classList.remove("selected"));
    self.classList.add("selected");
  }

  function show() {
    sortBtn.style.display = sortBtn.style.display === "none" ? "block" : "none";
  }

  function displayResults(results, resultsPerPage, currentPage) {
    const start = (currentPage - 1) * resultsPerPage;
    const end = start + resultsPerPage;
    const paginatedResults = results.slice(start, end);

    displaySearchResults(paginatedResults, resultsList);
  }

  function search(searchText) {
    searchText = searchText.trim().toLowerCase();

    if (searchText.length < 2 || searchText === "undefined") {
      const lastResults = getLastSearchResults();
      const lastQuery = localStorage.getItem("lastSearchQuery");
      if (lastResults && lastQuery && lastQuery !== "undefined") {
        searchInput.value = lastQuery;
        displayResults(lastResults, 5, 1);
        setupPagination(lastResults, 5, 1, displayResults);
        setSearchQueryInURL(lastQuery);
        return;
      } else {
        resultsList.innerHTML = "";
        document.querySelector(".pagination-container").innerHTML = "";
        setSearchQueryInURL("");
        return;
      }
    }

    let results = performSearch(searchText, combinedData);

    if (sortKey?.key) {
      results = sortResults(results);
    }

    setSearchQueryInURL(searchText);
    saveSearchResults(results, searchText);
    searchInput.value = searchText;

    currentPage = 1;
    setupPagination(results, 5, currentPage, displayResults);
  }

  function sortResults(results) {
    if (sortKey.key === "name") {
      return results.sort((a, b) => {
        return sortKey.sort === "asc"
          ? a.nameSurname.localeCompare(b.nameSurname)
          : b.nameSurname.localeCompare(a.nameSurname);
      });
    } else if (sortKey.key === "year") {
      return results.sort((a, b) => {
        return sortKey.sort === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      });
    }
    return results;
  }

  function initSearch() {
    const urlQuery = getSearchQueryFromURL();
    if (urlQuery && urlQuery !== "undefined") {
      searchInput.value = urlQuery;
      search(urlQuery);
    } else {
      const lastResults = getLastSearchResults();
      const lastQuery = localStorage.getItem("lastSearchQuery");
      if (lastResults && lastQuery && lastQuery !== "undefined") {
        searchInput.value = lastQuery;
        displayResults(lastResults, 5, 1);
        setupPagination(lastResults, 5, 1, displayResults);
        setSearchQueryInURL(lastQuery);
      }
    }
  }

  // Event listeners
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      search(e.target.value);
    });
  }

  if (searchButton) {
    searchButton.addEventListener("click", () => {
      search(searchInput.value);
    });
  }

  if (addNewRecordButton) {
    addNewRecordButton.addEventListener("click", (e) => {
      const currentSearch = searchInput.value;
      if (currentSearch && currentSearch !== "undefined") {
        window.location.href = `./form.html?s=${encodeURIComponent(
          currentSearch
        )}`;
      } else {
        window.location.href = "./form.html";
      }
    });
  }

  // Başlatma
  initSearch();

  // Fonksiyonları global kapsama ekleme
  window.setSortKey = setSortKey;
  window.show = show;
  window.searchbtnclick = () => search(searchInput.value);
});

window.search = search;
