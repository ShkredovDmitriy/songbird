import { store } from './_store';
import { langData } from './_data';

export const pageResultsFill = () => {
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
};

//
function ql(selector, data) {
  document.querySelector(selector).innerHTML = data[store.language];
}

function qf(selector, data) {
  document.querySelector(selector).innerHTML = data[store.language](
    store.scoreTotal
  );
}
