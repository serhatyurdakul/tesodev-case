document.addEventListener("DOMContentLoaded", function () {
  const sliderWrapper = document.querySelector(".slider .slider-wrapper");
  const newsCards = document.querySelectorAll(".news-card");
  const buttonLeft = document.querySelector(".slider-button-left");
  const buttonRight = document.querySelector(".slider-button-right");
  const numVisibleItems = 3;
  let currentIndex = 0;

  function updateSlider() {
    for (let i = 0; i < newsCards.length; i++) {
      newsCards[i].style.display = "none";
    }

    for (let i = 0; i < numVisibleItems; i++) {
      const index = (currentIndex + i) % newsCards.length;
      newsCards[index].style.display = "block";
    }
  }

  buttonRight.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % (newsCards.length - 2);
    updateSlider();
  });

  buttonLeft.addEventListener("click", function () {
    currentIndex =
      (currentIndex - 1 + (newsCards.length - 2)) % (newsCards.length - 2);
    updateSlider();
  });

  updateSlider();
});
