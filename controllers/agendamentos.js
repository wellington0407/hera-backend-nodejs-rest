const Agendamento = require('../models/agendamentos')

module.exports = app => {
    app.get('/agendamentos', (req, res) =>{res.send('Agendamentos GET')})
    app.post('/agendamentos', (req, res) =>{
        const agendamento = req.body 
        Agendamento.adiciona(agendamento, res)})
}