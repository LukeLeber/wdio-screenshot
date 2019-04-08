"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = async;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _isString2 = _interopRequireDefault(require("lodash/isString"));

var _makeElementScreenshot = _interopRequireDefault(require("../modules/makeElementScreenshot"));

var _saveBase64Image = _interopRequireDefault(require("../utils/saveBase64Image"));

/**
 * @alias browser.saveElementScreenshot
 * @param {string=} fileName
 * @param {string} elementSelector
 * @param {Object=} options
 */
// Note: function name must be async to signalize WebdriverIO that this function returns a promise
function async(_x, _x2, _x3) {
  return _async.apply(this, arguments);
}

function _async() {
  _async = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(fileName, elementSelector, options) {
    var base64Image;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (((0, _isString2["default"])(fileName) || (0, _isArray2["default"])(fileName)) && (0, _isPlainObject2["default"])(elementSelector) && (0, _isUndefined2["default"])(options)) {
              options = elementSelector;
              elementSelector = fileName;
              fileName = undefined;
            } else if (((0, _isString2["default"])(fileName) || (0, _isArray2["default"])(fileName)) && (0, _isUndefined2["default"])(elementSelector)) {
              elementSelector = fileName;
              fileName = undefined;
            }

            if ((0, _isString2["default"])(elementSelector) || (0, _isArray2["default"])(elementSelector)) {
              _context.next = 3;
              break;
            }

            throw new Error('Please pass a valid selector value to parameter elementSelector');

          case 3:
            _context.next = 5;
            return (0, _makeElementScreenshot["default"])(this, elementSelector, options);

          case 5:
            base64Image = _context.sent;

            if (!(typeof fileName !== 'undefined')) {
              _context.next = 9;
              break;
            }

            _context.next = 9;
            return (0, _saveBase64Image["default"])(fileName, base64Image);

          case 9:
            return _context.abrupt("return", base64Image);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _async.apply(this, arguments);
}