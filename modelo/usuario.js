import UsuarioDB from "../database/usuarioDB.js";

export default class Usuario {
    #email;
    #nome;
    #senha;
    #telefone;
    
    constructor(email, nome, senha, telefone) {
        this.#email = email;
        this.#nome = nome;
        this.#senha = senha;
        this.#telefone = telefone;
    }

    // Getters
    get nome() {
        return this.#nome;
    }

    get email() {
        return this.#email;
    }

    get senha() {
        return this.#senha;
    }

    get telefone() {
        return this.#telefone;
    }

    // Setters
    set email(novoEmail) {
        this.#email = novoEmail;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

  
    set senha(novaSenha) {
        this.#senha = novaSenha;
    }

    set telefone(novoTelefone) {
        this.#telefone = novoTelefone;
    }

    // Método para converter o objeto em JSON
    toJSON() {
        return {         
            email: this.#email,
            nome: this.#nome,
            senha: this.#senha,
            telefone: this.#telefone
        };
    }

    // Métodos assíncronos com await
    async gravar() {
        const usuDB = new UsuarioDB();
        await usuDB.gravar(this);
    }
    
    async alterar() {
        const usuDB = new UsuarioDB();
        await usuDB.alterar(this);
    }
    

    async excluir() {
        const usuDB = new UsuarioDB();
        await usuDB.excluir(this);
    }

    async consultar() {
        const usuDB = new UsuarioDB();
        return await usuDB.consultar(this);
    }
}
