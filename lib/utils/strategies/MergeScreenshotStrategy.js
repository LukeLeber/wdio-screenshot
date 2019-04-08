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

var MergeScreenshotStrategy =
/*#__PURE__*/
function (_BaseStrategy) {
  (0, _inherits2["default"])(MergeScreenshotStrategy, _BaseStrategy);

  function MergeScreenshotStrategy() {
    (0, _classCallCheck2["default"])(this, MergeScreenshotStrategy);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(MergeScreenshotStrategy).apply(this, arguments));
  }

  (0, _createClass2["default"])(MergeScreenshotStrategy, [{
    key: "hasNextHorizontalScrollPosition",
    value: function hasNextHorizontalScrollPosition() {
      var width = this.area.endX - this.area.startX;
      return width > this.index.x * this.screenDimensions.getViewportWidth() + this.screenDimensions.getViewportWidth();
    }
  }, {
    key: "hasNextVerticalScrollPosition",
    value: function hasNextVerticalScrollPosition() {
      var height = this.area.endY - this.area.startY;
      return height > this.index.y * this.screenDimensions.getViewportHeight() + this.screenDimensions.getViewportHeight();
    }
  }, {
    key: "getScrollPosition",
    value: function getScrollPosition() {
      var viewportWidth = this.screenDimensions.getViewportWidth();
      var viewportHeight = this.screenDimensions.getViewportHeight();
      return {
        x: this.area.startX + this.index.x * viewportWidth,
        y: this.area.startY + this.index.y * viewportHeight,
        indexX: this.index.x,
        indexY: this.index.y
      };
    }
  }, {
    key: "getCropDimensions",
    value: function getCropDimensions() {
      var viewportWidth = this.screenDimensions.getViewportWidth();
      var viewportHeight = this.screenDimensions.getViewportHeight();
      var _this$area = this.area,
          startX = _this$area.startX,
          startY = _this$area.startY,
          endX = _this$area.endX,
          endY = _this$area.endY;
      var _this$index = this.index,
          x = _this$index.x,
          y = _this$index.y;
      var wantedWidth = endX - startX - x * viewportWidth;
      var width = wantedWidth > viewportWidth ? viewportWidth : wantedWidth;
      var wantedHeight = endY - startY - y * viewportHeight;
      var height = wantedHeight > viewportHeight ? viewportHeight : wantedHeight;
      return this.createCropDimensions(width, height, 0, 0, true, 0);
    }
  }]);
  return MergeScreenshotStrategy;
}(_BaseStrategy2["default"]);

exports["default"] = MergeScreenshotStrategy;