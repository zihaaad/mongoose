import {Request, Response} from "express";
import express from "express";
import cors from "cors";
import {StudentRoutes} from "./app/modules/student/student.route";
const app = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/v1/students", StudentRoutes);

const getAController = (req: Request, res: Response) => {
  res.send("Yes ✔ Akhi - Server Active");
};

app.get("/", getAController);

export default app;
