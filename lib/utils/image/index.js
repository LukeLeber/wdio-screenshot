"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeImages = exports.scaleImage = exports.cropImage = void 0;

var jimp = _interopRequireWildcard(require("./jimp"));

var gm = _interopRequireWildcard(require("./gm"));

var _which = _interopRequireDefault(require("which"));

var _debug = _interopRequireDefault(require("debug"));

var log = (0, _debug["default"])('wdio-screenshot:image');
var gmInstalled = false;

try {
  gmInstalled = !!_which["default"].sync('gm');
} catch (e) {}

log("Use image processing library: ".concat(gmInstalled ? 'GraphicsMagick' : 'Jimp'));

var _ref = gmInstalled ? gm : jimp,
    cropImage = _ref.cropImage,
    mergeImages = _ref.mergeImages,
    scaleImage = _ref.scaleImage;

exports.scaleImage = scaleImage;
exports.mergeImages = mergeImages;
exports.cropImage = cropImage;