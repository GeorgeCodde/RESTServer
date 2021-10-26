const { response, request } = require("express");

const usuariosGet = (req = request, res = response) => {
  const { q, nombre, limit = 1, edad } = req.query;
  const params = res.json({
    ok: true,
    msg: "get api - Controller",
    q,
    nombre,
    limit,
    edad,
  });
};
const usuariosPost = (req, res) => {
  const { nombre, edad } = req.body;
  res.json({
    ok: true,
    msg: "post api - Controller",
    nombre,
    edad,
  });
};
const usuariosPut = (req, res) => {
  const { id } = req.params;
  res.json({
    ok: true,
    msg: "Put api - Controller",
    id,
  });
};
const usuariosDelete = (req, res) => {
  res.json({
    ok: true,
    msg: "delete api - Controller",
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
