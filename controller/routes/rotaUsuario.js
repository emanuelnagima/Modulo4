import { Router } from "express";
import UsuarioCtrl from "../usuarioCtrl.js";



const rotaUsuario = Router(); //mini aplicação http
const usuCtrl = new UsuarioCtrl();

rotaUsuario.get("/", usuCtrl.consultar);
rotaUsuario.post("/", usuCtrl.gravar);
rotaUsuario.put("/", usuCtrl.alterar);
rotaUsuario.patch("/", usuCtrl.alterar);
rotaUsuario.delete("/",usuCtrl.excluir);

export default rotaUsuario;