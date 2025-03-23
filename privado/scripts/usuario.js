const cadastroForm = document.getElementById("cadastroForm");
let acao = "cadastrar"; // Ação do formulário, começando com cadastrar

function manipularEnvio(evento) {
    if (!cadastroForm.checkValidity()) {
        cadastroForm.classList.add("was-validated");
    } else {
        // Verificar qual ação a variável 'acao' está indicando
        if (acao == "cadastrar") {
            adicionarUsuario();
        } else if (acao == "atualizar") {
            atualizarUsuario();
        } else if (acao == "excluir") {
            excluirUsuario();
        }
        cadastroForm.reset(); // limpar formulário
        mostrarTabelaUsuario(); // Atualiza a tabela após qualquer ação
    }

    evento.preventDefault();
    evento.stopPropagation();
}

function pegarDadosUsuario() {
    return {
        "nome": document.getElementById("nome").value,
        "email": document.getElementById("email").value,
        "senha": document.getElementById("senha").value,
        "telefone": document.getElementById("telefone").value
    };
}

function adicionarUsuario() {
    const dadosUsuario = pegarDadosUsuario();

    fetch("http://localhost:4200/usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosUsuario)
    })
    .then((resposta) => resposta.json())
    .then((dadosRecebidos) => {
        mostrarMensagem(dadosRecebidos.mensagem, "success");
    })
    .catch((erro) => {
        mostrarMensagem("Erro: " + erro, "danger");
    });
}

function atualizarUsuario() {
    const dadosUsuario = pegarDadosUsuario();

    fetch(`http://localhost:4200/usuarios/${dadosUsuario.email}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosUsuario)
    })
    .then((resposta) => resposta.json())
    .then((dadosRecebidos) => {
        mostrarMensagem(dadosRecebidos.mensagem, "success");
    })
    .catch((erro) => {
        mostrarMensagem("Erro: " + erro, "danger");
    });
}

function excluirUsuario() {
    const dadosUsuario = pegarDadosUsuario();

    fetch(`http://localhost:4200/usuarios/${dadosUsuario.email}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((resposta) => resposta.json())
    .then((dadosRecebidos) => {
        mostrarMensagem(dadosRecebidos.mensagem, "success");
    })
    .catch((erro) => {
        mostrarMensagem("Erro: " + erro, "danger");
    });
}

function mostrarMensagem(mensagem, tipo = "success") {
    const espacoMensagem = document.getElementById("mensagem");
    espacoMensagem.innerHTML = `<div class="alert alert-${tipo}" role="alert">${mensagem}</div>`;
    setTimeout(() => {
        espacoMensagem.innerHTML = "";
    }, 5000);
}

function mostrarTabelaUsuario() {
    fetch("http://localhost:4200/usuarios", {
        method: "GET"
    })
    .then((resposta) => resposta.json())
    .then((dadosRecebidos) => {
        if (dadosRecebidos.status) {
            const usuarios = dadosRecebidos.usuarios;
            const espacoTabela = document.getElementById("espacoTabela");

            if (usuarios.length > 0) {
                espacoTabela.innerHTML = "";
                const tabela = document.createElement("table");
                tabela.className = "table table-striped table-hover";
                const cabecalho = document.createElement("thead");
                const corpo = document.createElement("tbody");

                cabecalho.innerHTML = `
                    <tr> 
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Senha</th>
                        <th>Telefone</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                `;
                tabela.appendChild(cabecalho);

                for (let i = 0; i < usuarios.length; i++) {
                    const linha = document.createElement("tr");
                    linha.innerHTML = `
                        <td>${usuarios[i].nome}</td>
                        <td>${usuarios[i].email}</td>
                        <td>${usuarios[i].senha}</td>
                        <td>${usuarios[i].telefone}</td>
                        <td>
                            <button class="btn btn-sm btn-warning" onclick="pegarUsuario('${usuarios[i].nome}', '${usuarios[i].email}', '${usuarios[i].senha}', '${usuarios[i].telefone}', 'atualizar')"><i class="bi bi-pencil-square"></i></button>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-danger" onclick="pegarUsuario('${usuarios[i].nome}', '${usuarios[i].email}', '${usuarios[i].senha}', '${usuarios[i].telefone}', 'excluir')"><i class="bi bi-trash-fill"></i></button>
                        </td>
                    `;
                    corpo.appendChild(linha);
                }

                tabela.appendChild(corpo);
                espacoTabela.appendChild(tabela);
            } else {
                mostrarMensagem("Não há usuários cadastrados.", "warning");
            }
        } else {
            mostrarMensagem(dadosRecebidos.mensagem, "danger");
        }
    })
    .catch((erro) => {
        mostrarMensagem("Erro: " + erro, "danger");
    });
}

function pegarUsuario(nome, email, senha, telefone, acao = "atualizar") {
    document.getElementById("nome").value = nome;
    document.getElementById("email").value = email;
    document.getElementById("senha").value = senha;
    document.getElementById("telefone").value = telefone;

    // Atualiza a ação de acordo com o botão pressionado
    if (acao == "atualizar") {
        acao = "atualizar";
        document.getElementById("atualizar").disabled = false;
        document.getElementById("cadastrar").disabled = true;
        document.getElementById("excluir").disabled = true;
    } else if (acao == "excluir") {
        acao = "excluir";
        document.getElementById("atualizar").disabled = true;
        document.getElementById("cadastrar").disabled = true;
        document.getElementById("excluir").disabled = false;
    }
}

// Manipular envio do formulário
cadastroForm.addEventListener("submit", manipularEnvio);

// Carregar a tabela de usuários ao carregar a página
mostrarTabelaUsuario();
