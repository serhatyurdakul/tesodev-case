let currentPage = 1;
let totalPages;

function setupPagination(results, resultsPerPage) {
  const paginationContainer = document.querySelector(".pagination-container");
  totalPages = Math.ceil(results.length / resultsPerPage);

  if (totalPages > 1) {
    let paginationHTML = '<ul class="pagination">';
    paginationHTML += '<li class="page-item previous"><a href="#" class="page-link" data-page="previous">Previous</a></li>';

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<li class="page-item"><a href="#" class="page-link" data-page="${i}">${i}</a></li>`;
      }
    } else {
      const visiblePages = getVisiblePages(currentPage, totalPages);
      for (let i = 1; i <= totalPages; i++) {
        if (visiblePages.includes(i)) {
          paginationHTML += `<li class="page-item"><a href="#" class="page-link" data-page="${i}">${i}</a></li>`;
        } else if (i === visiblePages[visiblePages.length - 1] - 1 || i === visiblePages[0] + 1) {
          paginationHTML += '<li class="page-item ellipsis"><span class="page-link">...</span></li>';
        }
      }
    }

    paginationHTML += '<li class="page-item next"><a href="#" class="page-link" data-page="next">Next</a></li>';
    paginationHTML += "</ul>";
    paginationContainer.innerHTML = paginationHTML;

    // Sayfa numaralarını dinleme
    const pageLinks = document.querySelectorAll(".page-link");
    pageLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const pageValue = link.getAttribute("data-page");
        if (pageValue === "previous") {
          currentPage = Math.max(currentPage - 1, 1);
        } else if (pageValue === "next") {
          currentPage = Math.min(currentPage + 1, totalPages);
        } else {
          currentPage = parseInt(pageValue);
        }
        displayResults(results, resultsPerPage, currentPage);
        setupPagination(results, resultsPerPage);
      });
    });

    displayResults(results, resultsPerPage, currentPage);
  } else {
    paginationContainer.innerHTML = "";
    displayResults(results, resultsPerPage, 1);
  }
}

function getVisiblePages(currentPage, totalPages) {
  if (totalPages <= 6) return [...Array(totalPages)].map((_, i) => i + 1);
  
  let pages = [1, totalPages];
  let middlePages = [];

  if (currentPage <= 3) {
    middlePages = [2, 3, 4];
  } else if (currentPage >= totalPages - 2) {
    middlePages = [totalPages - 3, totalPages - 2, totalPages - 1];
  } else {
    middlePages = [currentPage - 1, currentPage, currentPage + 1];
  }

  return [...new Set([...pages, ...middlePages])].sort((a, b) => a - b);
}

function displayResults(results, resultsPerPage, currentPage) {
  const resultsList = document.querySelector(".results-list");
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

  updatePaginationUI();
}

function updatePaginationUI() {
  const pageLinks = document.querySelectorAll(".page-link");
  pageLinks.forEach((link) => {
    const pageNum = parseInt(link.getAttribute("data-page"));
    if (pageNum === currentPage) {
      link.parentElement.classList.add("active");
    } else {
      link.parentElement.classList.remove("active");
    }
  });

  const previousButton = document.querySelector(".page-item.previous");
  if (previousButton) {
    previousButton.classList.toggle("disabled", currentPage === 1);
  }

  const nextButton = document.querySelector(".page-item.next");
  if (nextButton) {
    nextButton.classList.toggle("disabled", currentPage === totalPages);
  }
}

// Global scope'a açıyoruz
window.setupPagination = setupPagination;
window.displayResults = displayResults;