const customExpress = require('./config/customExpress')
const Tabelas = require('./infra/tabelas')
const conexao = require('./infra/conexao')



conexao.connect(erro =>{
    if(erro){
        console.log(erro)
    }
    else{
        
        const app = customExpress()
        Tabelas.init(conexao)
        app.listen(3000, () => console.log('Servidor rodando na porta 3000'))

    }
    
})

