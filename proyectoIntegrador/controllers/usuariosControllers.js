const db = require("../database/models")

let usuariosControllers = {
    index: (req, res) => {
        res.render("usuarios")

    }
};

module.exports = usuariosControllers;