const router = require("express").Router();
const Chat = require("../model/Chat.model");

router.get("/", async (req, res) => {
  try {
    const chat = await Chat.findAll();
    res.send(chat);
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error" });
  }
});

router.post("/add", async (req, res) => {
  const { id_usuario, Contenido, Room } = req.body;
  try {
    await Chat.sync();
    const chat = await Chat.create({
      id_usuario: id_usuario,
      Contenido: Contenido,
      Room: Room,
    });

    // Emitir el mensaje a la sala correspondiente
    io.to(Room).emit('chat message', { message: Contenido });

    res.json(chat);
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error" });
    console.log(error);
  }
});

module.exports = router;
