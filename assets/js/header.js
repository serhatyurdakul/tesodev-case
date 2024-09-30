document.addEventListener('DOMContentLoaded', function() {
  const headerPlaceholder = document.getElementById('header-placeholder');
  const currentPage = window.location.pathname.split("/").pop();

  let headerContent = '';

  switch(currentPage) {
    case 'index.html':
    case '':
      headerContent = `
        <header class="mainpage-header">
          <div class="container">
            <a href="./form.html" onclick="clearLastSearch()"><button class="btn btn-lg">Add new record</button></a>
          </div>
        </header>
      `;
      break;
    case 'results.html':
      headerContent = `
        <header class="results-header">
          <div class="container">
            <div class="results-header-wrapper">
              <a href="./">
                <img src="./assets/icon/logo-sm.svg" alt="" class="logo" />
              </a>
              <div class="search-bar-results">
                <input
                  type="text"
                  class="searchInput-resultspage search-input input input-sm"
                  autofocus
                />
                <button class="btn" id="search-button">Search</button>
              </div>
              <a href="./form.html"><button class="btn btn-lg">Add new record</button></a>
            </div>
          </div>
        </header>
      `;
      break;
    case 'form.html':
      headerContent = `
        <header class="form-header">
          <div class="container">
            <div class="form-header-wrapper">
              <a href="./"> <img src="./assets/icon/logo-sm.svg" alt="logo" /></a>
              <div class="return-text">
                <a href="./results.html" class="return-wrapper" id="returnToListPage">
                  <img src="./assets/icon/arrow-back.svg" alt="" />
                  <p class="return-title">Return to List Page</p>
                </a>
              </div>
            </div>
          </div>
        </header>
      `;
      break;
  }

  headerPlaceholder.innerHTML = headerContent;

  // Form sayfasında "Return to List Page" butonuna tıklandığında
  if (currentPage === 'form.html') {
    document.getElementById('returnToListPage').addEventListener('click', function(e) {
      e.preventDefault();
      const lastSearch = localStorage.getItem("lastSearch");
      if (lastSearch) {
        window.location.href = `./results.html?s=${encodeURIComponent(lastSearch)}`;
      } else {
        window.location.href = './results.html';
      }
    });
  }
});

window.clearLastSearch = function() {
  localStorage.removeItem("lastSearch");
};