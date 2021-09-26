const moment = require('moment')
const conexao = require('../infra/conexao')

class Agendamento {
    adiciona(agendamento, res) {
        const data_criacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data_provavel = moment(agendamento.data_provavel, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const dataEhVAlida = moment(data_provavel).isSameOrAfter(data_criacao)
        const nomeClienteEhValido = agendamento.cliente.length > 4

        const validacoes = [
            {
                nome: 'data_provavel',
                valido: dataEhVAlida,
                mensagem: 'data deve ser maios ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: nomeClienteEhValido,
                mensagem: 'Deve ter no minimo 5 caracteresS'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros) {
            res.status(400).json(erros)
        } else {
            const agendatentoDatado = { ...agendamento, data_criacao, data_provavel }
            const sql = 'INSERT INTO AGENDAMENTOS SET ?'

            conexao.query(sql, agendatentoDatado, (erro, resultados) => {
                if (erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(resultados)
                }
            })
        }



    }
}

module.exports = new Agendamento