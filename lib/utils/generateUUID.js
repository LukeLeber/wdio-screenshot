"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generateUUID;

var _uuid = _interopRequireDefault(require("uuid"));

function generateUUID() {
  return _uuid["default"].v4();
}