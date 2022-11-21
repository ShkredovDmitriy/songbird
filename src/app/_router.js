import { store } from './_store';

const menuList = document.querySelectorAll('.header__nav-link');
const menuStart = document.querySelector('#headerStartLink');
const menuGame = document.querySelector('#headerGameLink');
const menuResults = document.querySelector('#headerResultsLink');
const menuGallery = document.querySelector('#headerGalleryLink');

const sections = document.querySelectorAll('.section');
const preloader = document.querySelector('.preloader');
const pageStart = document.querySelector('.start');
const pageGame = document.querySelector('.game');
const pageResults = document.querySelector('.results');
const pageGallery = document.querySelector('.gallery');

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

const allHide = () => {
  return new Promise((resp, rej) => {
    setTimeout(() => {
      menuList.forEach((el) => el.classList.remove('active'));
      sections.forEach((el) => el.classList.remove('show'));
      resp();
    }, 100);
  });
};

const startShow = () => {
  return new Promise((resp, rej) => {
    setTimeout(() => {
      menuStart.classList.add('active');
      pageStart.classList.add('show');
      resp();
    }, 100);
  });
};

const gameShow = () => {
  return new Promise((resp, rej) => {
    setTimeout(() => {
      menuGame.classList.add('active');
      pageGame.classList.add('show');
      resp();
    }, 100);
  });
};

const resultsShow = () => {
  return new Promise((resp, rej) => {
    setTimeout(() => {
      menuResults.classList.add('active');
      pageResults.classList.add('show');
      resp();
    }, 100);
  });
};

const galleryShow = () => {
  return new Promise((resp, rej) => {
    setTimeout(() => {
      menuGallery.classList.add('active');
      pageGallery.classList.add('show');
      resp();
    }, 100);
  });
};

export const pageStartShow = async () => {
  await preloaderShow();
  await allHide();
  await startShow();
  await preloaderHide();
};

export const pageGameShow = async () => {
  await preloaderShow();
  await allHide();
  await gameShow();
  await preloaderHide();
};

export const pageResultsShow = async () => {
  await preloaderShow();
  await allHide();
  await resultsShow();
  await preloaderHide();
};

export const pageGalleryShow = async () => {
  await preloaderShow();
  await allHide();
  await galleryShow();
  await preloaderHide();
};
