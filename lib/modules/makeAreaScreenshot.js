"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = makeAreaScreenshot;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _debug = _interopRequireDefault(require("debug"));

var _ScreenshotStrategyManager = _interopRequireDefault(require("../utils/ScreenshotStrategyManager"));

var _getScreenDimensions = _interopRequireDefault(require("../scripts/getScreenDimensions"));

var _virtualScroll = _interopRequireDefault(require("../scripts/virtualScroll"));

var _pageHeight = _interopRequireDefault(require("../scripts/pageHeight"));

var _generateUUID = _interopRequireDefault(require("../utils/generateUUID"));

var _saveBase64Image = _interopRequireDefault(require("../utils/saveBase64Image"));

var _image = require("../utils/image");

var _ScreenDimension = _interopRequireDefault(require("../utils/ScreenDimension"));

var _normalizeScreenshot = _interopRequireDefault(require("../utils/normalizeScreenshot"));

var log = (0, _debug["default"])('wdio-screenshot:makeAreaScreenshot');

var tmpDir = _path["default"].join(__dirname, '..', '..', '.tmp');

function storeScreenshot(_x, _x2, _x3, _x4, _x5) {
  return _storeScreenshot.apply(this, arguments);
}

function _storeScreenshot() {
  _storeScreenshot = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(browser, screenDimensions, cropDimensions, base64Screenshot, filePath) {
    var normalizedBase64Screenshot, croppedBase64Screenshot;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _normalizeScreenshot["default"])(browser, screenDimensions, base64Screenshot);

          case 2:
            normalizedBase64Screenshot = _context.sent;
            log('crop screenshot with width: %s, height: %s, offsetX: %s, offsetY: %s', cropDimensions.getWidth(), cropDimensions.getHeight(), cropDimensions.getX(), cropDimensions.getY());
            _context.next = 6;
            return (0, _image.cropImage)(normalizedBase64Screenshot, cropDimensions);

          case 6:
            croppedBase64Screenshot = _context.sent;
            _context.next = 9;
            return (0, _saveBase64Image["default"])(filePath, croppedBase64Screenshot);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _storeScreenshot.apply(this, arguments);
}

function makeAreaScreenshot(_x6, _x7, _x8, _x9, _x10) {
  return _makeAreaScreenshot.apply(this, arguments);
}

function _makeAreaScreenshot() {
  _makeAreaScreenshot = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(browser, startX, startY, endX, endY) {
    var screenDimensions, screenDimension, screenshotStrategy, uuid, dir, cropImages, screenshotPromises, loop, _screenshotStrategy$g, x, y, indexX, indexY, base64Screenshot, cropDimensions, filePath, _ref, _ref2, mergedBase64Screenshot;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            log('requested a screenshot for the following area: %j', {
              startX: startX,
              startY: startY,
              endX: endX,
              endY: endY
            });
            _context4.next = 3;
            return browser.execute(_getScreenDimensions["default"]);

          case 3:
            screenDimensions = _context4.sent;
            log('detected screenDimensions %j', screenDimensions);
            screenDimension = new _ScreenDimension["default"](screenDimensions, browser);
            screenshotStrategy = _ScreenshotStrategyManager["default"].getStrategy(browser, screenDimension);
            screenshotStrategy.setScrollArea(startX, startY, endX, endY);
            uuid = (0, _generateUUID["default"])();
            dir = _path["default"].join(tmpDir, uuid);
            _context4.prev = 10;
            _context4.next = 13;
            return _fsExtra["default"].ensureDir(dir);

          case 13:
            cropImages = [];
            screenshotPromises = [];
            log('set page height to %s px', screenDimension.getDocumentHeight());
            _context4.next = 18;
            return browser.execute(_pageHeight["default"], "".concat(screenDimension.getDocumentHeight(), "px"));

          case 18:
            loop = false;

          case 19:
            _screenshotStrategy$g = screenshotStrategy.getScrollPosition(), x = _screenshotStrategy$g.x, y = _screenshotStrategy$g.y, indexX = _screenshotStrategy$g.indexX, indexY = _screenshotStrategy$g.indexY;
            log('scroll to coordinates x: %s, y: %s for index x: %s, y: %s', x, y, indexX, indexY);
            _context4.next = 23;
            return browser.execute(_virtualScroll["default"], x, y, false);

          case 23:
            _context4.next = 25;
            return browser.pause(100);

          case 25:
            log('take screenshot');
            _context4.next = 28;
            return browser.takeScreenshot();

          case 28:
            base64Screenshot = _context4.sent;
            cropDimensions = screenshotStrategy.getCropDimensions();
            filePath = _path["default"].join(dir, "".concat(indexY, "-").concat(indexX, ".png"));
            screenshotPromises.push(storeScreenshot(browser, screenDimension, cropDimensions, base64Screenshot, filePath));

            if (!Array.isArray(cropImages[indexY])) {
              cropImages[indexY] = [];
            }

            cropImages[indexY][indexX] = filePath;
            loop = screenshotStrategy.hasNextScrollPosition();
            screenshotStrategy.moveToNextScrollPosition();

          case 36:
            if (loop) {
              _context4.next = 19;
              break;
            }

          case 37:
            _context4.next = 39;
            return Promise.all([Promise.resolve().then(
            /*#__PURE__*/
            (0, _asyncToGenerator2["default"])(
            /*#__PURE__*/
            _regenerator["default"].mark(function _callee2() {
              var mergedBase64Screenshot;
              return _regenerator["default"].wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return Promise.all(screenshotPromises);

                    case 2:
                      log('merge images togehter');
                      _context2.next = 5;
                      return (0, _image.mergeImages)(cropImages);

                    case 5:
                      mergedBase64Screenshot = _context2.sent;
                      log('remove temp dir');
                      _context2.next = 9;
                      return _fsExtra["default"].remove(dir);

                    case 9:
                      return _context2.abrupt("return", mergedBase64Screenshot);

                    case 10:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2);
            }))), Promise.resolve().then(
            /*#__PURE__*/
            (0, _asyncToGenerator2["default"])(
            /*#__PURE__*/
            _regenerator["default"].mark(function _callee3() {
              return _regenerator["default"].wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      log('reset page height');
                      _context3.next = 3;
                      return browser.execute(_pageHeight["default"], '');

                    case 3:
                      log('revert scroll to x: %s, y: %s', 0, 0);
                      _context3.next = 6;
                      return browser.execute(_virtualScroll["default"], 0, 0, true);

                    case 6:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3);
            })))]);

          case 39:
            _ref = _context4.sent;
            _ref2 = (0, _slicedToArray2["default"])(_ref, 1);
            mergedBase64Screenshot = _ref2[0];
            return _context4.abrupt("return", mergedBase64Screenshot);

          case 45:
            _context4.prev = 45;
            _context4.t0 = _context4["catch"](10);
            _context4.prev = 47;
            _context4.next = 50;
            return _fsExtra["default"].remove(dir);

          case 50:
            _context4.next = 54;
            break;

          case 52:
            _context4.prev = 52;
            _context4.t1 = _context4["catch"](47);

          case 54:
            throw _context4.t0;

          case 55:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[10, 45], [47, 52]]);
  }));
  return _makeAreaScreenshot.apply(this, arguments);
}