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
  const { grupo, Contenido } = req.body;
  try {
    await Chat.sync();
    const chat = await Chat.create({
      grupo: grupo,
      Contenido: Contenido

    });

  
    res.json(chat);
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error" });
    console.log(error);
  }
});

module.exports = router;
