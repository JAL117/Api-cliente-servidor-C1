const router = require("express").Router();
const Usuario = require("../model/Usuario.model");


router.get("/", async (req, res) => {
  try { 
    const user = await Usuario.findAll();
    res.send(user);
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error" });
  }
});


router.get("/buscar", async (req, res) => {
  const nombreDeUsuario = req.body.nombreDeUsuario;
  try { 
    const user = await Usuario.findOne({where: {nombreDeUsuario: nombreDeUsuario}})
    res.send(user);
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error" });
  }
});


router.post("/add", async (req, res) => {
  const { id_usuario, nombreDeUsuario, contrasena } = req.body;
  try { 
    await Usuario.sync()
    const usuario = await Usuario.create({
      id_usuario:id_usuario,
      nombreDeUsuario: nombreDeUsuario,
      contrasena: contrasena
    });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error" });
    console.log(error);
  }
});

//Actualizar un usuario
router.put("/update/:id_usuario", async (req, res) => {
  const id_usuario = req.params.id_usuario;
  const { nombreDeUsuario, contrasena } = req.body;
  try { 
    const usuario = await Usuario.update({
      nombreDeUsuario: nombreDeUsuario,
      contrasena: contrasena
    }, { where: { id_usuario: id_usuario} });
    res.send("Usuario modificado correctamente");
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error" });
  }
});

//Eliminar un usuario por ID
router.delete("/delete/:id_usuario", async (req, res) => {
  try { 
    const usuario = await Usuario.destroy({ where: { id_usuario: req.params.id_usuario} });
    res.send("Usuario eliminado correctamente");
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error" });
    console.log(error);
  }
});
module.exports = router;