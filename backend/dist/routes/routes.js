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
router["delete"]('/:idUser/delete', _controllers.deleteUser);
router.post('/:id/task/create', _controllers.saveTask);
router.get('/:id/tasks', _controllers.getAllTasks);
router["delete"]('/:idUser/task/:idTask/delete', _controllers.deleteTask);
router.put('/:idUser/task/:idTask/update', _controllers.updateTask);
router.get('/:idUser/tasks/:category', _controllers.getTaskByCategory);
var _default = exports["default"] = router;