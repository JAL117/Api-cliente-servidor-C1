const express = require("express");
const router = express.Router();
const Tareas = require("../model/Tareas.model");
const cors = require("cors");
const { Op } = require("sequelize");

router.use(cors());
const clients = [];

// Función para notificar a todos los clientes conectados sobre nuevas tareas
const notifyClients = (data) => {
  clients.forEach((res, index) => {
    if (!res.finished) {
      res.json(data);
    } else {
      // Eliminar el cliente desconectado
      clients.splice(index, 1);
    }
  });
};


router.get("/", async (req, res) => {
  try {
    const tarea = await Tareas.findAll();
    res.send(tarea);
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error" });
  }
});

router.get("/buscar/:grupo", async (req, res) => {
  try {
    const grupo = req.params.grupo;

    const tareasU = await Tareas.findAll({
      where: { grupo: grupo },
    });

    res.send(tareasU);
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error" });
  }
});

router.get("/tareas/long-polling", async (req, res) => {
  try {
    const idUltimaTarea = req.query.idUltimaTarea;

    // Mantener la conexión abierta indefinidamente
    req.socket.setTimeout(0);

    req.on('close', () => {
      // Eliminar el cliente que se ha desconectado
      const index = clients.indexOf(res);
      if (index !== -1) {
        clients.splice(index, 1);
      }
    });

    const nuevasTareas = await Tareas.findAll({
      where: {
        id: {
          [Op.gt]: idUltimaTarea,
        },
      },
    });

    if (nuevasTareas.length > 0) {
      res.json(nuevasTareas);
      notifyClients({ success: true, message: "Nuevas tareas encontradas", nuevasTareas });
    } else {
      clients.push(res); // Agregar la respuesta a la lista de clientes
    }
  } catch (error) {
    console.error("Error en Long Polling:", error);
    res.status(500).json({ error: "Ha ocurrido un error al obtener nuevas tareas" });
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
  const { grupo, Titulo, Fecha, Grado, Contenido } = req.body;
  try {
    await Tareas.sync();
    const tarea = await Tareas.create({
      grupo: grupo,
      Titulo: Titulo,
      Fecha: Fecha,
      Grado: Grado,
      Contenido: Contenido,
    });

    notifyClients({ success: true, message: "Nueva tarea creada", tarea });

    res.json([]);
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error" });
    console.log(error);
  }
});

router.delete("/eliminar/:grupo", async (req, res) => {
  try {
    const grupo = req.params.grupo;
    const id_tarea = req.body.id;

    await Tareas.destroy({
      where: {
        grupo: grupo,
        id: id_tarea,
      },
    });

    // Notificar a todos los clientes sobre la tarea eliminada
    notifyClients({ success: true, message: `Tarea ${id_tarea} eliminada` });

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error" });
  }
});

module.exports = router;
