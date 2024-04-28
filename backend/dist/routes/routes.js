"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _controllers = require("../controllers/controllers");
//enrutador que usa express

var router = (0, _express.Router)();
router.post('/register', _controllers.createUser);
router.get('/login', _controllers.getUser);
var _default = exports["default"] = router;