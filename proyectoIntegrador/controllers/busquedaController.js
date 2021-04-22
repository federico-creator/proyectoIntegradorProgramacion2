let productosControllers ={
    index: (req, res) => {
        var search = req.query.search
        res.render("busqueda", {"search": search});
    },
    
}

module.exports = productosControllers;