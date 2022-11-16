import { store } from './_store';

const menuStart = document.querySelector('.header__nav-start-link');
const menuGame = document.querySelector('.header__nav-game-link');
const menuResults = document.querySelector('.header__nav-res-link');

const preloader = document.querySelector('.preloader');
const pageStart = document.querySelector('.start');
const pageGame = document.querySelector('.game');
const pageResults = document.querySelector('.results');

const preloaderShow = () => {
  return new Promise((resp, rej) => {
    preloader.classList.add('show');
    resp();
  });
};

const preloaderHide = () => {
  return new Promise((resp, rej) => {
    setTimeout(() => {
      preloader.classList.remove('show');
      resp();
    }, 1000);
  });
};

const showGame = () => {
  return new Promise((resp, rej) => {
    setTimeout(() => {
      pageStart.classList.remove('show');
      pageGame.classList.add('show');
      resp();
    }, 500);
  });
};

export const pageStartShow = async () => {
  await preloaderShow();
  await showGame();
  await preloaderHide();
  menuStart.classList.remove('active');
  menuGame.classList.add('active');
};

export const router = () => {};
