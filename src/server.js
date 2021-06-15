const express = require('express')
const server = express()
const routes = require('./routes')

//usando template engine , estamos dizendo para o motor de visualização que estamos trabalhando com ejs
server.set('view engine', 'ejs')

//habilitar arquivos estaticos, que não são alterados com frequencia
server.use(express.static("public"))

//usar o req.body
server.use(express.urlencoded({extended: true}))

//rotas
server.use(routes)

server.listen(3000, () => console.log('O servidor esta rodando'))