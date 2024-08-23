// header.js
document.addEventListener("DOMContentLoaded", function () {
  const headerPlaceholder = document.getElementById("header-placeholder");
  const path = window.location.pathname;
  let currentPage = path.split("/").pop();

  // Ana sayfa için özel kontrol
  if (
    currentPage === "" ||
    currentPage === "/" ||
    currentPage === "index.html"
  ) {
    currentPage = "home";
  }

  let headerContent = "";

  switch (currentPage) {
    case "home":
      // Ana sayfa için header
      headerContent = `
          <header class="mainpage-header">
            <div class="container">
              <div class="header-wrapper">
                <div></div>
                <button class="btn btn-lg">Add new record</button>
              </div>
            </div>
          </header>
        `;
      break;
    case "results.html":
      // Sonuçlar sayfası için header
      headerContent = `
          <header class="results-header">
            <div class="container">
              <div class="results-header-wrapper">
                <a href="./"><img src="./assets/icon/logo-sm.svg" alt="logo" class="logo"></a>
                <div class="search-bar-results">
                  <input type="text" class="input input-md searchInput-resultspage" placeholder="Search">
                  <button class="btn btn-searchbar" onclick="searchbtnclick()">Search</button>
                </div>
                <button class="btn btn-lg"">Add new record</button>
              </div>
            </div>
          </header>
        `;
      break;
    case "form.html":
      // Form sayfası için header
      headerContent = `
          <header class="form-header">
            <div class="container">
              <div class="form-header-wrapper">
                <a href="./"><img src="./assets/icon/logo-sm.svg" alt="logo" class="logo"></a>
                <div class="return-text">
                  <a href="./results.html" id="returnToListLink" class="return-wrapper">
                    <img src="./assets/icon/arrow-back.svg" alt="Back arrow">
                    <p>Return to List Page</p>
                  </a>
                </div>
              </div>
            </div>
          </header>
        `;
      break;
    default:
      console.error("Unknown page:", currentPage);
      // Varsayılan bir header veya hata mesajı ekleyebilirsiniz
      break;
  }

  headerPlaceholder.innerHTML = headerContent;

  // Sayfa özel işlevselliği
  if (currentPage === "home") {
    const addNewRecordButton = document.querySelector(
      ".mainpage-header .btn-lg"
    );
    if (addNewRecordButton) {
      addNewRecordButton.addEventListener("click", () => {
        window.location.href = "./form.html";
      });
    }
  } else if (currentPage === "results.html") {
    const searchInput = document.querySelector(".searchInput-resultspage");
    const searchButton = document.querySelector(".btn-searchbar");
    const addNewRecordButton = document.querySelector(
      ".results-header .btn:not(.btn-searchbar)"
    );

    if (searchInput && searchButton) {
      searchInput.addEventListener("input", (e) => {
        if (window.search) {
          window.search(e.target.value);
        }
      });

      searchButton.addEventListener("click", () => {
        if (window.search) {
          window.search(searchInput.value);
        }
      });
    }

    if (addNewRecordButton) {
      addNewRecordButton.addEventListener("click", (e) => {
        const currentSearch = searchInput ? searchInput.value : "";
        if (currentSearch && currentSearch !== "undefined") {
          window.location.href = `./form.html?s=${encodeURIComponent(
            currentSearch
          )}`;
        } else {
          window.location.href = "./form.html";
        }
      });
    }
  } else if (currentPage === "form.html") {
    const returnToListLink = document.getElementById("returnToListLink");
    if (returnToListLink) {
      returnToListLink.addEventListener("click", (e) => {
        e.preventDefault();
        let currentSearch = new URLSearchParams(window.location.search).get(
          "s"
        );

        // Eğer URL'de sorgu yoksa, localStorage'dan almayı dene
        if (!currentSearch) {
          currentSearch = localStorage.getItem("lastSearchQuery");
        }

        if (currentSearch && currentSearch !== "undefined") {
          window.location.href = `./results.html?s=${currentSearch}`;
        } else {
          window.location.href = "./results.html";
        }
      });
    }
  }
});

// Global fonksiyonlar
window.searchbtnclick = function () {
  const searchInput = document.querySelector(".searchInput-resultspage");
  if (searchInput && window.search) {
    window.search(searchInput.value);
  }
};
