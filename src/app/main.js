import '../styles/scss/main.scss';
import { pageStartShow } from './_router';

const buttonPlay = document.querySelector('.start__play-button');

// TODO: move to extend module
window.onload = () => {
  setTimeout(() => {
    document.querySelector('.preloader').classList.remove('preloader--show');
  }, 2500);
};

// TODO: move to extend module

buttonPlay.addEventListener('click', async () => {
  pageStartShow();
});
