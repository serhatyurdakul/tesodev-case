document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.querySelector(".searchInput-resultspage");
  const resultsList = document.querySelector(".results-list");
  const searchButton = document.getElementById("search-button");

  let sortKey;

  const sortBtn = document.querySelector(".orderby-list");

  function setSortKey(key, sort, self) {
    sortKey = { key, sort };
    search();
    self.classList.add("selected");
  }
  window.setSortKey = setSortKey;

  function show() {
    sortBtn.style.display = sortBtn.style.display == "none" ? "block" : "none";
  }
  window.show = show;

  function search(text = null) {
    const searchText = text ?? searchInput.value;
    let results = performSearch(searchText);

    if (sortKey?.key) {
      results = sortResults(results, sortKey);
    }

    resultsList.innerHTML = "";
    results.forEach((item) => {
      resultsList.appendChild(createResultItem(item));
    });

    currentPage = 1;
    setupPagination(results, 5);
  }

  function sortResults(results, sortKey) {
    if (sortKey.key === "name") {
      return results.sort((a, b) => {
        return sortKey.sort === "asc"
          ? a.nameSurname.localeCompare(b.nameSurname)
          : b.nameSurname.localeCompare(a.nameSurname);
      });
    } else if (sortKey.key === "year") {
      return results.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortKey.sort === "asc" ? dateA - dateB : dateB - dateA;
      });
    }
    return results;
  }

  searchInput.addEventListener("input", () => {
    search();
  });

  searchButton.addEventListener("click", () => {
    search();
  });

  const query = new URLSearchParams(window.location.search).get("s");
  if (query) {
    searchInput.value = query;
    search(query);
  }

  window.searchbtnclick = search;
});