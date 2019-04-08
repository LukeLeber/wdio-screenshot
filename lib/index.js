"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
Object.defineProperty(exports, "makeDocumentScreenshot", {
  enumerable: true,
  get: function get() {
    return _makeDocumentScreenshot["default"];
  }
});
Object.defineProperty(exports, "makeElementScreenshot", {
  enumerable: true,
  get: function get() {
    return _makeElementScreenshot["default"];
  }
});
Object.defineProperty(exports, "makeViewportScreenshot", {
  enumerable: true,
  get: function get() {
    return _makeViewportScreenshot["default"];
  }
});

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _saveDocumentScreenshot = _interopRequireDefault(require("./commands/saveDocumentScreenshot"));

var _saveElementScreenshot = _interopRequireDefault(require("./commands/saveElementScreenshot"));

var _saveViewportScreenshot = _interopRequireDefault(require("./commands/saveViewportScreenshot"));

var _makeDocumentScreenshot = _interopRequireDefault(require("./modules/makeDocumentScreenshot"));

var _makeElementScreenshot = _interopRequireDefault(require("./modules/makeElementScreenshot"));

var _makeViewportScreenshot = _interopRequireDefault(require("./modules/makeViewportScreenshot"));

var WDIOScreenshot = function WDIOScreenshot(browser, options) {
  (0, _classCallCheck2["default"])(this, WDIOScreenshot);

  if (!browser) {
    throw new Error('A WebdriverIO instance is needed to initialise wdio-screenshot');
  } // add commands to WebdriverIO instance


  browser.addCommand('saveDocumentScreenshot', _saveDocumentScreenshot["default"]);
  browser.addCommand('saveElementScreenshot', _saveElementScreenshot["default"]);
  browser.addCommand('saveViewportScreenshot', _saveViewportScreenshot["default"]);
}; // export init function for initialization


function init(webdriverInstance, options) {
  return new WDIOScreenshot(webdriverInstance, options);
} // export also helpers for regression lib