const {Router} = require('express');
const route = Router();

route.get('/user', (req, res) => res.send('Bienvenido a mi servidor'));

module.exports = route;