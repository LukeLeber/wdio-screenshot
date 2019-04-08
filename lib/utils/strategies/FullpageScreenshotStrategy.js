"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _BaseStrategy2 = _interopRequireDefault(require("./BaseStrategy"));

var FullpageScreenshotStrategy =
/*#__PURE__*/
function (_BaseStrategy) {
  (0, _inherits2["default"])(FullpageScreenshotStrategy, _BaseStrategy);

  function FullpageScreenshotStrategy() {
    (0, _classCallCheck2["default"])(this, FullpageScreenshotStrategy);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(FullpageScreenshotStrategy).apply(this, arguments));
  }

  (0, _createClass2["default"])(FullpageScreenshotStrategy, [{
    key: "hasNextHorizontalScrollPosition",
    value: function hasNextHorizontalScrollPosition() {
      return false;
    }
  }, {
    key: "hasNextVerticalScrollPosition",
    value: function hasNextVerticalScrollPosition() {
      return false;
    }
  }, {
    key: "getScrollPosition",
    value: function getScrollPosition() {
      return {
        x: this.area.startX,
        y: this.area.startY,
        indexX: this.index.x,
        indexY: this.index.y
      };
    }
  }, {
    key: "getCropDimensions",
    value: function getCropDimensions() {
      var _this$area = this.area,
          startX = _this$area.startX,
          startY = _this$area.startY,
          endX = _this$area.endX,
          endY = _this$area.endY;
      var width = endX - startX;
      var height = endY - startY;
      return this.createCropDimensions(width, height, 0, 0, true, 0);
    }
  }]);
  return FullpageScreenshotStrategy;
}(_BaseStrategy2["default"]);

exports["default"] = FullpageScreenshotStrategy;