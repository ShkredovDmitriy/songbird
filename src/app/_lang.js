import { store } from './_store';
import { birdsData, langData } from './_data';

const buttonRu = document.querySelector('#langRuButton');
const buttonEn = document.querySelector('#langEnButton');

export const useLanguage = () => {
  // STORAGE
  const lang = localStorage.getItem('language') || 'ru';
  if (lang === 'ru') store.language = 'ru';
  if (lang === 'en') store.language = 'en';
  // BUTTON
  if (store.language === 'en') setLang(buttonEn, 'en');
  else setLang(buttonRu, 'ru');
  // CHANGE
  buttonRu.addEventListener('click', () => setLang(buttonRu, 'ru'));
  buttonEn.addEventListener('click', () => setLang(buttonEn, 'en'));
};

// HELPERS
function setLang(btn, lang) {
  store.language = lang;
  localStorage.setItem('language', lang);
  buttonEn.classList.remove('active');
  buttonRu.classList.remove('active');
  btn.classList.add('active');

  // HEADER
  ql('#headerStartLink', langData.header.start);
  ql('#headerGameLink', langData.header.game);
  ql('#headerResultsLink', langData.header.results);
  ql('#headerGalleryLink', langData.header.gallery);

  // START
  ql('#startSubtitle', langData.start.subtitle);
  ql('#startTitle', langData.start.title);
  ql('#startInfo', langData.start.info);
  ql('#startButton', langData.start.button);

  // GAMES
  ql('#gameScoreTitle', langData.game.scoreTitle);
  ql('#gameLevel1Button', langData.game.level1);
  ql('#gameLevel2Button', langData.game.level2);
  ql('#gameLevel3Button', langData.game.level3);
  ql('#gameLevel4Button', langData.game.level4);
  ql('#gameLevel5Button', langData.game.level5);

  if (!store.canCheck) {
    qs('#gameSecretName').textContent = store.writeAnswerName;
    if (store.language == 'en') {
      qs('#gameSecretName').textContent = store.writeAnswerName_en;
    }
  }

  birdsData.flat().forEach((bird) => {
    if (document.querySelector(`#gameBird${bird.id}Name`)) {
      let name = bird.name;
      if (store.language == 'en') name = bird.name_en;
      qs(`#gameBird${bird.id}Name`).innerHTML = name;
    }
  });

  if (store.currDescription) {
    const { name, name_en } = store.currDescription;
    // let gameDescrNam = store.currDescription.name;
    // if (store.language == 'en') gameDescrNam = store.currDescription.name_en;
    qs('#gameDescrName').innerHTML = store.language == 'en' ? name_en : name;
    const { description, description_en } = store.currDescription;
    qs('#gameDescrAbout').innerHTML =
      store.language == 'en' ? description_en : description;
  }

  store.currDescription;

  ql('#gameDescStab', langData.game.descStab);
  ql('#gameNextButton', langData.game.nextButton);

  // RESULTS
  if (!store.gameIsFinish) {
    ql('#resultsTitle', langData.results.emptyTitle);
    ql('#resultsMessage', langData.results.emptyMessage);
  } else if (store.gameIsFinish && store.scoreTotal < 25) {
    ql('#resultsTitle', langData.results.someTitle);
    qf('#resultsMessage', langData.results.someMessage);
  } else if (store.gameIsFinish && store.scoreTotal == 25) {
    ql('#resultsTitle', langData.results.maxTitle);
    qf('#resultsMessage', langData.results.maxMessage);
  }
  ql('#resultsButton', langData.results.button);

  // GALLERY
  birdsData.flat().forEach((bird) => {
    // console.log(bird);
    if (document.querySelector(`#galleryBird${bird.id}Title`)) {
      let data = `${bird.name} (${bird.species})`;
      if (store.language == 'en') data = `${bird.name_en} (${bird.species})`;
      document.querySelector(`#galleryBird${bird.id}Title`).innerHTML = data;
    }
    if (document.querySelector(`#galleryBird${bird.id}About`)) {
      let data = `${bird.description}`;
      if (store.language == 'en') data = `${bird.description_en}`;
      document.querySelector(`#galleryBird${bird.id}About`).innerHTML = data;
    }
  });

  // id="galleryBird${bird.id}Title">${bird.name} (${bird.species})</div>
  //       <div class="gallery__info" id="galleryBird${bird.id}About">${
}

function qs(selector) {
  return document.querySelector(selector);
}

function ql(selector, data) {
  document.querySelector(selector).innerHTML = data[store.language];
}

function qf(selector, data) {
  document.querySelector(selector).innerHTML = data[store.language](
    store.scoreTotal
  );
}
