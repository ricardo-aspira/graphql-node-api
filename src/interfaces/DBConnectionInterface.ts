import * as Sequelize from 'sequelize';
import { ModelsInterface } from "./ModelsInterface";

/**
 * Esta interface representa a nossa conexão com o banco de dados,
 * tendo basicamente a instância do sequelize que tivermos aberta
 * com o banco de dados e também um atributo para cada model que
 * tivermos implementado na aplicação.
 * 
 * Os models são importados da ModelsInterface.
 */
export interface DBConnection extends ModelsInterface {

    /**
     * Instância do sequelize aberta com o banco de dados.
     */
    sequelize: Sequelize.Sequelize;

}