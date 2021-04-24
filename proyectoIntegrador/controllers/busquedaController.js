let autos= require("../data/autos")
let productosControllers ={
    index: (req, res) => {
        var search = req.query.search
        let resultados= []
        resultados.push(search)
        for(let i=0;i<autos.lista.length;i+=1){
            if(autos.lista[i].modelo==search){
                resultados.push(autos.lista[i])
            }
            else if(autos.lista[i].marca==search){
                resultados.push(autos.lista[i])
            }
            else if(autos.lista[i].año==search){
                resultados.push(autos.lista[i])
            }
            else if(autos.lista[i].color==search){
                resultados.push(autos.lista[i])
            }
        }      
        res.render("busqueda", {"search": resultados});
    },
    
}

module.exports = productosControllers;