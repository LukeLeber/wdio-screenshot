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

var _makeDocumentScreenshot = _interopRequireDefault(require("../modules/makeDocumentScreenshot"));

var _saveBase64Image = _interopRequireDefault(require("../utils/saveBase64Image"));

/**
 * @alias browser.saveDocumentScreenshot
 * @param {string=} fileName
 * @param {Object=} options
 */
// Note: function name must be async to signalize WebdriverIO that this function returns a promise
function async(_x, _x2) {
  return _async.apply(this, arguments);
}

function _async() {
  _async = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(fileName, options) {
    var base64Image;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if ((0, _isPlainObject2["default"])(fileName) && (0, _isUndefined2["default"])(options)) {
              options = fileName;
              fileName = undefined;
            } // make screenshot of area


            _context.next = 3;
            return (0, _makeDocumentScreenshot["default"])(this, options);

          case 3:
            base64Image = _context.sent;

            if (!(typeof fileName !== 'undefined')) {
              _context.next = 7;
              break;
            }

            _context.next = 7;
            return (0, _saveBase64Image["default"])(fileName, base64Image);

          case 7:
            return _context.abrupt("return", base64Image);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _async.apply(this, arguments);
}