import cors from "cors";
import express from "express";
import morgan from "morgan";

import { defaultErrorHandler } from "./errors";
import artistRouter from "./controllers/artists";
import albumRouter from "./controllers/albums";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/artists", artistRouter);
app.use("/albums", albumRouter);

app.use(defaultErrorHandler);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Music Catalog API listening on http://localhost:${PORT}`);
});