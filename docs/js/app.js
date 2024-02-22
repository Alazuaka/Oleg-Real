// import { Dropdown } from "./plugins/dropdown"
const $burger = document.querySelector('.burger')
const $navMenu = document.querySelector('.header__menu')
const burgerToggler = (e) => {
  $burger.classList.toggle('is-active')
  $navMenu.classList.toggle('is-active')
}

$burger.addEventListener('click', burgerToggler)

