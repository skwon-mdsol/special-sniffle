import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'sandman-bower/assets/platform.css';

import App from './App';

// locale data is things like date/time formatting, days of the week, etc
// since we usually only support a handful of languages, we just load all of the supported ones
// here just english and japanese here, but others can easily be added
import {addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';
import ja from 'react-intl/locale-data/ja';

addLocaleData([...en, ...ja]);

// Add a global instance of the react-addons-perf to the global namespec in non-production
// This can be used interactively: do `REACT_PERF.start()` do some action you're
// interested in the performance of, then `REACT_PERF.stop()` and `REACT_PERF.printWasted()`
// to see where you are doing unneccessary work.
if (!__PRODUCTION__) {
  window.REACT_PERF = require('react-addons-perf');
}

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('main')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => { render(App); });
}
