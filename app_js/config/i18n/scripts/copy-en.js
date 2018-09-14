const fs = require('fs');
const globSync = require('glob').sync;

const allTranslations = globSync('./app_js/config/i18n/messages/**/*.json')
  .map(f => JSON.parse(fs.readFileSync(f)))
  .reduce((translations, part) => {
    part.forEach(({id, defaultMessage}) => {
      if (translations[id]) throw new Error(`duplaicate translation id "${id}"`);
      translations[id] = defaultMessage;
    });
    return translations;
  }, {});

fs.writeFileSync('./app_js/src/i18n/en.json', JSON.stringify(allTranslations));
