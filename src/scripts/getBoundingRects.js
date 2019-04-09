"use strict";

import debug from "debug";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getBoundingRect;
const log = debug('wdio-screenshot:makeElementScreenshot');

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
