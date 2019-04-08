"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _debug = _interopRequireDefault(require("debug"));

var _MergeScreenshotStrategy = _interopRequireDefault(require("./strategies/MergeScreenshotStrategy"));

var _TrimAndMergeScreenshotStrategy = _interopRequireDefault(require("./strategies/TrimAndMergeScreenshotStrategy"));

var _FullpageScreenshotStrategy = _interopRequireDefault(require("./strategies/FullpageScreenshotStrategy"));

var regexFirefox = /firefox/i;
var regexPhantomjs = /phantomjs/i;
var log = (0, _debug["default"])('wdio-screenshot:ScreenshotStrategyManager');

function matchBrowserName(browser, regex) {
  return browser.desiredCapabilities && browser.desiredCapabilities.browserName && regex.test(browser.desiredCapabilities.browserName);
}

function isPhantomjs(browser) {
  return matchBrowserName(browser, regexPhantomjs);
}

var ScreenshotStrategyManager =
/*#__PURE__*/
function () {
  function ScreenshotStrategyManager() {
    (0, _classCallCheck2["default"])(this, ScreenshotStrategyManager);
  }

  (0, _createClass2["default"])(ScreenshotStrategyManager, null, [{
    key: "getStrategy",
    value: function getStrategy(browser, screenDimensions) {
      if (isPhantomjs(browser)) {
        log('use full page strategy');
        return new _FullpageScreenshotStrategy["default"](screenDimensions);
      }

      var isIOS = browser.isIOS;

      if (isIOS) {
        log('use iOS Trim and Merge viewport strategy');
        return new _TrimAndMergeScreenshotStrategy["default"](screenDimensions);
      }

      log('use merge viewport strategy');
      return new _MergeScreenshotStrategy["default"](screenDimensions);
    }
  }]);
  return ScreenshotStrategyManager;
}();

exports["default"] = ScreenshotStrategyManager;