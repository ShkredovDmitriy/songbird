import '../styles/scss/main.scss';
import { store } from './_store';
import { useLanguage } from './_lang';
import {
  pageStartShow,
  pageGameShow,
  pageResultsShow,
  pageGalleryShow,
} from './_router';
import {
  audioSuccess,
  audioUnsuccess,
  audioBird,
  audioDescription,
} from './_audio';
import {
  gameLevel1,
  gameLevel2,
  gameLevel3,
  gameLevel4,
  gameLevel5,
} from './_game';
import { pageResultsFill } from './_results';
import { pageGalleryFill } from './_gallery';

// HEADER
const buttonNavStart = document.querySelector('#headerStartLink');
const buttonNavGame = document.querySelector('#headerGameLink');
const buttonNavResults = document.querySelector('#headerResultsLink');
const buttonNavGallery = document.querySelector('#headerGalleryLink');

const buttonNext = document.querySelector('#gameNextButton');
const buttonPlay = document.querySelector('.start__play-button');
const buttonRestart = document.querySelector('#resultsButton');
const answers = document.querySelector('.game__answers');
const score = document.querySelector('#gameScore');
const name = document.querySelector('.game__question-name');
const image = document.querySelector('.game__question-image');
const description = document.querySelector('.game__description');
const descriptionName = document.querySelector('.description__bird-name');
const descriptionSpec = document.querySelector('.description__bird-spec');
const descriptionAbout = document.querySelector('.description__about');
const descriptionImage = document.querySelector('.description__image');

useLanguage();
pageGalleryFill();

// TODO: move to extend module
window.onload = () => {
  setTimeout(() => {
    document.querySelector('.preloader').classList.remove('show');
  }, 2500);
};

// TODO: move to extend module

buttonPlay.addEventListener('click', async () => {
  pageGameShow();
  // pageResultsShow();
  gameLevel1();
});

answers.addEventListener('click', (e) => {
  if (e.target.getAttribute('data-answer')) {
    if (e.target.id == store.writeAnswerId) {
      if (store.canCheck) {
        name.innerHTML = store.writeAnswerName;
        if (store.language == 'en') name.innerHTML = store.writeAnswerName_en;
        image.src = store.writeAnswerImage;
        buttonNext.disabled = false;
        store.gameStatus = 'success';
        if (!e.target.classList.contains('success')) {
          store.scoreTotal += store.scoreCurrent;
          score.innerHTML = `${store.scoreTotal}`;
          audioSuccess.play();
          audioBird.pause();
        }
        e.target.classList.add('success');
      }
      store.canCheck = false;
    } else {
      if (store.canCheck) {
        if (!e.target.classList.contains('unsuccess')) {
          audioUnsuccess.play();
          store.scoreCurrent -= 1;
        }
        e.target.classList.add('unsuccess');
      }
    }
    descriptionFill(e.target.id);
  }
});

buttonNext.addEventListener('click', (e) => {
  // console.log('buttonNext', store);
  audioDescription.pause();

  if (store.gameStatus == 'success' && store.gameLevel == 1) {
    store.gameLevel = 2;
    store.gameStatus = 'unsuccess';
    buttonNext.disabled = true;
    gameLevel2();
  }

  if (store.gameStatus == 'success' && store.gameLevel == 2) {
    store.gameLevel = 3;
    store.gameStatus = 'unsuccess';
    buttonNext.disabled = true;
    gameLevel3();
  }

  if (store.gameStatus == 'success' && store.gameLevel == 3) {
    store.gameLevel = 4;
    store.gameStatus = 'unsuccess';
    buttonNext.disabled = true;
    gameLevel4();
  }

  if (store.gameStatus == 'success' && store.gameLevel == 4) {
    store.gameLevel = 5;
    store.gameStatus = 'unsuccess';
    buttonNext.disabled = true;
    gameLevel5();
  }

  if (store.gameStatus == 'success' && store.gameLevel == 5) {
    store.gameLevel = null;
    store.gameStatus = 'unsuccess';
    buttonNext.disabled = true;
    store.gameIsFinish = true;
    pageResultsFill();
    pageResultsShow();
  }
});

buttonNavStart.addEventListener('click', () => {
  pageStartShow();
});

buttonNavGame.addEventListener('click', () => {
  gameLevel1();
  pageGameShow();
});

buttonRestart.addEventListener('click', () => {
  gameLevel1();
  pageGameShow();
});

buttonNavResults.addEventListener('click', () => pageResultsShow());

buttonNavGallery.addEventListener('click', () => {
  pageGalleryShow();
});

//
function descriptionFill(id) {
  const bird = store.set.filter((el) => el.id == id)[0];
  if (bird) {
    description.classList = 'game__description data-show';

    let birdName = bird.name;
    if (store.language == 'en') birdName = bird.name_en;

    let birdDescr = bird.description;
    if (store.language == 'en') birdDescr = bird.description_en;

    store.currDescription = bird;
    descriptionName.textContent = birdName;
    descriptionSpec.textContent = bird.species;
    descriptionAbout.textContent = birdDescr;
    descriptionImage.setAttribute('src', bird.image);
    audioDescription.set(bird.audio);
  }
}
