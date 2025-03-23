import UsuarioDB from "../database/usuarioDB.js";

export default class Usuario {
    #nome;
    #email;
    #senha;
    #telefone;
    
    constructor(nome, email, senha, telefone) {
        this.#nome = nome;
        this.#email = email;
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
    
    set nome(novoNome) {
        this.#nome = novoNome;
    }

    set email(novoEmail) {
        this.#email = novoEmail;
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
            nome: this.#nome,
            email: this.#email,
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
