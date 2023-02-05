import express, { NextFunction, Request, Response } from "express";
import lessons_logic from "../logic/lessons_logic";

const lessonsController = express.Router();

lessonsController.get("/all", async (request:Request, response:Response, next:NextFunction) => {
    response.status(200).json(await lessons_logic.getAllLessons())
})

lessonsController.post("/new", async (request:Request, response:Response, next:NextFunction) => {
    const newLesson = request.body;
    response.status(201).json(await lessons_logic.addLesson(newLesson))
})
lessonsController.put("/edit", async (request:Request, response:Response, next:NextFunction) => {
    const newLesson = request.body;
    response.status(201).json(await lessons_logic.editLesson(newLesson))
})

lessonsController.delete("/delete/:id", async (request:Request, response:Response, next:NextFunction) => {
    const id = +request.params.id;
    response.status(204).json(await lessons_logic.deleteLesson(id))
})

lessonsController.get("/between/:from/:to", async (request:Request, response:Response, next:NextFunction) => {
    const lessonsFrom = request.params.from;
    const lessonsTo = request.params.to;
    response.status(200).json(await lessons_logic.lessonsBetween(lessonsFrom, lessonsTo))
})

lessonsController.post("/postMultipleLessons", async (request:Request, response:Response, next:NextFunction) => {
    const newLessons = request.body;
    response.status(201).json(await lessons_logic.addMultipleLessons(newLessons))
})



export default lessonsController;
