const specialSwiper = new Swiper('.special__slider', {
  // Optional parameters
  // direction: 'vertical',
  // loop: true,
  // spaceBetween: 32,
  slidesPerView: 4,
  // autoHeight: 'true',
  // slidesPerColumn: 2,
  // slidesPerGroup :2,
  slideClass: 'special__item',
  wrapperClass: 'special__list',
  // pagination: {
  //   el: '.special__pagination',
  //   bulletClass: 'btn pagination__btn',
  //   bulletActiveClass: 'active',
  //   renderBullet: function (index, className) {
  //     return `<button class="${className}">${index + 1}</button>`;
  //   },
  //   clickable: 'true',
  //   type: 'bullets',
  // },
  // navigation: {
  //   nextEl: '.swiper-button-next',
  //   prevEl: '.swiper-button-prev',
  // },
  // If we need pagination

  // Navigation arrows
  // slidesPerView: 2,
  // navigation: {
  //   nextEl: '.swiper-button-next',
  //   prevEl: '.swiper-button-prev',
  // },

  // And if we need scrollbar
  // scrollbar: {
  //   el: '.swiper-scrollbar',
  // },
  // breakpoints: {
  //   // when window width is >= 850px
  //   550: {
  //     spaceBetween: 32
  //   },

  //   850: {
  //     slidesPerView: 3,
  //   }
  // }
});
