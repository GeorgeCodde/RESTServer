const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };
  const [usuarios, total] = await Promise.all([
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
    Usuario.countDocuments(query),
  ]);

  const params = res.json({
    total,
    usuarios,
  });
};
const usuariosPost = async (req, res) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  // //Verificar si el correo existe
  // const existeEmail = await Usuario.findOne({ correo });
  // if (existeEmail) {
  //   return res.status(400).json({
  //     msg: "Ese correo ya esta registrado",
  //   });
  // }

  //Encriptar password
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);
  //Guardar en la DB
  await usuario.save();
  res.json({
    usuario,
  });
};
const usuariosPut = async (req, res) => {
  const { id } = req.params;
  const { _id, password, correo, google, ...resto } = req.body;

  //TODO : Validar contra la base de datos
  if (password) {
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }
  const usuario = await Usuario.findByIdAndUpdate(id, resto);
  res.json({
    msg: "Put api - Controller",
    usuario,
  });
};
const usuariosDelete = async (req, res) => {
  const { id } = req.params;
  //BORRADO FISICAMENTE DEL REGISTRO
  //const usuario = await Usuario.findByIdAndDelete(id);
  //Borrado cambiendo el estado de la bnadera
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
  res.json({
    usuario,
  });
};
const usuariosPatch = (req, res) => {
  res.json({
    ok: true,
    msg: "patch api - Controller",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPatch,
};
