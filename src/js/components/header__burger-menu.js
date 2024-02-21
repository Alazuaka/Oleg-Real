// import { Dropdown } from "./plugins/dropdown"
const $burger = document.querySelector('.burger')
const $nav = document.querySelector('.nav')
const $menu = document.querySelector('.menu')
const burgerToggler = (e) => {
  $burger.classList.toggle('is-active')
  $nav.classList.toggle('is-active')
  $menu.classList.toggle('is-active')
}

$burger.addEventListener('click', burgerToggler)
