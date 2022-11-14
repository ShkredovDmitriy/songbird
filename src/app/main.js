import '../styles/scss/main.scss';

// TODO: move to extend module
window.onload = () => {
  setTimeout(() => {
    document.querySelector('.preloader').classList.remove('preloader--show');
  }, 2500);
};

// TODO: move to extend module

const preloaderShow = () => {
  return new Promise((resp, rej) => {
    document.querySelector('.preloader').classList.add('preloader--show');
    resp();
  });
};

const preloaderHide = () => {
  return new Promise((resp, rej) => {
    setTimeout(() => {
      document.querySelector('.preloader').classList.remove('preloader--show');
      resp();
    }, 1000);
  });
};

const showGame = () => {
  return new Promise((resp, rej) => {
    setTimeout(() => {
      document
        .querySelector('.content__start')
        .classList.remove('content__start--show');
      document
        .querySelector('.content__game')
        .classList.add('content__game--show');
      resp();
    }, 1000);
  });
};

document
  .querySelector('.content__play-button')
  .addEventListener('click', async () => {
    await preloaderShow();
    await showGame();
    await preloaderHide();
  });
