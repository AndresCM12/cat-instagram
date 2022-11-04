export function SwiperApp() {
  let swiper = new Swiper(".mySwiper.mySwiper", {
    speed: 300,
    direction: "horizontal",
    loop: false,

    scrollbar: {
      el: ".swiper-scrollbar",
      clickable: true,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    hashNavigation: {
      watchState: true,
    },
  });

  return swiper;
}
