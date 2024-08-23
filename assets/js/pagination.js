// pagination.js

export function setupPagination(results, resultsPerPage, currentPage, displayResults) {
    const paginationContainer = document.querySelector(".pagination-container");
    const totalPages = Math.ceil(results.length / resultsPerPage);
  
    if (totalPages > 1) {
      let paginationHTML = '<ul class="pagination">';
      paginationHTML += '<li class="page-item previous"><a href="#" class="page-link" data-page="previous">Previous</a></li>';
  
      const visiblePages = getVisiblePages(currentPage, totalPages);
      for (let i = 1; i <= totalPages; i++) {
        if (visiblePages.includes(i)) {
          paginationHTML += `<li class="page-item"><a href="#" class="page-link" data-page="${i}">${i}</a></li>`;
        } else if (i === visiblePages[visiblePages.length - 1] - 1 || i === visiblePages[0] + 1) {
          paginationHTML += '<li class="page-item ellipsis"><span class="page-link">...</span></li>';
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
          let newPage = currentPage;
          if (pageValue === "previous") {
            newPage = Math.max(currentPage - 1, 1);
          } else if (pageValue === "next") {
            newPage = Math.min(currentPage + 1, totalPages);
          } else {
            newPage = parseInt(pageValue);
          }
          displayResults(results, resultsPerPage, newPage);
          setupPagination(results, resultsPerPage, newPage, displayResults);
        });
      });
  
      updatePaginationUI(currentPage, totalPages);
    } else {
      paginationContainer.innerHTML = "";
    }
  
    displayResults(results, resultsPerPage, currentPage);
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
  
  function updatePaginationUI(currentPage, totalPages) {
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