// Local Storage'dan verileri çekme işlevi
export function getDataFromLocalStorage() {
  const combinedDataString = localStorage.getItem("combinedData");
  return JSON.parse(combinedDataString);
}

// Arama işlevi
export function performSearch(searchText, data, maxResults = Infinity) {
  searchText = searchText.trim().toLowerCase();

  if (searchText.length < 2) {
    return [];
  }

  return data
    .filter((item) => item.nameSurname.toLowerCase().includes(searchText))
    .slice(0, maxResults);
}

// Sonuçları HTML olarak oluşturma işlevi
export function createResultHTML(item) {
  return `
    <div class="location-info">
      <div class="location-info-wrapper">
        <img src="./assets/icon/location-icon.svg" alt="location icon" />
        <div class="location-wrapper">
          <p class="company location-bold-text">${item.company ?? "Company"}</p>
          <p class="location location-light-text">
            <span class="city">${item.city},</span>
            <span class="country">${item.country}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="user-info-wrapper">
      <p class="user-info">${item.nameSurname}</p>
      <p class="date-info">${item.date ?? "10/25/2023"}</p>
    </div>
  `;
}

// Arama sonuçlarını görüntüleme işlevi
export function displaySearchResults(
  results,
  container,
  maxResults = Infinity
) {
  container.innerHTML = "";
  const resultsToShow = results.slice(0, maxResults);

  resultsToShow.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.className = "results-item";
    listItem.innerHTML = createResultHTML(item);
    container.appendChild(listItem);
  });

  return resultsToShow.length;
}

// Arama sorgusunu URL'den alma
export function getSearchQueryFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("s") || "";
}

// Arama sorgusunu URL'ye ekleme
export function setSearchQueryInURL(query) {
  const url = new URL(window.location);
  url.searchParams.set("s", query);
  window.history.pushState({}, "", url);
}

// Arama sonuçlarını localStorage'a kaydetme
export function saveSearchResults(results, query) {
  localStorage.setItem("lastSearchResults", JSON.stringify(results));
  localStorage.setItem("lastSearchQuery", query);
}

// Arama sonuçlarını localStorage'dan alma
export function getLastSearchResults() {
  const results = localStorage.getItem("lastSearchResults");
  return results ? JSON.parse(results) : null;
}
