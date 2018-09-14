Blueprint SPA
=============

An example/boilerplate for Medidata Single Page Applications

The `app_js/` directory is where the single page app resides -- you can integrate it
with any back-end framework/server/language.

## React SPA

Currently React is the preferred framework for new javascript applications at medidata,
so this repo emphasizes react. It is somewhat opinionated in setting up an application to match existing practice at Medidata.

### Quick Setup

We recommend yarn, but npm will also work.

1. Install dependencies `yarn`
2. Start development preview server `yarn run dev`
3. Visit `http://localhost:3000/`

### Included in this boilerplate:

* React
* webpack
  * Both a production build and a dev-server setup
  * common loaders including babel, css, svgs and more
* json-server for mock data
* semistandard for painless linting
* karma for testing
  * jasmine for the test framework
  * Using headless chrome
  * Both a background process for development
  * And a ci-friendly setting
* Redux
  * Thunk middleware as lowest-common-denominator
* React-router
* React-intl
  * babel integration to create a list of all translations
    * view them at `app_js/config/i18n/messages/`
    * run `yarn run en-translations` to copy all english translations to `app_js/src/i18n/en.json`
      * also checks for duplicate translations

## Integration with your backend framework

### Generic

For Development
1. Start webpack-dev-server at the port WEBPACK_PORT with `npm run dev-server`
2. You need to include `/assets/vendor.js`, `/assets/bundle.js` in that order.

For Production
1. Make sure the environmental variable NODE_ENV=production
2. `npm run build` will build the files needed by the application
3. By default the build will output to `app_js/build/`, but *do* customize this to better integrate with your back-end framework.
4. Css will be extracted to `bundle.css`
5. In production, include these files in your app: `vendor.js`, `bundle.js`, `bundle.css`
6. How best to integrate with your back-end framework will depend on what framework you are using.

### Rails

See `blueprint_ui` for an example of a rails app integrated with an SPA.

### .net

See `Gambit` (aka RaveX) project `Medidata.Cloud.Edc` as an example of a large .net app integrated with an SPA.
