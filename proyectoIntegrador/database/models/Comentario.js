module.exports= (sequelize, dataTypes)=>{

    let alias = "Comentario";
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        created_at:{
            type: dataTypes.DATEONLY,
            allowNull: true
        },
        update_at:{
            type: dataTypes.DATEONLY,
            allowNull: true
        },
        texto:{
            type: dataTypes.STRING,
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