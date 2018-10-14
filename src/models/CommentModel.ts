import * as Sequelize from 'sequelize';

import { BaseModelInterface } from "../interfaces/BaseModelInterface";
import { ModelsInterface } from "../interfaces/ModelsInterface";

/**
 * Define os campos que teremos na nossa tabela no banco de dados,
 * podendo utilizá-los quando tivermos uma instância deste registro.
 */
export interface CommentAttributes {

    /**
     * Todos os campos definidos como opcionais.
     * User e Post são number porque no banco
     * de dados armazena o id destes.
     */
    id?: number;
    comment?: string;
    post?: number;
    user?: number;
    createdAt?: string;
    updatedAt?: string;
}

/**
 * Esta interface vai servir para quando estivermos trabalhando
 * com uma instância/registro retornada do banco de dados.
 * 
 * Quando usarmos o CommentModel e fizermos, por exemplo, um findById,
 * conseguiremos utilizar os métodos de instância desse registro
 * (save, update, entre outros) e também conseguiremos ter acesso
 * aos atributos definidos em CommentAttributes.
 * 
 * Também é possível inserir novos registros através de uma nova 
 * instância do model. Consultar a documentação.
 * 
 * A 1a herança é para que possamos usar os métodos de instância do
 * nosso registro (save, update etc). Passar o CommentAttributes serve
 * para que se saiba quais atributos estão disponíveis.
 * 
 * A 2a herança é para que possamos acessar diretamente da instância,
 * os atributos em si.
 */
export interface CommentInstance extends Sequelize.Instance<CommentAttributes>, CommentAttributes {}

/**
 * Esta interface serve para trabalharmos com os métodos do model em si.
 * Poderemos utilizar o nosso CommentModel para fazer queries, cadastrar 
 * um novo post, associação entre tabelas etc.
 * 
 * Ao herdar do Model do Sequelize, precisamos dizer qual a instância e
 * seus atributos.
 */
export interface CommentModel extends BaseModelInterface, Sequelize.Model<CommentInstance, CommentAttributes> {}

/**
 * Precisamos agora exportar uma instância definida desse model.
 * Exportaremos uma função que será chamada pelo import do Sequelize
 * para ele definir este método, criar a tabela no banco de dados etc.
 * 
 * sequelize - representa a instância do sequelize aberta com o BD
 * DataTypes - tipos de dados que podemos usar para definir os campos
 *             da nossa tabela
 * return PostModel
 */
export default(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): CommentModel => {

    /**
     * 1o param - nome do model
     * 2o param - atributos que queremos configurar e a fim de serem inseridos 
     * na tabela no banco de dados.
     * No campo atributos, não definimos os campos criados automaticamente
     * pelo sequelize e nem o campo autor.
     * 3o param - opções de definição do model (nome da tabela, hooks etc)
     *            hooks são conhecidos como life cycle events
     */

    const Comment: CommentModel =
        sequelize.define('Comment', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            comment: {
                type: DataTypes.TEXT,
                allowNull: false
            }
        }, {
            tableName: 'comments'
        });

    // Por herdar de BaseModel Interface, temos acesso a este método
    Comment.associate = (models: ModelsInterface): void => {

        Comment.belongsTo(models.Post, {
            foreignKey: {
                allowNull: false,
                field: 'post',
                name: 'post'
            }
        });

        Comment.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                field: 'user',
                name: 'user'
            }
        });
        
    }


    return Comment;
};