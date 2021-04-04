let productosControllers ={
        index: (req, res) => {
            res.send(`Lista de productos`);
        },
        busqueda: (req, res) => {
            productos=req.params.productos
            res.send(`Lista de productos por nombre: ${productos}`);
        }
        
    }

module.exports = productosControllers;