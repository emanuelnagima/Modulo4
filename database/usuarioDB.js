import Usuario from "../modelo/usuario.js";
import conectar from "./conexao.js";

export default class UsuarioDB {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `CREATE TABLE IF NOT EXISTS usuario (
                nome VARCHAR(30) NOT NULL PRIMARY KEY,
                email VARCHAR(35) NOT NULL,
                senha VARCHAR(10) NOT NULL,    
                telefone DECIMAL(12)
            )`;
            await conexao.execute(sql);
            await conexao.release();
        } catch (erro) {
            console.log("Erro ao iniciar a tabela usuario: " + erro); 
        }
    }

    async gravar(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = `INSERT INTO usuario (nome, email, senha, telefone)
                         VALUES(?, ?, ?, ?)`;
            const parametros = [
                usuario.nome,
                usuario.email,
                usuario.senha,
                usuario.telefone
            ];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async alterar(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = `UPDATE usuario SET nome = ?, senha = ?, telefone = ? WHERE email = ?`;
            const parametros = [
                usuario.nome,
                usuario.senha,
                usuario.telefone,
                usuario.email
            ];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async excluir(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = `DELETE FROM usuario WHERE email = ?`;
            const parametros = [usuario.email];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async consultar() {
        const conexao = await conectar();
        const sql = `SELECT * FROM usuario ORDER BY nome`;
        const [registros, campos] = await conexao.execute(sql);
        await conexao.release();
        let listaUsuarios = [];
        for (const registro of registros) {
            const usuario = new Usuario(
                registro.nome,
                registro.email,
                registro.senha,
                registro.telefone
            );
            listaUsuarios.push(usuario);
        }
        return listaUsuarios;
    }
}
