const Role = require("../models/role");
const usuario = require("../models/usuario");

const esRoleValido = async (rol = "") => {
  const existeRole = await Role.findOne({ rol });
  if (!existeRole) {
    throw new Error(`El rol ${rol} no está registrado en la BD `);
  }
};

//Verificar si el correo existe
const extEmail = async (correo) => {
  const existeEmail = await usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`Ese correo ${correo} ya esta registrado`);
  }
};
//Verificar si el ID existe
const existeId = async (id) => {
  const extId = await usuario.findById(id);
  if (!extId) {
    throw new Error(`El Id ${id} no existe`);
  }
};

module.exports = {
  esRoleValido,
  extEmail,
  existeId,
};
