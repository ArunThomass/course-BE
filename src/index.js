import express from "express";

const app = express();

app.use(express.json());

app.use( userRoutes);

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});