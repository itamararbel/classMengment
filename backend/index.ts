import cors from "cors";
import express from "express";
import config from "./config";
import pageNotFound from "./middleWere/pageNotFound";
import sqlInit from "./util/init_sql";
import { catchAll } from './middleWere/catchAll';
import classesController from "./controllers/classes_controller";
import lessonsController from "./controllers/lessonsController";



const server = express();
sqlInit();
server.use(cors());
server.use(express.json())
server.use("/api/classes", classesController );
server.use("/api/lessons", lessonsController );
server.use("*",pageNotFound);
server.use(catchAll)
server.listen(config.port, ()=>{console.log("listening on port"+ config.port)})
