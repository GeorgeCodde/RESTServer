const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/usuarios");
const { validarCampos } = require("../middlewares/validar-modules");
const {
  esRoleValido,
  extEmail,
  existeId,
} = require("../helpers/db-validators");

router.get("/", usuariosGet);
router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeId),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPut
);
router.post(
  "/",
  [
    check("nombre", "El Nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe ser de más de 6 letras")
      .isLength({ min: 6 })
      .not()
      .isEmpty(),
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom(extEmail),
    //check("rol", "No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPost
);
router.delete(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeId),
    validarCampos,
  ],
  usuariosDelete
);
router.patch("/", usuariosPatch);

module.exports = router;
