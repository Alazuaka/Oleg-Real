const catalogSwiper = new Swiper('.catalog__pages', {
  // Optional parameters
  // direction: 'vertical',
  // loop: true,
  spaceBetween: 16,
  slidesPerView: 2,
  // autoHeight: 'true',
  grid: {
    rows: 3,
    fill:'row'
  },

  // slidesPerColumn: 2,
  // slidesPerGroup :2,
  slideClass: 'catalog__product',
  wrapperClass: 'catalog__list',
  pagination: {
    el: '.catalog__pagination',
    bulletClass: 'btn pagination__btn',
    bulletActiveClass: 'active',
    renderBullet: function (index, className) {
      return `<button class="${className}">${index + 1}</button>`;
    },
    clickable: 'true',
    type: 'bullets',
  },
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
  breakpoints: {
    // when window width is >= 850px
    550: {
      spaceBetween: 32
    },

    850: {
      slidesPerView: 3,
    }
  }
});
