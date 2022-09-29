var db = require('../database');

module.exports = {
    findAll(req, res) {
        db.query('Select * From Departamento', (err, data) => {
            
            console.log(res.json(data));
            // res.json(data);
        });
    },
}