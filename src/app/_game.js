import { birdsData } from './_data';
import { store } from './_store';
import { audioBird } from './_audio';

const score = document.querySelector('#gameScore');
const answers = document.querySelector('.game__answers');
const name = document.querySelector('.game__question-name');
const image = document.querySelector('.game__question-image');
const description = document.querySelector('.game__description');
const imageHidden = './images/image-hidden-bird.jpg';

const getRandomBerd = (arr) => {
  const random = Math.floor(Math.random() * arr.length);
  // console.log('RANDOM', random);
  return arr[random];
};

export const gameLevel1 = () => {
  const bird = getRandomBerd(birdsData[1]);
  fillAnsvers(birdsData[1]);
  startNewLevel(bird, 1);
  store.scoreTotal = 0;
  score.textContent = 0;
  store.gameIsFinish = false;
  store.set = birdsData[1];
  store.gameLevel = 1;
};

export const gameLevel2 = () => {
  const bird = getRandomBerd(birdsData[2]);
  fillAnsvers(birdsData[2]);
  startNewLevel(bird, 2);
  store.set = birdsData[2];
};

export const gameLevel3 = () => {
  const bird = getRandomBerd(birdsData[3]);
  fillAnsvers(birdsData[3]);
  startNewLevel(bird, 3);
  store.set = birdsData[3];
};

export const gameLevel4 = () => {
  const bird = getRandomBerd(birdsData[4]);
  fillAnsvers(birdsData[4]);
  startNewLevel(bird, 4);
  store.set = birdsData[4];
};

export const gameLevel5 = () => {
  const bird = getRandomBerd(birdsData[5]);
  fillAnsvers(birdsData[5]);
  startNewLevel(bird, 5);
  store.set = birdsData[5];
};

// HELPERS

function fillAnsvers(arr) {
  answers.innerHTML = '';
  const variants = arr.reduce((acc, el) => {
    let name = el.name;
    if (store.language == 'en') name = el.name_en;
    return (
      acc +
      `
      <label class="game__answer-label">
        <input type="radio" class="game__answer-radio" name="bird" id="${el.id}" data-answer="true">
        <span class="game__answer-name" id="gameBird${el.id}Name">${name}</span>
      </label>
    `
    );
  }, '');
  answers.innerHTML = variants;
}

function startNewLevel(bird, level) {
  // console.log(`LEVEL ${level} RANDOM BIRD`, bird);
  document.querySelectorAll('.game__step-indicator').forEach((el, id) => {
    if (id + 1 == level) el.classList.add('active');
    else el.classList.remove('active');
  });
  name.innerHTML = '*****';
  audioBird.set(bird.audio, bird.duration);
  image.src = imageHidden;
  description.classList = 'game__description data-hidden';
  store.scoreCurrent = 5;
  store.writeAnswerId = bird.id;
  store.writeAnswerName = bird.name;
  store.writeAnswerName_en = bird.name_en;
  store.writeAnswerImage = bird.image;
  image.src = imageHidden;
  store.canCheck = true;
}
