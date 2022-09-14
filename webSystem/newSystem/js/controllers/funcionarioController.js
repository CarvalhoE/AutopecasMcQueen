const db = require('../connection');

module.exports = {
    async findAll(req, res) {
        try {
            let response = await db.query('SELECT * FROM Funcionario');
            res.json(response);
        }
        catch (error) {
            console.log(error);
        }
    },
    
    async login(req, res) {
        let login = req.params.login;
        let password = req.params.password;

        try {
            let response = await db.query('Select * From Funcionario Where DS_Login = ? and NR_Senha = ?', [login, password]);

            if (response == null)
            res.json(response);
        }
        catch (error) {
            console.log(error);
        }
    },

    // async insert(req, res) {
    //     let data = {
    //         "NM_Produto": req.body.nomeProduto,
    //         // "DS_Descricao": req.body.descricaoProduto,
    //         "VL_Preco": req.body.valorProduto,
    //         "DS_marca": req.body.marcaProduto,
    //         "ID_Categoria": req.body.categoriaProduto
    //     }

    //     try {
    //         let response = await db.query("Insert Into Produto Set ?", [data]);
    //         res.json(response);
    //     } 
    //     catch (ex) {
    //         console.log(ex.message);
    //     }
    // },

    // async update(req, res) {
    //     let id = req.path;
    //     let data = {
    //         "NM_Produto": req.body.nomeProduto,
    //         // "DS_Descricao": req.body.descricaoProduto,
    //         "VL_Preco": req.body.valorProduto,
    //         "DS_Marca": req.body.marcaProduto,
    //         "ID_Categoria": req.body.categoriaProduto
    //     }

    //     try {
    //         let response = await db.query("Update Produto Set ? Where ID_Produto = ?", [data, id]);
    //         res.json(response);
    //     } 
    //     catch (ex) {
    //         console.log(ex.message);
    //     }
    // },

    // async delete(req, res) {
    //     let id = req.path;

    //     try {
    //         let response = await db.query("Delete Produto Where ID_Produto = ?", [id]);
    //         res.send("Produto excluido com sucesso");
    //     } 
    //     catch (ex) {
    //         console.log(ex.message);
    //     }
    // }
}