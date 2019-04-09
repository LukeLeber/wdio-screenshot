"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = beforeScreenshot;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _debug = _interopRequireDefault(require("debug"));

var _scroll = _interopRequireDefault(require("../scripts/scroll"));

var _scrollbars = _interopRequireDefault(require("../scripts/scrollbars"));

var _modifyElements = _interopRequireDefault(require("../scripts/modifyElements"));

var _triggerResize = _interopRequireDefault(require("../scripts/triggerResize"));

var log = (0, _debug["default"])('wdio-screenshot:beforeScreenshot');

function beforeScreenshot(_x, _x2) {
  return _beforeScreenshot.apply(this, arguments);
}

function _beforeScreenshot() {
  _beforeScreenshot = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(browser, options) {
    var x, y, pause;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // hide scrollbars
            log('hide scrollbars');
            _context.next = 3;
            return browser.execute(_scrollbars["default"], false);

          case 3:
            log('trigger resize event to allow js components to resize properly');
            _context.next = 6;
            return browser.execute(_triggerResize["default"]);

          case 6:
            if (!(Array.isArray(options.hide) && options.hide.length)) {
              _context.next = 10;
              break;
            }

            log('hide the following elements: %s', options.hide.join(', '));
            _context.next = 10;
            return browser.execute(options.hide, _modifyElements["default"], 'opacity', '0');

          case 10:
            if (!(Array.isArray(options.remove) && options.remove.length)) {
              _context.next = 14;
              break;
            }

            log('remove the following elements: %s', options.remove.join(', '));
            _context.next = 14;
            return browser.execute(options.remove, _modifyElements["default"], 'display', 'none');

          case 14:
            // scroll back to start
            x = 0;
            y = 0;
            log('scroll back to start x: %s, y: %s', x, y);
            _context.next = 19;
            return browser.execute(_scroll["default"], x, y);

          case 19:
            // wait a bit for browser render
            pause = 200;
            log('wait %s ms for browser render', pause);
            _context.next = 23;
            return browser.pause(pause);

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _beforeScreenshot.apply(this, arguments);
}