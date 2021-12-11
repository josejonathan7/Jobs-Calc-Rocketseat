"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
const server = _express2.default.call(void 0, );
var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);
var _path = require('path');

//usando template engine , estamos dizendo para o motor de visualização que estamos trabalhando com ejs
server.set("view engine", "ejs");

//mudar a licalização da pasta views
server.set("views", _path.join.call(void 0, __dirname, "views"));

//habilitar arquivos estaticos, que não são alterados com frequencia
server.use(_express2.default.static("public"));

//usar o req.body
server.use(_express.urlencoded.call(void 0, {extended: true}));

//rotas
server.use(_routes2.default);

server.listen(3000, () => console.log("O servidor esta rodando"));
