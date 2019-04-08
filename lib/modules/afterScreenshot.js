"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = afterScreenshot;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _debug = _interopRequireDefault(require("debug"));

var _scrollbars = _interopRequireDefault(require("../scripts/scrollbars"));

var _modifyElements = _interopRequireDefault(require("../scripts/modifyElements"));

var log = (0, _debug["default"])('wdio-screenshot:afterScreenshot');

function afterScreenshot(_x, _x2) {
  return _afterScreenshot.apply(this, arguments);
}

function _afterScreenshot() {
  _afterScreenshot = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(browser, options) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(Array.isArray(options.hide) && options.hide.length)) {
              _context.next = 4;
              break;
            }

            log('show the following elements again: %s', options.hide.join(', '));
            _context.next = 4;
            return browser.selectorExecute(options.hide, _modifyElements["default"], 'opacity', '');

          case 4:
            if (!(Array.isArray(options.remove) && options.remove.length)) {
              _context.next = 8;
              break;
            }

            log('add the following elements again: %s', options.remove.join(', '));
            _context.next = 8;
            return browser.selectorExecute(options.remove, _modifyElements["default"], 'display', '');

          case 8:
            // show scrollbars
            log('show scrollbars again');
            _context.next = 11;
            return browser.execute(_scrollbars["default"], true);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _afterScreenshot.apply(this, arguments);
}