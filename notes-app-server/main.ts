import express from "npm:express";
import cors from "npm:cors";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/notes", async (req, res) => {
  const notes = await prisma.note.findMany();
  res.json(notes);
});

app.post("/api/notes", async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res
      .status(400)
      .send("Title and content fields are desired.");
  }
  try {
    const note = await prisma.note.create({
      data: { title, content },
    });
    res.json(note);
  } catch (error) {
    return res
      .status(500)
      .send("Oops something went wrong! error:", error);
  }
});
app.put("/api/notes/:id", async (req, res) => {
  const { title, content } = req.body;
  const id = parseInt(req.params.id);

  if (!id || isNaN(id)) {
    return res
      .status(400)
      .send("id need content a number and is required");
  }
  try {
    const updatedNote = await prisma.note.update({
      where: { id },
      data: { title, content },
    });
    res.json(updatedNote);
  } catch (error) {
    return res
      .status(500)
      .send("Oops something went wrong: ", error);
  }
});
app.delete("/api/notes/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (!id || isNaN(id)) {
    return res
      .status(500)
      .send("id need content a number and is required");
  }

  try {
    const deleteNote = await prisma.note.delete({
      where: { id },
    });
    res.json(deleteNote);
  } catch (error) {
    return res
      .status(500)
      .send("Oops something went wrong: ", error);
  }
});

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
