const hover = document.querySelectorAll('.head__item');
const baseSrc = []
hover.forEach((block, index) => {
    let src = block.querySelector('.head__image').querySelector('img')
    baseSrc.push(src.getAttribute("src"))
    block.addEventListener('mouseover', () => {
        hover.forEach(container => {
            container.querySelector("img").setAttribute("src", src.getAttribute("src"))
        })
    })
    block.addEventListener('mouseout', () => {
        hover.forEach((container, index) => {
            container.querySelector("img").setAttribute("src", baseSrc[index])
        })
    })
});

let mobileOpenBlock = document.querySelectorAll('.head__button-open');
let mobileBlock = document.querySelectorAll('.head__description');
let mobileBackdrop = document.querySelectorAll('.head__backdrop');


mobileOpenBlock.forEach((button, index) => {
    button.addEventListener('click', function () {
        mobileBlock[index].classList.add('active');
        mobileOpenBlock[index].style.display = 'none';
        mobileBackdrop[index].classList.add('active');
    });

});
mobileBackdrop.forEach((backdrop, background) => {
    backdrop.addEventListener('click', function () {
        mobileBlock[background].classList.remove('active');
        mobileOpenBlock[background].style.display = 'block';
        mobileBackdrop[background].classList.remove('active');
    });
});

let burgerOpen = document.querySelector('.header-mobile__burger');
let burgerMenu = document.querySelector('.header__link');
let openMenu = document.querySelector('.header-mobile__icon');
let closeMenu = document.querySelector('.header-mobile__cancel');
let hideLogoText = document.querySelector('.header-mobile__logo-text');


openMenu.addEventListener('click', function () {
    burgerMenu.classList.add('open-menu');
    burgerOpen.classList.add('open-burger');
    hideLogoText.style.display = 'none';
});

closeMenu.addEventListener('click', function () {
    burgerMenu.classList.remove('open-menu');
    burgerOpen.classList.remove('open-burger');
    hideLogoText.style.display = 'flex';
});

let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });
}