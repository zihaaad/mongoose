import {Request, Response} from "express";
import express from "express";
import cors from "cors";
const app = express();

// parsers
app.use(express.json());
app.use(cors());

const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get("/", getAController);

export default app;
