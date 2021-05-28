module.exports= (sequelize, dataTypes)=>{

    let alias = "Comentario";
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        fecha_de_creación:{
            type: dataTypes.DATE,
            allowNull: true
        },
        texto:{
            type: dataTypes.STRING,
            allowNull: true
        },
        usuario_id:{
            type: dataTypes.INTEGER,
            allowNull: true
        },
        productos_id:{
            type: dataTypes.INTEGER,
            allowNull: true
        },
    
    };
    let config={
        table: "productos",
        timestamps: false,
        underscored: true,
    };

    const Comentario = sequelize.define(alias, cols,config)
    return Comentario
}