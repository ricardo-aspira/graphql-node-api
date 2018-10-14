import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';

import { DBConnection } from "../interfaces/DBConnectionInterface";

const basename: string = path.basename(module.filename);
const env: string = process.env.NODE_ENV || 'development';
//Com require pegará o arquivo e seu conteúdo
//Pegando apenas do ambiente que queremos trabalhar
let config = require(path.resolve(`${__dirname}./../config/config.json`))[env];

let db = null;
if (!db) {
    db = {}

    // Atribuindo a config a nova configuração, mais o merge das anteriores
    const operatorAliases = false;
    config = Object.assign({operatorAliases}, config);
    
    /* 
     * Preparando a instância do sequelize para trabalhar
     * com o nosso banco de dados.
     * 
     * No último atributo passamos config apenas.
     * Ele usará então apenas os atributos que tem
     * necessidade tratando estes como options.
     */
    const sequelize: Sequelize.Sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    ); 

    /* Lendo os models que possuímos.
     * readdirSync retorna um array contendo o nome
     * dos arquivos pertencentes ao caminho informado,
     * neste caso, o corrente.
     * Precisamos ignorar o arquivo index.ts.
     */
    fs.readdirSync(__dirname)
        .filter((file: string) => {
            /* Filtrar o basename (index.ts não vai pra lista).
             * Filtrar arquivos que começam com ponto (.).
             * Filtrar arquivos que tem .js apenas
             */
            return (file.indexOf('.') !== 0) &&
                    (file != basename) &&
                    (file.slice(-3) === '.js');

        })
        .forEach((file: string) => {
            //model importado
            const model = sequelize.import(path.join(__dirname, file));
            //disponibilizando para acesso posterior
            db[model['name']] = model;
        });

    /* Precisamos percorrer as chaves de db para realizarmos
     * as associações de cada model.
     * 
     * Object.keys retorna um array de strings, contendo
     * as chaves que possuímos no objeto db.     * 
     */
    Object.keys(db).forEach((modelName: string) => {
        /* Se o modelo tem a função associate,
         * associar ao db. Neste momento, só lê
         * o que precisa, mesmo tendo sido passado
         * mais coisas.
         */
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });

    // Servirá para sincronizarmos o sequelize com o mysql
    db['sequelize'] = sequelize;

}

/* Faço o cast para DBConnection pois ela possui herança
 * com ModelsInterface, poossuindo consequentemente,
 * todos os modelos definidos e uma instância do sequelize.
 */
export default <DBConnection>db;
