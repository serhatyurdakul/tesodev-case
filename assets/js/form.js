document.addEventListener("DOMContentLoaded", () => {
  // Form elementini seçme
  const form = document.querySelector("form");

  // Tüm input alanlarını seçme
  const nameSurnameInput = document.querySelector('input[name="nameSurname"]');
  const countryInput = document.querySelector('input[name="country"]');
  const cityInput = document.querySelector('input[name="city"]');
  const emailInput = document.querySelector('input[name="email"]');
  const websiteInput = document.querySelector('input[name="website"]');

  // "Add" düğmesini seçme
  const addButton = document.querySelector('button[type="submit"]');

  // Tüm input alanları değişikliklerini dinleme
  form.addEventListener("input", () => {
    if (
      nameSurnameInput.value.trim() !== "" &&
      countryInput.value.trim() !== "" &&
      cityInput.value.trim() !== "" &&
      emailInput.value.trim() !== "" &&
      websiteInput.value.trim() !== ""
    ) {
      // Tüm input alanları doluysa, düğmeyi etkinleştir
      addButton.removeAttribute("disabled");
    } else {
      // Herhangi bir input alanı boşsa, düğmeyi devre dışı bırak
      addButton.setAttribute("disabled", "disabled");
    }
  });

  function validateForm() {
    const nameSurnamePattern = /^[a-zA-Z ]{4,60}$/;
    const countryPattern = /^[a-zA-Z ]{2,40}$/;
    const cityPattern = /^[a-zA-Z ]{2,40}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const websitePattern = /^https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

    if (!nameSurnamePattern.test(nameSurnameInput.value)) {
      alert(
        "Ad Soyad geçersiz. Sadece harf karakterleri içermeli, en az 4 - en fazla 60 karakter uzunluğunda olmalıdır."
      );
      nameSurnameInput.classList.add("error");
      return false;
    }
    nameSurnameInput.classList.remove("error");
    if (!countryPattern.test(countryInput.value)) {
      alert(
        "Ülke geçersiz. Sadece harf karakterleri içermeli, en az 2 - en fazla 40 karakter uzunluğunda olmalıdır."
      );
      countryInput.classList.add("error");
      return false;
    }
    countryInput.classList.remove("error");

    if (!cityPattern.test(cityInput.value)) {
      alert(
        "Şehir geçersiz. Sadece harf karakterleri içermeli, en az 2 - en fazla 40 karakter uzunluğunda olmalıdır."
      );
      cityInput.classList.add("error");
      return false;
    }
    cityInput.classList.remove("error");

    if (!emailPattern.test(emailInput.value)) {
      alert("E-posta geçersiz. Lütfen geçerli bir e-posta adresi giriniz.");
      emailInput.classList.add("error");
      return false;
    }
    emailInput.classList.remove("error");

    if (!websitePattern.test(websiteInput.value)) {
      alert(
        "Website URL geçersiz. Lütfen geçerli bir URL (örneğin, https://ornek.com) giriniz."
      );
      websiteInput.classList.add("error");
      return false;
    }
    websiteInput.classList.remove("error");
    // Eğer tüm doğrulamalar geçerliyse
    return true;
  }



  // Form submit olayını dinleme
  form.addEventListener("submit", async function (e) {
    e.preventDefault(); 
    e.stopPropagation();

    if (!validateForm()) {
      return;
    }


    
    /* 

    //  Url Shortener API 

    let url;

    const websiteURL = websiteInput.value.trim();

    if (websiteURL) {
      // Website URL'sini API ile sıkıştırmak için kullanılacak URL
      const apiURL = `https://ulvis.net/API/write/get?url=${websiteURL}&private=1`;

      try {
        // API'yi çağırma ve sıkıştırılmış URL'yi alma
        const response = await fetch(apiURL, { mode: "no-cors" });
        console.log(response);
        if (response.status >= 200 && response.status < 300) {
          const data = await response.json();
          url = data.url;

     

          // Formu gönder
        } else {
          alert(
            "Website URL sıkıştırma başarısız oldu. Lütfen geçerli bir URL girdiğinizden emin olun."
          );
          return;
        }
      } catch (error) {
        console.error("API hatası:", error);
        alert(
          "URL sıkıştırma sırasında bir hata oluştu. Lütfen tekrar deneyin."
        );
        return;
      }
    } else {
      alert("Website URL boş olamaz. Lütfen geçerli bir URL girin.");
      return;
    } */


    // Alınan verileri bir nesne olarak saklama
    const formData = {
      nameSurname: nameSurnameInput.value,
      country: countryInput.value,
      city: cityInput.value,
      email: emailInput.value,
      website: websiteInput.value,
    };

    // Alınan verileri kullanmak veya göndermek için formData nesnesi kullanılabilir
    /* console.log(formData); */

    let storage = JSON.parse(localStorage.getItem("combinedData"));

    storage.push(formData);

    localStorage.setItem("combinedData", JSON.stringify(storage));

    nameSurnameInput.classList.remove("error");
    countryInput.classList.remove("error");
    cityInput.classList.remove("error");
    emailInput.classList.remove("error");
    websiteInput.classList.remove("error");
    // Formu temizle 
    form.reset();
  });
});
