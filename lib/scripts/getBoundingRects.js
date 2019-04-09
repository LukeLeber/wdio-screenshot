"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _debug = _interopRequireDefault(require("debug"));

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getBoundingRect;
var log = (0, _debug["default"])('wdio-screenshot:makeElementScreenshot');

function getBoundingRect(elems) {
  log('getBoundingRect');
  return elems.map(function (elem) {
    var boundingRect = elem.getBoundingClientRect();
    return {
      top: boundingRect.top,
      right: boundingRect.right,
      bottom: boundingRect.bottom,
      left: boundingRect.left
    };
  });
}