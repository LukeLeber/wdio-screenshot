"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = makeViewportScreenshot;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _debug = _interopRequireDefault(require("debug"));

var _makeAreaScreenshot = _interopRequireDefault(require("./makeAreaScreenshot"));

var _beforeScreenshot = _interopRequireDefault(require("./beforeScreenshot"));

var _afterScreenshot = _interopRequireDefault(require("./afterScreenshot"));

var _scroll = _interopRequireDefault(require("../scripts/scroll"));

var _getScrollPosition = _interopRequireDefault(require("../scripts/getScrollPosition"));

var _getScreenDimensions = _interopRequireDefault(require("../scripts/getScreenDimensions"));

var _ScreenDimension = _interopRequireDefault(require("../utils/ScreenDimension"));

var log = (0, _debug["default"])('wdio-screenshot:makeViewportScreenshot'); // Note: function name must be async to signalize WebdriverIO that this function returns a promise

function makeViewportScreenshot(_x) {
  return _makeViewportScreenshot.apply(this, arguments);
}

function _makeViewportScreenshot() {
  _makeViewportScreenshot = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(browser) {
    var options,
        _ref,
        _ref2,
        startX,
        startY,
        screenDimensions,
        screenDimension,
        base64Image,
        _args = arguments;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            log('start viewport screenshot'); // get current scroll position

            _context.next = 4;
            return browser.execute(_getScrollPosition["default"]);

          case 4:
            _ref = _context.sent;
            _ref2 = (0, _slicedToArray2["default"])(_ref, 2);
            startX = _ref2[0];
            startY = _ref2[1];
            _context.next = 10;
            return (0, _beforeScreenshot["default"])(browser, options);

          case 10:
            _context.next = 12;
            return browser.execute(_getScreenDimensions["default"]);

          case 12:
            screenDimensions = _context.sent;
            screenDimension = new _ScreenDimension["default"](screenDimensions, browser); // make screenshot of area

            _context.next = 16;
            return (0, _makeAreaScreenshot["default"])(browser, startX, startY, screenDimension.getViewportWidth(), screenDimension.getViewportHeight());

          case 16:
            base64Image = _context.sent;
            _context.next = 19;
            return (0, _afterScreenshot["default"])(browser, options);

          case 19:
            _context.next = 21;
            return browser.execute(_scroll["default"], startX, startY);

          case 21:
            log('end viewport screenshot');
            return _context.abrupt("return", base64Image);

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _makeViewportScreenshot.apply(this, arguments);
}