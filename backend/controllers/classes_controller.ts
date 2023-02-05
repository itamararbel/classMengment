import express, { NextFunction, Request, Response } from "express";
import classes_logic from "../logic/classes_logic";

const classesController = express.Router();

classesController.get("/all", async (request:Request, response:Response, next:NextFunction) => {
    response.status(200).json(await classes_logic.getAllClasses())
})


classesController.get("/date/:date", async (request:Request, response:Response, next:NextFunction) => {
    const date = request.params.date
    response.status(200).json(await classes_logic.getClassesByDate(date))
})



classesController.post("/findClass", async (request:Request, response:Response, next:NextFunction) => {
    const newLesson = request.body;
    response.status(200).json(await classes_logic.findClass(newLesson))
})


classesController.post("/new", async (request:Request, response:Response, next:NextFunction) => {
    const newClass = request.body;
    response.status(201).json(await classes_logic.addClass(newClass))
})
classesController.put("/edit", async (request:Request, response:Response, next:NextFunction) => {
    const newClass = request.body;
    response.status(201).json(await classes_logic.editClass(newClass))
})

classesController.delete("/delete/:id", async (request:Request, response:Response, next:NextFunction) => {
    const id = +request.params.id;
    response.status(204).json(await classes_logic.deleteClass(id))
})




export default classesController;
