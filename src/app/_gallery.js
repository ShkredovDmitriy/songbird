import { store } from './_store';
import { birdsData } from './_data';
import { audioGallery } from './_audio';

const section = document.querySelector('.gallery');
const cardContainer = document.querySelector('#galleryCards');

export const pageGalleryFill = () => {
  let html = '';
  birdsData.flat().forEach((bird) => {
    let title = `${bird.name} (${bird.species})`;
    if (store.language == 'en') title = `${bird.name_en} (${bird.species})`;
    let about = `${bird.description}`;
    if (store.language == 'en') about = `${bird.description_en}`;
    html += `
      <div class="gallery__card">
        <div class="gallery__image">
          <img src="${bird.image}">
          <button class="button gallery__bird-sound-button" data-id="${bird.id}">
            <img class="icon icon-play" src="./images/icon-play.svg" alt="">
            <img class="icon icon-pause" src="./images/icon-pause.svg" alt="">
          </button>
        </div>
        <div class="gallery__name" id="galleryBird${bird.id}Title">${title}</div>
        <div class="gallery__info" id="galleryBird${bird.id}About">${about}</div>
      </div>
    `;
  });
  cardContainer.innerHTML = html;

  cardContainer.addEventListener('click', (e) => {
    const dataId = e.target.getAttribute('data-id');
    if (dataId) {
      // console.log(dataId);

      if (e.target.classList.contains('is-playing')) {
        document
          .querySelectorAll('.gallery__bird-sound-button')
          .forEach((el) => el.classList.remove('is-playing'));
        audioGallery.pause();
      } else {
        document
          .querySelectorAll('.gallery__bird-sound-button')
          .forEach((el) => el.classList.remove('is-playing'));
        e.target.classList.add('is-playing');
        section.classList.add('play');
        const bird = birdsData.flat().filter((bird) => bird.id == dataId)[0];
        if (bird) {
          audioGallery.set(bird.audio, bird.id);
          audioGallery.play();
        }
      }
    }
  });
};
