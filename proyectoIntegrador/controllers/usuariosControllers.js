const db = require("../database/models")
const op = db.Sequelize.Op;

let usuariosControllers = {
    index: (req, res) => {
        res.render("usuarios")
    }
};

module.exports = usuariosControllers;