const electron = require('electron');
const ejse = require('ejs-electron')
const path = require('path');
const fs = require('fs');
const { app, BrowserWindow, protocol } = electron;

let webpackPort = process.env.WEBPACK_PORT || 8000;
let env = process.env.NODE_ENV || 'development';
let useDevServer = process.env.WEBPACK_PORT && env !== 'production';

let jsFiles = [];
let cssFiles = [];
let manifest;
let assetsBase = '';
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow();
  mainWindow.loadURL(`file://${__dirname}/app_js/index.ejs`);
}

// Development / production handler
if (useDevServer) {
  jsFiles = [
    'vendor.js',
    'bundle.js',
    'devHeader.js'
  ];
  cssFiles = [];
  assetsBase = `http://localhost:${webpackPort}/assets/`;
} else {
  manifest = require('./app_js/build/manifest.json');
  jsFiles = [
    manifest.vendor,
    manifest.bundle[0],
    manifest.devHeader[0]
  ];
  cssFiles = [
    manifest.bundle[1],
    manifest.devHeader[1]
  ];
  assetsBase = 'static://';
}

// set ejs vars
ejse.data('jsFiles', jsFiles);
ejse.data('cssFiles', cssFiles);
ejse.data('assetsBase', assetsBase);

app.on('ready', () => {
  createWindow();

  protocol.registerFileProtocol('static', (req, cb) => {
    const url = req.url.substr(7)
    cb({path: `${__dirname}/app_js/build/${url}`})
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

