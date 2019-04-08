"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _CropDimension = _interopRequireDefault(require("../CropDimension"));

var BaseStrategy =
/*#__PURE__*/
function () {
  function BaseStrategy(screenDimensions) {
    (0, _classCallCheck2["default"])(this, BaseStrategy);
    this.screenDimensions = screenDimensions;
    this.index = {
      x: 0,
      y: 0
    };
    this.setScrollArea(0, 0, this.screenDimensions.getDocumentWidth(), this.screenDimensions.getDocumentHeight());
  }

  (0, _createClass2["default"])(BaseStrategy, [{
    key: "setScrollArea",
    value: function setScrollArea(startX, startY, endX, endY) {
      var documentWidth = this.screenDimensions.getDocumentWidth();
      var documentHeight = this.screenDimensions.getDocumentHeight();

      if (startX >= documentWidth) {
        throw new Error('startX is out of range');
      } else if (startY >= documentHeight) {
        throw new Error('startY is out of range');
      } else if (endX > documentWidth) {
        throw new Error('endX is out of range');
      } else if (endY > documentHeight) {
        throw new Error('endY is out of range');
      }

      this.area = {
        startX: startX,
        startY: startY,
        endX: endX,
        endY: endY
      };
    }
  }, {
    key: "moveToNextScrollPosition",
    value: function moveToNextScrollPosition() {
      if (this.hasNextHorizontalScrollPosition()) {
        this.index.x++;
      } else if (this.hasNextVerticalScrollPosition()) {
        this.index.x = 0;
        this.index.y++;
      }
    }
  }, {
    key: "hasNextScrollPosition",
    value: function hasNextScrollPosition() {
      return this.hasNextHorizontalScrollPosition() || this.hasNextVerticalScrollPosition();
    }
  }, {
    key: "hasNextHorizontalScrollPosition",
    value: function hasNextHorizontalScrollPosition() {
      throw new Error('not implemented, override it');
    }
  }, {
    key: "hasNextVerticalScrollPosition",
    value: function hasNextVerticalScrollPosition() {
      throw new Error('not implemented, override it');
    }
  }, {
    key: "getScrollPosition",
    value: function getScrollPosition() {
      throw new Error('not implemented, override it');
    }
  }, {
    key: "getCropDimensions",
    value: function getCropDimensions() {
      throw new Error('not implemented, override it');
    }
  }, {
    key: "createCropDimensions",
    value: function createCropDimensions(width, height, x, y, top, rotation) {
      var adjustedWidth = this.screenDimensions.applyScaleFactor(width);
      var adjustedHeight = this.screenDimensions.applyScaleFactor(height);
      return new _CropDimension["default"](adjustedWidth, adjustedHeight, x, y, top, rotation);
    }
  }]);
  return BaseStrategy;
}();

exports["default"] = BaseStrategy;