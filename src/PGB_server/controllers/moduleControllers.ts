import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../helpers/errorHandlers";
import Modules from "../models/modulesModel";
import modulesModel, { ModulesDocument } from "../models/modulesModel";
import moduleService from "../services/moduleServices";

//POST/creates modules
export const createModule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { modules } = req.body;
    const module = new modulesModel({
      modules,
    });
    const createdModule = await moduleService.createModule(module);
    res.json(createdModule);
  } catch (error) {
    if (error instanceof Error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", error));
    } else {
      next(error);
    }
  }
};

//PUT
export const updateModule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body;
    const moduleId = req.params.lessonId;
    const updatedModule = await moduleService.updateModule(moduleId, update);
    res.json(updatedModule);
  } catch (error) {
    if (error instanceof Error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", error));
    } else {
      next(error);
    }
  }
};

// GET /lessons (gets all existing lesson)
export const findAllModule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await moduleService.findAllModules());
  } catch (error) {
    if (error instanceof Error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", error));
    } else {
      next(error);
    }
  }
};

// GET /lesson/:lessonId //get the existing resource
export const findModuleById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await moduleService.findAllModulesById(req.params.moduleId));
  } catch (error) {
    if (error instanceof Error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", error));
    } else {
      next(error);
    }
  }
};

// DELETE /module/:moduelId //Delete an existing resource
export const deleteModule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await moduleService.deleteModuleById(req.params.moduelId);
    res.status(204).end();
  } catch (error) {
    if (error instanceof Error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", error));
    } else {
      next(error);
    }
  }
};
