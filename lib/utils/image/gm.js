"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cropImage = cropImage;
exports.scaleImage = scaleImage;
exports.mergeImages = mergeImages;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _gm = _interopRequireDefault(require("gm"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _generateUUID = _interopRequireDefault(require("../generateUUID"));

var _CropDimension = _interopRequireDefault(require("../CropDimension"));

var tmpDir = _path["default"].join(__dirname, '../../../.tmp');
/**
 * Crops an image
 * @param  {string} base64Screenshot image to crop
 * @param  {CropDimension} cropDimensions   dimensions
 * @return {string}                  cropped image
 */


function cropImage(_x, _x2) {
  return _cropImage.apply(this, arguments);
}
/**
 * Scales an image down or up
 * @param base64Screenshot  image to scale
 * @param scaleFactor       scale factor, e.g. 0.5 for downscale or 1.5 for upscale
 * @returns {string}        screenshot
 */


function _cropImage() {
  _cropImage = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(base64Screenshot, cropDimensions) {
    var image;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (cropDimensions instanceof _CropDimension["default"]) {
              _context.next = 2;
              break;
            }

            throw new Error('Please provide a valid instance of CropDimension!');

          case 2:
            image = (0, _gm["default"])(Buffer.from(base64Screenshot, 'base64'));

            if (cropDimensions.getRotation() !== 0) {
              image.rotate('white', cropDimensions.getRotation());
            }

            image.gravity(cropDimensions.getGravity());
            image.crop(cropDimensions.getWidth(), cropDimensions.getHeight(), cropDimensions.getX(), cropDimensions.getY());
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              image.toBuffer('PNG', function (err, buffer) {
                if (err) {
                  return reject(err);
                }

                return resolve(buffer.toString('base64'));
              });
            }));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _cropImage.apply(this, arguments);
}

function scaleImage(_x3, _x4) {
  return _scaleImage.apply(this, arguments);
}
/**
 * Merges mulidimensional array of images to a single image:
 * @param  {string[][]} images array of images
 * @return {string}        screenshot
 */


function _scaleImage() {
  _scaleImage = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(base64Screenshot, scaleFactor) {
    var image, percent;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            image = (0, _gm["default"])(Buffer.from(base64Screenshot, 'base64'));
            percent = scaleFactor * 100;
            image.filter('Box'); // to produce equal images as Jimp
            // image.filter('Sinc'); // works also but was slower in tests

            image.resize(percent, percent, '%');
            return _context2.abrupt("return", new Promise(function (resolve, reject) {
              image.toBuffer('PNG', function (err, buffer) {
                if (err) {
                  return reject(err);
                }

                return resolve(buffer.toString('base64'));
              });
            }));

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _scaleImage.apply(this, arguments);
}

function mergeImages(_x5) {
  return _mergeImages.apply(this, arguments);
}

function _mergeImages() {
  _mergeImages = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(images) {
    var uuid, dir, rowImagesPromises, base64Screenshot;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            uuid = (0, _generateUUID["default"])();
            dir = _path["default"].join(tmpDir, uuid);
            _context3.prev = 2;
            _context3.next = 5;
            return _fsExtra["default"].ensureDir(dir);

          case 5:
            // merge all horizintal screens
            rowImagesPromises = images.map(function (colImages, key) {
              var firstImage = colImages.shift();
              var rowImage = (0, _gm["default"])(firstImage);

              if (colImages.length) {
                colImages.push(true);
                rowImage.append.apply(rowImage, colImages);
              }

              return new Promise(function (resolve, reject) {
                var file = _path["default"].join(dir, "".concat(key, ".png"));

                rowImage.write(file, function (err) {
                  if (err) {
                    return reject(err);
                  }

                  return resolve(file);
                });
              });
            }); // merge all vertical screens

            _context3.next = 8;
            return Promise.all(rowImagesPromises).then(function (rowImages) {
              var firstImage = rowImages.shift();
              var mergedImage = (0, _gm["default"])(firstImage);

              if (rowImages.length) {
                mergedImage.append.apply(mergedImage, rowImages);
              }

              return new Promise(function (resolve, reject) {
                mergedImage.toBuffer('PNG', function (err, buffer) {
                  if (err) {
                    return reject(err);
                  }

                  return resolve(buffer.toString('base64'));
                });
              });
            });

          case 8:
            base64Screenshot = _context3.sent;
            _context3.next = 11;
            return _fsExtra["default"].remove(dir);

          case 11:
            return _context3.abrupt("return", base64Screenshot);

          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](2);
            _context3.prev = 16;
            _context3.next = 19;
            return _fsExtra["default"].remove(dir);

          case 19:
            _context3.next = 23;
            break;

          case 21:
            _context3.prev = 21;
            _context3.t1 = _context3["catch"](16);

          case 23:
            throw _context3.t0;

          case 24:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 14], [16, 21]]);
  }));
  return _mergeImages.apply(this, arguments);
}