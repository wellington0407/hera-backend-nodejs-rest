class Tabelas {
    init(conexao) {

        this.conexao = conexao
        console.log('Tabelas foram chamadas')
        this.criarAtendimento()

    }

    criarAtendimento() {
        const sql = 'CREATE TABLE IF NOT EXISTS AGENDAMENTOS(ID INT NOT NULL AUTO_INCREMENT,MEDICO VARCHAR(50) NOT NULL, CLIENTE VARCHAR(50) NOT NULL, ENFERMEIRA VARCHAR(50) NOT NULL, DOULA VARCHAR(50), STATUS VARCHAR(20), DATA_PROVAVEL DATETIME NOT NULL, DATA_CRIACAO DATETIME NOT NULL, LOCAL VARCHAR(50), PRIMARY KEY(ID))'

        this.conexao.query(sql, (erro) => {
            if (erro) {
                console.log(erro)
            } else {
                console.log('Tabela AGENDAMENTOS criada')
            }
        })

    }
}


module.exports = new Tabelas