import express from "express";
import routes from "./src/routes.js";
import cors from 'cors'

const app = express();
const port = 3000;

app.use(cors())
app.use(routes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
