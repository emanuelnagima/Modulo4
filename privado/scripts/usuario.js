import { application, json } from "express";

const cadastroForm = document.getElementById("cadastroForm")
function manipularEnvio(evento){
    if (!cadastroForm.checkValidity()){
        cadastroForm.classList.add("was-validated");

}
else{


}



evento.preventDefault();
evento.stopPropagation();
}

function pegarDadosUsuario(){
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const telefone = document.getElementById("telefone").value;

return{
    "nome":nome,
    "email":email,
    "senha":senha,
    "telefone":telefone

}
}

function adicionarUsuario(){
    const dadosUsuario= pegarDadosUsuario();
  
    fetch("http://localhost:4200/usuarios", {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: json.stringyfy(dadosUsuario)
    })
}

//manipular 
cadastroForm.addEventListener = manipularEnvio; 
