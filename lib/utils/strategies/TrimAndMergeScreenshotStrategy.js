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

// 1px x 3 for retina
var NAV_SHADOW_CONST = 5; // shadow is cast from top nav bar and bottom nav bar

var NAV_SHADOW_CONST_COMBINED = NAV_SHADOW_CONST * 2;
exports.consts = {
  NAV_SHADOW_CONST: NAV_SHADOW_CONST,
  NAV_SHADOW_CONST_COMBINED: NAV_SHADOW_CONST_COMBINED
};

var TrimAndMergeScreenshotStrategy =
/*#__PURE__*/
function (_BaseStrategy) {
  (0, _inherits2["default"])(TrimAndMergeScreenshotStrategy, _BaseStrategy);

  function TrimAndMergeScreenshotStrategy() {
    (0, _classCallCheck2["default"])(this, TrimAndMergeScreenshotStrategy);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(TrimAndMergeScreenshotStrategy).apply(this, arguments));
  }

  (0, _createClass2["default"])(TrimAndMergeScreenshotStrategy, [{
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
      var viewportHeight = this.screenDimensions.getViewportHeight() - NAV_SHADOW_CONST_COMBINED;

      if (this.index.y === 0 && !this.hasNextVerticalScrollPosition()) {
        viewportHeight = this.screenDimensions.getViewportHeight();
      }

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
      var viewPortHeightMinusNavs = viewportHeight - NAV_SHADOW_CONST_COMBINED;
      var wantedHeight = endY - startY - y * viewPortHeightMinusNavs;
      var height = wantedHeight > viewPortHeightMinusNavs ? viewportHeight : wantedHeight;
      var finalHeight, topTrim;

      if (y === 0 && !this.hasNextVerticalScrollPosition()) {
        // First AND Last
        // Do not trim top or bottom
        topTrim = 0;
        finalHeight = height;
      } else if (y === 0) {
        // First BUT NOT Last
        // Do not trim top, but do trim bottom
        topTrim = 0;
        finalHeight = height - NAV_SHADOW_CONST;
      } else if (!this.hasNextVerticalScrollPosition()) {
        // Last BUT NOT First
        // Do not trim bottom, but do trim top
        topTrim = NAV_SHADOW_CONST;
        finalHeight = height - NAV_SHADOW_CONST;
      } else {
        // Neither First Nor Last
        // Trim both top and bottom
        topTrim = NAV_SHADOW_CONST;
        finalHeight = height - NAV_SHADOW_CONST_COMBINED;
      }

      return this.createCropDimensions(width, finalHeight, 0, topTrim, true, 0);
    }
  }]);
  return TrimAndMergeScreenshotStrategy;
}(_BaseStrategy2["default"]);

exports["default"] = TrimAndMergeScreenshotStrategy;