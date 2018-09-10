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
 */
export interface UserInstance {

}