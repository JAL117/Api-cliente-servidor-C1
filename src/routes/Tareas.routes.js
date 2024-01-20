const router2 = require("express").Router();
const Tareas = require("../model/Tareas.model");


router2.get("/", async (req, res) => {
  try { 
    const tarea = await Tareas.findAll();
    res.send(tarea);
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error" });
  }
});




router2.post("/add", async (req, res) => {
  const { id_usuario, Titulo, Fecha , Grado , Contenido } = req.body;
  try { 
    await Tareas.sync()
    const tarea = await Tareas.create({
      id_usuario:id_usuario,
      Titulo: Titulo,
      Fecha:Fecha,
      Grado : Grado ,
      Contenido :Contenido
    });
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error" });
    console.log(error);
  }
});


module.exports = router2;