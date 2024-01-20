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

router.get("/buscar/:id_usuario", async (req, res) => {
  const id_usuario= req.params.id_usuario;
  console.log(id_usuario);
  try { 
    const tarea = await Tareas.findAll({where: {id_usuario:id_usuario}})
    res.send(tarea);
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error" });
  }
});

const Tarea =[Tareas]


router2.post("/add", async (req, res) => {
  const { id_usuario, Titulo, Fecha , Grado , Contenido } = req.body;
  console.log(id_usuario);
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
    responderClientes(tarea)
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error" });
    console.log(error);
  }
});

let responsesClientes = [];

router2.get('/nueva-tarea', (req, res) => {
    
  responsesClientes.push(res);
});

function responderClientes(notificacion) {
  for (res of responsesClientes) {

      res.status(200).json({
          success: true,
          notificacion
      });
  }

  responsesClientes = [];
}

module.exports = router2;