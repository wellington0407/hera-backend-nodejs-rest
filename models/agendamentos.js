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
                    res.status(201).json({agendamento})
                }
            })
        }



    }
    lista(res){
        const sql = 'SELECT * FROM agendamentos'

        conexao.query(sql, (erro,resultado)=>{
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultado)
            }
        })

    }
    buscaPorId(id,res){
        const sql = `SELECT * FROM agendamentos WHERE id = ${id}`
        
        conexao.query(sql, (erro,resultados)=>{
            const agendamento = resultados[0]
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultados)
            }
        })
    }
    altera(id, valores, res){
        if(valores.data_provavel){
            valores.data_provavel = moment(valores.data_provavel, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
        const sql = `UPDATE agendamentos SET ? WHERE id = ${id}`

        conexao.query(sql, valores ,(erro,resultados)=>{
            const agendamento = resultados[0]
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json({...valores,id})
            }
        })
    }
    apaga(id,res){
        const sql = `DELETE FROM agendamentos WHERE id = ${id}`
        
        conexao.query(sql, (erro,resultados)=>{
            const agendamento = resultados[0]
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Agendamento