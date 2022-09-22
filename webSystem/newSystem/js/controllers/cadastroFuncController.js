// async function para o cadastro do funcionario.
const db = require('../connection');

module.exports = {
    async insert(req, res) {
        //let funcionario = new funcionario()
        //funcionario.NM_Nome;

        let data = {
            "NM_Nome": req.body.nomeFuncionario,
            "NR_CPF": req.body.cpfFuncionario,
            "NR_Telefone": req.body.telefoneFuncionario,
            "DT_Nascimento": req.body.dtnascimentoFuncionario,
            "DS_Email": req.body.emailFuncionario,
            "DS_Login": req.body.loginFuncionario,
            "NR_Senha": req.body.senhaFuncionario,
            "ID_Departamento": req.body.departamentoFuncionario,
            "ID_Cargo": req.body.cargoFuncionario
        }

        let dataEndereco = {
            "DS_Logradouro": req.body.logradouroFuncionario,
            "DS_Numero": req.body.numeroFuncionario,
            "DS_Complemento": req.body.complementoFuncionario,
            "DS_CEP": req.body.cepFuncionario,
            "DS_Bairro": req.body.bairroFuncionario,
            "DS_Cidade": req.body.cidadeFuncionario,
            "DS_UF": req.body.ufFuncionario
        }

        try {
            let response = await db.query("Insert Into Funcionario Set ?", [data]);
            res.json(response);

            let response2 = await db.query("Insert Into FuncionarioEndereco Set ?", [dataEndereco]);
            res.json(response2);
        } catch (ex) {
            console.log(ex.message);
        }
    }
}