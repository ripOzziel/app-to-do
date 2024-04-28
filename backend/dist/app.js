"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _morgan = _interopRequireDefault(require("morgan"));
var _routes = _interopRequireDefault(require("./routes/routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//framework de node

//esto controla el registro de las solicitudes HTTP

var app = (0, _express["default"])(); //instanciar la aplicacion express

app.use((0, _cors["default"])()); //? permitir las solicitudes desde cualquier origen
app.use((0, _morgan["default"])("dev")); //? ver peticiones HTTP por consola
app.use(_express["default"].json()); //? analizar el cuerpo de las solicitados como json
app.use(_routes["default"]); //? montar las rutas definidas
var _default = exports["default"] = app;