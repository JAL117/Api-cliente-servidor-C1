const express = require("express");
const router2 = express.Router();
const Tareas = require("../model/Tareas.model");

router2.get("/", async (req, res) => {
  try {
    const tarea = await Tareas.findAll();
    res.send(tarea);
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error" });
  }
});

router2.get("/buscar/:id_usuario", async (req, res) => {
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

router2.put("/editar-fecha/:Fecha/:Id", async (req, res) => {
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

router2.post("/add", async (req, res) => {
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
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error" });
    console.log(error);
  }
});

router2.delete("/eliminar/:id_usuario", async (req, res) => {
  try {
    const id_usuario = req.params.id_usuario;
    const id_tarea = req.body.id;

    await Tareas.destroy({
      where: {
        id_usuario: id_usuario,
        id: id_tarea,
      },
    });

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error" });
  }
});

module.exports = router2;