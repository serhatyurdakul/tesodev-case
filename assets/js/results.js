const searchInput = document.querySelector(".searchInput-resultspage");

const resultsList = document.querySelector(".results-list");

const searchButton = document.querySelector(".btn-searchbar");

// Verileri Local Storage'dan çekme
const combinedDataString = localStorage.getItem("combinedData");
const combinedData = JSON.parse(combinedDataString);
let sortKey;

const sortBtn = document.querySelector(".orderby-list");

/* sort  */
function setSortKey(key, sort, self) {
  sortKey = {
    key,
    sort,
  };
  search();
  self.classList.add("selected");
}
document.setSortKey = setSortKey;

function show() {
  sortBtn.style.display = sortBtn.style.display == "none" ? "block" : "none";
}

document.show = show;

// Pagination işlemi
let currentPage = 1;
let totalPages;
function setupPagination(results, resultsPerPage) {
  const paginationContainer = document.querySelector(".pagination-container");
  totalPages = Math.ceil(results.length / resultsPerPage);

  if (totalPages > 1) {
    let paginationHTML = '<ul class="pagination">';
    paginationHTML +=
      '<li class="page-item previous"><a href="#" class="page-link" data-page="previous">Previous</a></li>';
    for (let i = 1; i <= totalPages; i++) {
      paginationHTML += `<li class="page-item"><a href="#" class="page-link" data-page="${i}">${i}</a></li>`;
    }
    paginationHTML +=
      '<li class="page-item next"><a href="#" class="page-link" data-page="next">Next</a></li>';

    paginationHTML += "</ul>";
    paginationContainer.innerHTML = paginationHTML;

    // Sayfa numaralarını dinleme
    const pageLinks = document.querySelectorAll(".page-link");
    pageLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const pageValue = link.getAttribute("data-page");
        if (pageValue === "previous") {
          // "Önceki" butonuna tıklama işlemini ele alma
          currentPage = Math.max(currentPage - 1, 1); // İlk sayfanın altına gitmeyi engelle
        } else if (pageValue === "next") {
          // "Sonraki" butonuna tıklama işlemini ele al
          currentPage = Math.min(currentPage + 1, totalPages); // Son sayfayı aşmayı engelle
        } else {
          const page = parseInt(pageValue);
          currentPage = page;
        }
        displayResults(results, resultsPerPage, currentPage);
      });
    });

    // İlk sayfayı varsayılan olarak göster
    displayResults(results, resultsPerPage, 1);
  } else {
    paginationContainer.innerHTML = "";
  }
}

// Sayfada sonuçları gösterme işlemi
function displayResults(results, resultsPerPage, currentPage) {
  const start = (currentPage - 1) * resultsPerPage;
  const end = start + resultsPerPage;
  const paginatedResults = results.slice(start, end);

  resultsList.innerHTML = "";

  paginatedResults.forEach((item) => {
    // Sonuçları görüntüleme
    const listItem = document.createElement("li");
    listItem.className = "results-item";
    listItem.innerHTML = `
      <div class="location-info">
        <div class="location-info-wrapper">
          <img src="./assets/icon/location-icon.svg" alt="location icon" />
          <div class="location-wrapper">
            <p class="company location-bold-text">${
              item.company ?? "Company"
            }</p>
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

    resultsList.appendChild(listItem);
  });

  // Tüm "page-link" öğelerini al
  const pageLinks = document.querySelectorAll(".page-link");

  // Tüm sayfa-link öğelerini döngü ile geçerek stilini güncelleme
  pageLinks.forEach((link, index) => {
    if (index === currentPage) {
      link.style.background = "#204080";
      link.style.color = "#fff";
      link.style.border = "none";
    } else {
      // Diğer sayfa linkleri için stil sıfırlama
      link.style.background = "";
      link.style.color = "";
      link.style.border = "";
    }
  });

  // İlk sayfada "previous" butonunu devre dışı bırakma
  const previousButton = document.querySelector(".page-item.previous");
  if (previousButton) {
    previousButton.classList.toggle("disabled", currentPage === 1);
  }

  // Son sayfada "next" butonunu devre dışı bırakma
  const nextButton = document.querySelector(".page-item.next");
  if (nextButton) {
    nextButton.classList.toggle("disabled", currentPage === totalPages);
  }
}

// Arama işlevi
function search(text = null) {
  // Arama metnini küçük harfe dönüştürme
  const searchText = text ?? searchInput.value.trim().toLowerCase();

  let filteredResults = combinedData.filter((item) =>
    item.nameSurname.toLowerCase().includes(searchText)
  );

  // En az iki karakter girildiğini kontrol etme
  if (searchText.length < 2) {
    // Eğer iki karakterden azsa, "results-list" içeriğini temizliyoruz
    resultsList.innerHTML = "";

    return;
  }

  // "results-list" içeriğini temizleme
  resultsList.innerHTML = "";

  // Eşleşen sonuç sayacını tanımlama

  let array = [];

  // Local Storage'dan çekilen verileri döngü ile işleme
  combinedData.forEach((item) => {
    if (item.nameSurname.toLowerCase().includes(searchText)) {
      array.push(item);
    }
  });

  // arrayi sort et
  if (sortKey?.key) {
    if (sortKey.key == "name" && sortKey.sort == "asc") {
      array = filteredResults.sort(function (a, b) {
        var nameA = a.nameSurname.toUpperCase(); // Büyük/küçük harf duyarlı olmayan sıralama
        var nameB = b.nameSurname.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    }

    if (sortKey.key == "name" && sortKey.sort == "desc") {
      array = filteredResults.sort(function (a, b) {
        var nameA = a.nameSurname.toUpperCase();
        var nameB = b.nameSurname.toUpperCase();
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
        return 0;
      });
    }
    if (sortKey.key == "year" && sortKey.sort == "asc") {
      array = filteredResults.sort(function (a, b) {
        var dateA = new Date(a.date);
        var dateB = new Date(b.date);
        return dateA - dateB;
      });
    }
    if (sortKey.key == "year" && sortKey.sort == "desc") {
      array = filteredResults.sort(function (a, b) {
        var dateA = new Date(a.date);
        var dateB = new Date(b.date);
        return dateB - dateA;
      });
    }
  }

  //aramaya bastır

  array.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.className = "results-item";

    // İçeriği doldurma
    listItem.innerHTML = `
        <div class="location-info">
          <div class="location-info-wrapper">
            <img src="./assets/icon/location-icon.svg" alt="location icon" />
            <div class="location-wrapper">
              <p class="company location-bold-text">${
                item.company ?? "Company"
              }</p>
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

    // Oluşturduğumuz li öğesini "results-list" ul elementine ekleme
    resultsList.appendChild(listItem);
  });

  // Sayfa başına sonuçları görüntüleme işlemini çağırma
  setupPagination(filteredResults, 5); //  sayfa başına 5 sonuç
}

// Arama işlemini dinleme
searchInput.addEventListener("input", () => {
  search();
});

const query = document.location.search?.split("?s=")?.[1];
if (query) {
  searchInput.value = query;
  search(query);
}

function searchbtnclick() {
  document.location.href =
    "./results.html?s=" + searchInput.value.trim().toLowerCase();
}

window.searchbtnclick = searchbtnclick;
