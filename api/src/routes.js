const express = require('express');
const Feedback = require('./dao/Feedback');
const routes = express.Router();
const feedback = new Feedback();


// routes.post('/suporte-usuario', (req, res) => {
//     const idConsumidor = req.body.idConsumidor;
//     const token = req.body.token;

//     const Fee = new Feedback();
//     // authUser.buscarConsumidor()
       
// });

routes.get("/feedbacks", feedback.findAll)

routes.post("/feedbacks",feedback.create)



module.exports = routes;