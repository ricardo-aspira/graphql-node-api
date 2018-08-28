import { ModelsInterface } from "./ModelsInterface";

/**
 * Interface para servir de base para cada um dos models da aplicação.
 * Server para criar métodos de classe ou métodos de instância no nosso model sequelize.
 * 
 * Método de classe não depende da instância do model (static).
 * Método de instância trabalha com a instância do model.
 */
export interface BaseModelInterface {

    /**
     * Atributo opcional para criarmos métodos de instância no nosso modelo.
     */
    prototype?;

    /**
     * Método de classe, muito utilizado no sequelize, que é o associate.
     * Serve para associarmos um model com outro.
     * 
     * Através do parâmetro models, conseguiremos acessar todos os models
     * que já tivermos implementado no sequelize, associando um com o outro.
     */
    associate?(models: ModelsInterface): void;
}