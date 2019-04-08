"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getBase64ImageSize;

var _imageSize = _interopRequireDefault(require("image-size"));

function getBase64ImageSize(base64Screenshot) {
  var buffer = Buffer.from(base64Screenshot, 'base64');
  var size = (0, _imageSize["default"])(buffer);
  return size;
}