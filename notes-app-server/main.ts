import express from "npm:express";
import cors from "npm:cors";
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient()
const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/notes", async (req, res) => {

  const notes = await prisma.note.findMany();
  res.json(notes);
});

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});