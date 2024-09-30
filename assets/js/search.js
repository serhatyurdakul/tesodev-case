// Verileri Local Storage'dan çekme
const combinedDataString = localStorage.getItem("combinedData");
const combinedData = JSON.parse(combinedDataString);

// Genel arama fonksiyonu
function performSearch(searchText, maxResults = Infinity) {
  searchText = searchText.trim().toLowerCase();

  if (searchText.length < 2) {
    return [];
  }

  return combinedData
    .filter((item) => item.nameSurname.toLowerCase().includes(searchText))
    .slice(0, maxResults);
}

// Sonuç öğesi oluşturma fonksiyonu
function createResultItem(item) {
  const listItem = document.createElement("li");
  listItem.className = "results-item";
  listItem.innerHTML = `
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
  return listItem;
}

// Arama bağlantısını güncelleme fonksiyonu
function updateSearchLink(searchText) {
  document.querySelectorAll(".search-link").forEach((el) => {
    el.setAttribute("href", "./results.html?s=" + encodeURIComponent(searchText));
  });
}