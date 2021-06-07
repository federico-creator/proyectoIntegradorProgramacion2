module.exports = (sequelize, dataTypes) => {

    let alias = "Usuario";
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        nombre: {
            type: dataTypes.STRING,
        },
        apellido: {
            type: dataTypes.STRING,
        },
        documento: {
            type: dataTypes.INTEGER
        },
        fecha_de_nacimiento: {
            type: dataTypes.DATEONLY,
        },
        password: {
            type: dataTypes.STRING,
            unique: true
        },
        mail: {
            type: dataTypes.STRING,
            unique: true
        },
        created_at: {
            type: dataTypes.DATEONLY,
            allowNull: true
        },
        updated_at: {
            type: dataTypes.DATEONLY,
            allowNull: true
        },
    };
    let config = {
        table: "usuarios",
        timestamps: true,
        underscored: true,
    };

    const Usuario = sequelize.define(alias, cols, config)
    Usuario.associate = function (models) {
        Usuario.hasMany(models.Producto, {
            as: "productos",
            foreignKey: "usuarios_id"

        });
        Usuario.hasMany(models.Comentario, {
            as: "comentarios",
            foreignKey: "usuarios_id"

        });
    }

    return Usuario
}