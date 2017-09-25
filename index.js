const { join } = require('path');
const fs = require('fs');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);

module.exports = async function nuxtApollo(moduleOptions) {
  const defaultOptions = {
    defaultLocale: 'en',
    fallbackLocale: 'en',
    localePath: join(__dirname, '..', '..'),
    storeSetLocales: 'i18n/SET_LOCALES',
    getCurrentLocale: 'i18n/locale',
  };
  const options = Object.assign(defaultOptions, this.options.i18n, moduleOptions);
  options.messages = (await readdir(options.localePath))
    .filter(f => f.search(/^[^.].*\.json$/) > -1)
    .map((f) => {
      const [locale] = f.split('.');
      return { locale, messages: require(join(options.localePath, f)) };
    });
  options.locales = options.messages.map(m => m.locale);

  this.addPlugin({
    src: join(__dirname, 'plugin.js'),
    options,
  });

  if (!this.options.router) {
    this.options.router = {};
  }

  this.addVendor(['vue-i18n']);
};
