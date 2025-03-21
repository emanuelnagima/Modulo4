// CAMADA DE CONTROLE

// Essa classe será responsável por controlar requisições HTTP para usuários.
// As requisições HTTP são GET, POST, PUT, DELETE que manipulam usuários.

import Usuario from "../modelo/usuario.js";

export default class UsuarioCtrl {

    // POST
    gravar(requisicao, resposta) {
        if (requisicao.method === 'POST' && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const { email, nome, senha, telefone } = dados;

            if (email && nome && senha && telefone) {
                const usuario = new Usuario(email, nome, senha, telefone);
                usuario.gravar().then(() => {
                    resposta.status(201).json({
                        status: true,
                        mensagem: "Usuario gravado com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao gravar no servidor: " + erro
                    });
                });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Todos os campos devem ser informados"
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida"
            });
        }
    }

    // PUT ou PATCH
    alterar(requisicao, resposta) {
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const { email, nome, senha, telefone } = dados;

            if (email && nome && senha && telefone) {
                const usuario = new Usuario(email, nome, senha, telefone);
                usuario.alterar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Usuario alterado com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao alterar usuario: " + erro
                    });
                });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Todos os campos devem ser informados"
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida"
            });
        }
    }

    // DELETE
    excluir(requisicao, resposta) {
        if (requisicao.method === 'DELETE' && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const { email } = dados;

            if (email) {
                const usuario = new Usuario(email);
                usuario.excluir().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Usuário excluído com sucesso"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao excluir o usuário: " + erro
                    });
                });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe o email do usuário para ser excluído!"
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida"
            });
        }
    }

    // GET
    consultar(requisicao, resposta) {
        if (requisicao.method === 'GET') {
            const usuario = new Usuario();
            usuario.consultar().then((listaUsuarios) => {
                resposta.status(200).json({
                    status: true,
                    usuarios: listaUsuarios
                });
            }).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: "Erro ao consultar usuários: " + erro
                });
            });
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida"
            });
        }
    }
} 
