"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = makeElementScreenshot;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _debug = _interopRequireDefault(require("debug"));

var _makeAreaScreenshot = _interopRequireDefault(require("./makeAreaScreenshot"));

var _beforeScreenshot = _interopRequireDefault(require("./beforeScreenshot"));

var _afterScreenshot = _interopRequireDefault(require("./afterScreenshot"));

var _groupBoundingRect = _interopRequireDefault(require("../utils/groupBoundingRect"));

var _getBoundingRects = _interopRequireDefault(require("../scripts/getBoundingRects"));

var log = (0, _debug["default"])('wdio-screenshot:makeElementScreenshot');

function makeElementScreenshot(_x, _x2) {
  return _makeElementScreenshot.apply(this, arguments);
}

function _makeElementScreenshot() {
  _makeElementScreenshot = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(browser, elementSelector) {
    var options,
        boundingRects,
        boundingRect,
        base64Image,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
            log('start element screenshot'); // hide scrollbars, scroll to start, hide & remove elements, wait for render

            _context.next = 4;
            return (0, _beforeScreenshot["default"])(browser, options);

          case 4:
            _context.next = 6;
            return browser.selectorExecute(elementSelector, _getBoundingRects["default"]);

          case 6:
            boundingRects = _context.sent;
            boundingRect = (0, _groupBoundingRect["default"])(boundingRects); // make screenshot of area

            _context.next = 10;
            return (0, _makeAreaScreenshot["default"])(browser, boundingRect.left, boundingRect.top, boundingRect.right, boundingRect.bottom);

          case 10:
            base64Image = _context.sent;
            _context.next = 13;
            return (0, _afterScreenshot["default"])(browser, options);

          case 13:
            log('end element screenshot');
            return _context.abrupt("return", base64Image);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _makeElementScreenshot.apply(this, arguments);
}