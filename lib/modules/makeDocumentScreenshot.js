"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = makeDocumentScreenshot;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _debug = _interopRequireDefault(require("debug"));

var _makeAreaScreenshot = _interopRequireDefault(require("./makeAreaScreenshot"));

var _beforeScreenshot = _interopRequireDefault(require("./beforeScreenshot"));

var _afterScreenshot = _interopRequireDefault(require("./afterScreenshot"));

var _getScreenDimensions = _interopRequireDefault(require("../scripts/getScreenDimensions"));

var _ScreenDimension = _interopRequireDefault(require("../utils/ScreenDimension"));

var log = (0, _debug["default"])('wdio-screenshot:makeDocumentScreenshot');

function makeDocumentScreenshot(_x) {
  return _makeDocumentScreenshot.apply(this, arguments);
}

function _makeDocumentScreenshot() {
  _makeDocumentScreenshot = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(browser) {
    var options,
        screenDimensions,
        screenDimension,
        base64Image,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            log('start document screenshot'); // hide scrollbars, scroll to start, hide & remove elements, wait for render

            _context.next = 4;
            return (0, _beforeScreenshot["default"])(browser, options);

          case 4:
            _context.next = 6;
            return browser.execute(_getScreenDimensions["default"]);

          case 6:
            screenDimensions = _context.sent;
            screenDimension = new _ScreenDimension["default"](screenDimensions, browser); // make screenshot of area

            _context.next = 10;
            return (0, _makeAreaScreenshot["default"])(browser, 0, 0, screenDimension.getDocumentWidth(), screenDimension.getDocumentHeight());

          case 10:
            base64Image = _context.sent;
            _context.next = 13;
            return (0, _afterScreenshot["default"])(browser, options);

          case 13:
            log('end document screenshot');
            return _context.abrupt("return", base64Image);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _makeDocumentScreenshot.apply(this, arguments);
}