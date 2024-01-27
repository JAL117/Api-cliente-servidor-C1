const express = require("express");
const router = express.Router();
const Tareas = require("../model/Tareas.model");
const cors = require("cors");
router.use(cors());
const clients = [];

router.get("/", async (req, res) => {
  try {
    const tarea = await Tareas.findAll();
    res.send(tarea);
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error" });
  }
});

router.get("/buscar/:id_usuario", async (req, res) => {
  try {
    const id_usuario = req.params.id_usuario;

    const tareasU = await Tareas.findAll({
      where: { id_usuario: id_usuario },
    });

    res.send(tareasU);
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error" });
  }
});

router.put("/editar-fecha/:Fecha/:Id", async (req, res) => {
  const id = req.params.Id;
  const nuevaFecha = req.params.Fecha;
  try {
    await Tareas.update(
      { Fecha: nuevaFecha },
      { where: { id: id } }
    );
    res.send("Fecha de tarea modificada correctamente");
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error" });
  }
});

router.post("/add", async (req, res) => {
  const { id_usuario, Titulo, Fecha, Grado, Contenido } = req.body;
  try {
    await Tareas.sync();
    const tarea = await Tareas.create({
      id_usuario: id_usuario,
      Titulo: Titulo,
      Fecha: Fecha,
      Grado: Grado,
      Contenido: Contenido,
    });

    // Notificar a los clientes sobre la creación de una nueva tarea
    clients.forEach((client) => {
      client.json({ success: true, message: "Nueva tarea creada", tarea });
    });

    res.json([]);
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error" });
    console.log(error);
  }
});

router.delete("/eliminar/:id_usuario", async (req, res) => {
  try {
    const id_usuario = req.params.id_usuario;
    const id_tarea = req.body.id;

    await Tareas.destroy({
      where: {
        id_usuario: id_usuario,
        id: id_tarea,
      },
    });

    // Notificar a los clientes sobre la eliminación de la tarea
    clients.forEach((client) => {
      client.json({ success: true, message: `Tarea ${id_tarea} eliminada` });
    });

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error" });
  }
});

router.get("/short-polling/:id_usuario", async (req, res) => {
  try {
    const id_usuario = req.params.id_usuario;

    const tareasPendientes = await Tareas.findAll({
      where: { id_usuario: id_usuario },
    });

    res.json(tareasPendientes);
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error" });
  }
});

module.exports = router;
