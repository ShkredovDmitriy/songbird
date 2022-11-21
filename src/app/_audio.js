const audioSuccessCreate = () => {
  const audio = new Audio();
  audio.src = './audio/sound-success.mp3';
  audio.currentTime = 0;

  const play = () => {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  };
  return { play };
};

export const audioUnsuccessCreate = () => {
  const audio = new Audio();
  audio.src = './audio/sound-unsuccess.mp3';
  audio.currentTime = 0;

  const play = () => {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  };
  return { play };
};

const audioBirdCreate = () => {
  const playButton = document.querySelector('.game__play-button');
  const volButton = document.querySelector('.question__button-volume');
  const progress = document.querySelector('.question__progress');
  const currTime = document.querySelector('.question__curr-time');
  const maxTime = document.querySelector('.question__max-time');
  const volume = document.querySelector('.question__volume');
  const loud = document.querySelector('.question__progress-loud');

  const audio = new Audio();

  volume.addEventListener('input', (e) => {
    audio.volume = e.target.value;
    loud.textContent = Math.floor(e.target.value * 100);
    if (e.target.value == 0) volButton.classList.add('muted');
    else volButton.classList.remove('muted');
  });

  volButton.addEventListener('click', () => {
    if (volButton.classList.contains('muted')) {
      audio.volume = 1;
      loud.textContent = 100;
      volume.value = 100;
      volButton.classList.remove('muted');
    } else {
      audio.volume = 0;
      loud.textContent = 0;
      volume.value = 0;
      volButton.classList.add('muted');
    }
  });

  const play = () => {
    if (!audio.paused) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const pause = () => {
    audio.pause();
  };

  const set = (url, duration) => {
    playButton.classList.remove('is-playing');
    audio.pause();
    audio.currentTime = 0;
    audio.src = url;
    maxTime.textContent = calcTime(duration);
  };

  playButton.addEventListener('click', () => {
    play();
  });

  audio.addEventListener('play', () => {
    playButton.classList.add('is-playing');
  });

  audio.addEventListener('pause', () => {
    playButton.classList.remove('is-playing');
  });

  audio.addEventListener('ended', () => {
    playButton.classList.remove('is-playing');
  });

  progress.addEventListener(
    'input',
    (e) =>
      (audio.currentTime = (parseFloat(e.target.value) * audio.duration) / 100)
  );

  audio.addEventListener('timeupdate', function (e) {
    currTime.textContent = calcTime(audio.currentTime);
    if (audio.duration)
      progress.value = (audio.currentTime / audio.duration) * 100;
    else progress.value = 0;
  });

  audio.addEventListener('ended', function (e) {
    console.log('ENDED');
    currTime.textContent = '00:00';
    progress.value = 0;
  });

  return { audio, play, pause, set };
};

const audioDescriptionCreate = () => {
  const playButton = document.querySelector('.description__play-button');
  const volButton = document.querySelector('.description__button-volume');
  const progress = document.querySelector('.description__progress');
  const volume = document.querySelector('.description__volume');
  const loud = document.querySelector('.description__progress-loud');

  const audio = new Audio();

  volume.addEventListener('input', (e) => {
    audio.volume = e.target.value;
    loud.textContent = Math.floor(e.target.value * 100);
    if (e.target.value == 0) volButton.classList.add('muted');
    else volButton.classList.remove('muted');
  });

  volButton.addEventListener('click', () => {
    if (volButton.classList.contains('muted')) {
      audio.volume = 1;
      loud.textContent = 100;
      volume.value = 100;
      volButton.classList.remove('muted');
    } else {
      audio.volume = 0;
      loud.textContent = 0;
      volume.value = 0;
      volButton.classList.add('muted');
    }
  });

  const play = () => {
    if (!audio.paused) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const pause = () => {
    audio.pause();
  };

  const set = (url) => {
    playButton.classList.remove('is-playing');
    audio.pause();
    audio.currentTime = 0;
    audio.src = url;
  };

  playButton.addEventListener('click', () => {
    play();
  });

  audio.addEventListener('play', () => {
    playButton.classList.add('is-playing');
  });

  audio.addEventListener('pause', () => {
    playButton.classList.remove('is-playing');
  });

  audio.addEventListener('ended', () => {
    playButton.classList.remove('is-playing');
  });

  progress.addEventListener(
    'input',
    (e) =>
      (audio.currentTime = (parseFloat(e.target.value) * audio.duration) / 100)
  );

  audio.addEventListener('timeupdate', function (e) {
    if (audio.duration)
      progress.value = (audio.currentTime / audio.duration) * 100;
    else progress.value = 0;
  });

  audio.addEventListener('ended', function (e) {
    progress.value = 0;
  });

  return { play, pause, set };
};

// AUDIO GALLERY
const audioGalleryCreate = () => {
  const section = document.querySelector('.gallery');
  const playButton = document.querySelector('.gallery__play-button');
  const volButton = document.querySelector('.gallery__button-volume');
  const progress = document.querySelector('.gallery__progress');
  const volume = document.querySelector('.gallery__volume');
  const loud = document.querySelector('.gallery__progress-loud');
  let cuurBirdId = null;

  const audio = new Audio();

  volume.addEventListener('input', (e) => {
    audio.volume = e.target.value;
    loud.textContent = Math.floor(e.target.value * 100);
    if (e.target.value == 0) volButton.classList.add('muted');
    else volButton.classList.remove('muted');
  });

  volButton.addEventListener('click', () => {
    if (volButton.classList.contains('muted')) {
      audio.volume = 1;
      loud.textContent = 100;
      volume.value = 100;
      volButton.classList.remove('muted');
    } else {
      audio.volume = 0;
      loud.textContent = 0;
      volume.value = 0;
      volButton.classList.add('muted');
    }
  });

  const play = () => {
    if (!audio.paused) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const pause = () => {
    audio.pause();
  };

  const set = (url, id) => {
    playButton.classList.remove('is-playing');
    audio.pause();
    audio.currentTime = 0;
    audio.src = url;
    cuurBirdId = id;
  };

  playButton.addEventListener('click', () => {
    play();
  });

  audio.addEventListener('play', () => {
    playButton.classList.add('is-playing');
    document.querySelectorAll('.gallery__bird-sound-button').forEach((el) => {
      const dataId = el.getAttribute('data-id');
      if (dataId && dataId == cuurBirdId) el.classList.add('is-playing');
    });
  });

  audio.addEventListener('pause', () => {
    playButton.classList.remove('is-playing');
    section.classList.remove('play');
    document.querySelectorAll('.gallery__bird-sound-button').forEach((el) => {
      el.classList.remove('is-playing');
    });
  });

  audio.addEventListener('ended', () => {
    playButton.classList.remove('is-playing');
    section.classList.remove('play');
    document
      .querySelectorAll('.gallery__bird-sound-button')
      .forEach((el) => el.classList.remove('is-playing'));
  });

  progress.addEventListener(
    'input',
    (e) =>
      (audio.currentTime = (parseFloat(e.target.value) * audio.duration) / 100)
  );

  audio.addEventListener('timeupdate', function (e) {
    if (audio.duration)
      progress.value = (audio.currentTime / audio.duration) * 100;
    else progress.value = 0;
  });

  audio.addEventListener('ended', function (e) {
    progress.value = 0;
  });

  return { play, pause, set };
};

export const audioSuccess = audioSuccessCreate();
export const audioUnsuccess = audioUnsuccessCreate();
export const audioBird = audioBirdCreate();
export const audioDescription = audioDescriptionCreate();
export const audioGallery = audioGalleryCreate();

//
function calcTime(sec) {
  if (sec) {
    const minutes = '' + Math.floor(sec / 60);
    const seconds = '' + Math.floor(sec % 60);
    return `${minutes.padStart(2, 0)}:${seconds.padStart(2, 0)}`;
  }
  return '00:00';
}
