let autos= require("../data/autos")
let productosControllers ={
        index: (req, res) => {
            res.send(`Lista de productos`);
        },
        busqueda: (req, res) => {
            let productos=req.params.productos
            let resultados= []
            for(let i=0;i<autos.lista.length;i+=1){
                if(autos.lista[i].modelo==productos){
                    resultados.push(autos.lista[i])
                }
            }
            res.render("products.ejs", {"products": resultados})
        }
        
    }

module.exports = productosControllers;