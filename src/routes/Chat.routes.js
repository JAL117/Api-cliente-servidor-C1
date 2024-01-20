const router1 = require("express").Router();
const Chat = require("../model/Chat.model");


router1.get("/", async (req, res) => {
  try { 
    const chat = await Chat.findAll();
    res.send(chat);
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error" });
  }
});

router1.post("/add", async (req, res) => {
  const { id_chat,Contenido,Emisor,Destinatario} = req.body;
  try { 
    await Chat.sync()
    const chat = await Chat.create({
      id_chat:id_chat,
      Contenido: Contenido,
      Emisor: Emisor,
      Destinatario: Destinatario
    });
    res.json(chat);
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error" });
    console.log(error);
  }
});


module.exports = router1;