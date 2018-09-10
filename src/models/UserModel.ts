import * as Sequelize from 'sequelize';

import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

/**
 * Define os campos que teremos na nossa tabela no banco de dados,
 * podendo utilizá-los quando tivermos uma instância deste registro.
 */
export interface UserAttributes {
    
    /**
     * Todos os campos definidos como opcionais.
     */
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    photo?: string;
    createdAt?: string;
    updatedAt?: string;

}

/**
 * Esta interface vai servir para quando estivermos trabalhando
 * com uma instância/registro retornada do banco de dados.
 * 
 * Quando usarmos o UserModel e fizermos, por exemplo, um findById,
 * conseguiremos utilizar os métodos de instância desse registro
 * (save, update, entre outros) e também conseguiremos ter acesso
 * aos atributos definidos em UserAttributes.
 * 
 * Também é possível inserir novos registros através de uma nova 
 * instância do model. Consultar a documentação.
 * 
 * A 1a herança é para que possamos usar os métodos de instância do
 * nosso registro (save, update etc). Passar o UserAttributes serve
 * para que se saiba quais atributos estão disponíveis.
 * 
 * A 2a herança é para que possamos acessar diretamente da instância,
 * os atributos em si.
 */
export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {

    /**
     * Método para verificar se o password informado está de acordo com
     * o password que temos guardado para o usuário.
     */
    isPassword(encodedPassword: string, password: string): boolean;

}

/**
 * Esta interface serve para trabalharmos com os métodos do model em si.
 * Poderemos utilizar o nosso UserModel para fazer queries, cadastrar 
 * um novo usuário, associação entre tabelas etc.
 * 
 * Ao herdar do Model do Sequelize, precisamos dizer qual a instância e
 * seus atributos.
 */
export interface UserModel extends BaseModelInterface, Sequelize.Model<UserInstance, UserAttributes> {}

/**
 * Precisamos agora exportar uma instância definida desse model.
 * Exportaremos uma função que será chamada pelo import do Sequelize
 * para ele definir este método, criar a tabela no banco de dados etc.
 */
export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): UserModel => {

    /**
     * 1o param - nome do model
     * 2o param - atributos que queremos configurar e a fim de serem inseridos 
     * na tabela no banco de dados.
     * 3o param - opções de definição do model (nome da tabela, hooks etc)
     *            hooks são conhecidos como life cycle events
     */
    const User: UserModel = 
        sequelize.define('User', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING(128),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(128),
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING(128),
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            photo: {
                type: DataTypes.BLOB({
                    length: 'long'
                }),
                allowNull: true,
                defaultValue: null
            }
        }, {
            tableName: 'users',
            hooks: {
                /**
                 * 1o param - instância do registro que está sendo criado
                 * 2o param - options que não usaremos mas estamos deixando
                 *            explícita sua existência
                 * 
                 * Vamos com este hook criptografar a senha do usuário.
                 */
                beforeCreate: (user: UserInstance, options: Sequelize.CreateOptions): void => {
                    const salt = genSaltSync();
                    user.password = hashSync(user.password, salt);
                }
            }
        });

    //User.associate = (models: ModelsInterface): void => {}

    User.prototype.isPassword = (encodedPassword: string, password: string): boolean => {
        return compareSync(password, encodedPassword);
    }

    return User;

}