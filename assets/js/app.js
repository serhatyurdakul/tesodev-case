const searchInput = document.querySelector(".search-input");

const searchResultsHome = document.querySelector(".search-results-home");

const resultsList = document.querySelector(".results-list");

const searchButton = document.querySelector(".btn-searchbar");
searchButton.style.visibility = "hidden"; // Başlangıçta gizli

// Verileri Local Storage'dan çekme
const combinedDataString = localStorage.getItem("combinedData");
const combinedData = JSON.parse(combinedDataString);

// "search-results-home" bölümünü başlangıçta gizleme
searchResultsHome.style.display = "none";

// Arama yapılacak metni dinleme
searchInput.addEventListener("input", () => {
  // Arama metnini küçük harfe dönüştürme
  const searchText = searchInput.value.trim().toLowerCase();

  // En az iki karakter girildiğini kontrol etme
  if (searchText.length < 2) {
    // Eğer iki karakterden azsa, "results-list" içeriğini temizleme
    resultsList.innerHTML = "";

    // Eşleşen sonuç olmadığında "search-results-home" bölümünü gizleme
    searchResultsHome.style.display = "none";
    searchButton.style.visibility = "hidden"; // Eşleşen sonuç yoksa düğmeyi gizleme
    return;
  }

  // Eğer "search-input-mainpage" sınıfı varsa en fazla 3 tane li ile sınırlama
  const isMainPageInput = searchInput.classList.contains(
    "search-input-mainpage"
  );
  let maxResults = isMainPageInput ? 3 : combinedData.length;

  // "results-list" içeriğini temizle
  resultsList.innerHTML = "";

  // Eşleşen sonuç sayacı
  let matchingCount = 0;

  // Local Storage'dan çekilen verileri  işleme
  combinedData.forEach((item) => {
    // Arama metni ile "nameSurname" içeriğini karşılaştırma
    if (item.nameSurname.toLowerCase().includes(searchText)) {
      if (matchingCount < maxResults) {
        // En fazla 3 sonuca kadar gösterme
        // Eşleşen veri için yeni bir li öğesi oluşturma
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

        // Oluşturulan li öğesini "results-list" ul elementine ekleme
        resultsList.appendChild(listItem);

        // Eşleşen sonuç sayacını arttırma
        matchingCount++;
      }

      document.querySelectorAll(".search-link").forEach((el) => {
        el.setAttribute("href", "./results.html?s=" + searchText);
      });

      // Eğer 3 sonuç gösterildiyse döngüyü sonlandırma
      if (matchingCount >= maxResults) {
        return;
      }
    }
  });

  // Eşleşen sonuçlar varsa "search-results-home" bölümünü görünür hale getirme
  if (matchingCount > 0) {
    searchResultsHome.style.display = "flex";
    searchButton.style.visibility = "visible"; // Eşleşen sonuçlar varsa düğmeyi görünür yapma
  } else {
    // Eşleşen sonuç yoksa yine gizliyoruz
    searchResultsHome.style.display = "none";
    searchButton.style.visibility = "hidden"; // Eşleşen sonuç yoksa düğmeyi gizleme
  }
});
