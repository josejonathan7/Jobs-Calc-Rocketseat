const express = require('express')
const server = express()
const routes = require('./routes')

//usando template engine 
server.set('view engine', 'ejs')

//habilitar arquivos estaticos, que não são alterados com frequencia
server.use(express.static("public"))

//rotas
server.use(routes)

server.listen(3000, () => console.log('O servidor esta rodando'))