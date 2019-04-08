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

var _jimp = _interopRequireDefault(require("jimp"));

var _CropDimension = _interopRequireDefault(require("../CropDimension"));

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
    var image, height, x, y, diffHeight;
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
            _context.next = 4;
            return _jimp["default"].read(Buffer.from(base64Screenshot, 'base64'));

          case 4:
            image = _context.sent;

            if (cropDimensions.getRotation() !== 0) {
              image.rotate(cropDimensions.getRotation());
            }

            height = image.bitmap.height;
            x = cropDimensions.getX();
            y = cropDimensions.getY();

            if (cropDimensions.getGravity() === 'SouthWest') {
              diffHeight = height - y - cropDimensions.getHeight();
              y = diffHeight;
            } // image.gravity(cropDimensions.getGravity());


            image.crop(x, y, cropDimensions.getWidth(), cropDimensions.getHeight());
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              image.getBuffer(_jimp["default"].MIME_PNG, function (err, buffer) {
                if (err) {
                  return reject(err);
                }

                return resolve(buffer.toString('base64'));
              });
            }));

          case 12:
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
    var image;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _jimp["default"].read(Buffer.from(base64Screenshot, 'base64'));

          case 2:
            image = _context2.sent;
            image.scale(scaleFactor);
            return _context2.abrupt("return", new Promise(function (resolve, reject) {
              image.getBuffer(_jimp["default"].MIME_PNG, function (err, buffer) {
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
  _regenerator["default"].mark(function _callee5(images) {
    var imageWidth, imageHeight, rowImagePromises, rowImages, image, y, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, rowImage, base64Screenshot;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            imageWidth = 0;
            imageHeight = 0; // merge horizontal

            rowImagePromises = images.map(
            /*#__PURE__*/
            function () {
              var _ref = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee4(row) {
                var width, height, colImagesPromises, colImages, image, x, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, colImage;

                return _regenerator["default"].wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        width = 0;
                        height = 0;
                        colImagesPromises = row.map(
                        /*#__PURE__*/
                        function () {
                          var _ref2 = (0, _asyncToGenerator2["default"])(
                          /*#__PURE__*/
                          _regenerator["default"].mark(function _callee3(colImage) {
                            var image;
                            return _regenerator["default"].wrap(function _callee3$(_context3) {
                              while (1) {
                                switch (_context3.prev = _context3.next) {
                                  case 0:
                                    _context3.next = 2;
                                    return _jimp["default"].read(colImage);

                                  case 2:
                                    image = _context3.sent;
                                    width += image.bitmap.width;
                                    height = image.bitmap.height;
                                    return _context3.abrupt("return", image);

                                  case 6:
                                  case "end":
                                    return _context3.stop();
                                }
                              }
                            }, _callee3);
                          }));

                          return function (_x7) {
                            return _ref2.apply(this, arguments);
                          };
                        }());
                        _context4.next = 5;
                        return Promise.all(colImagesPromises);

                      case 5:
                        colImages = _context4.sent;
                        _context4.next = 8;
                        return new _jimp["default"](width, height);

                      case 8:
                        image = _context4.sent;
                        x = 0;
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context4.prev = 13;

                        for (_iterator = colImages[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                          colImage = _step.value;
                          image.blit(colImage, x, 0);
                          x += colImage.bitmap.width;
                        }

                        _context4.next = 21;
                        break;

                      case 17:
                        _context4.prev = 17;
                        _context4.t0 = _context4["catch"](13);
                        _didIteratorError = true;
                        _iteratorError = _context4.t0;

                      case 21:
                        _context4.prev = 21;
                        _context4.prev = 22;

                        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                          _iterator["return"]();
                        }

                      case 24:
                        _context4.prev = 24;

                        if (!_didIteratorError) {
                          _context4.next = 27;
                          break;
                        }

                        throw _iteratorError;

                      case 27:
                        return _context4.finish(24);

                      case 28:
                        return _context4.finish(21);

                      case 29:
                        imageWidth = image.bitmap.width;
                        imageHeight += image.bitmap.height;
                        return _context4.abrupt("return", image);

                      case 32:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4, null, [[13, 17, 21, 29], [22,, 24, 28]]);
              }));

              return function (_x6) {
                return _ref.apply(this, arguments);
              };
            }());
            _context5.next = 5;
            return Promise.all(rowImagePromises);

          case 5:
            rowImages = _context5.sent;
            _context5.next = 8;
            return new _jimp["default"](imageWidth, imageHeight);

          case 8:
            image = _context5.sent;
            y = 0;
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context5.prev = 13;

            for (_iterator2 = rowImages[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              rowImage = _step2.value;
              image.blit(rowImage, 0, y);
              y += rowImage.bitmap.height;
            } // finally get screenshot


            _context5.next = 21;
            break;

          case 17:
            _context5.prev = 17;
            _context5.t0 = _context5["catch"](13);
            _didIteratorError2 = true;
            _iteratorError2 = _context5.t0;

          case 21:
            _context5.prev = 21;
            _context5.prev = 22;

            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }

          case 24:
            _context5.prev = 24;

            if (!_didIteratorError2) {
              _context5.next = 27;
              break;
            }

            throw _iteratorError2;

          case 27:
            return _context5.finish(24);

          case 28:
            return _context5.finish(21);

          case 29:
            _context5.next = 31;
            return new Promise(function (resolve, reject) {
              image.getBuffer(_jimp["default"].MIME_PNG, function (err, buffer) {
                if (err) {
                  return reject(err);
                }

                return resolve(buffer.toString('base64'));
              });
            });

          case 31:
            base64Screenshot = _context5.sent;
            return _context5.abrupt("return", base64Screenshot);

          case 33:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[13, 17, 21, 29], [22,, 24, 28]]);
  }));
  return _mergeImages.apply(this, arguments);
}