const db = require('../connection');

module.exports = {
    async findAll(req, res) {
        try {
            let response = await db.query('SELECT * FROM Departamento');
            res.json(response);
        } catch (error) {
            console.log(error);
        }
    }
}