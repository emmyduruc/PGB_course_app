import { ModulesDocument } from "../models/modulesModel";
import Modules from "../models/modulesModel";
import {
  ForbiddenError,
  InternalServerError,
  NotFoundError,
} from "../helpers/errorHandlers";

//POST
const createModule = async (modulesDocument: ModulesDocument) => {
  const createdModule = await modulesDocument.save();
  return createdModule;
};

//PUT to update
const updateModule = async (
  moduleId: string,
  update: Partial<ModulesDocument>
): Promise<ModulesDocument | null> => {
  const foundModule = await Modules.findByIdAndUpdate(moduleId, update, {
    new: true,
  });

  if (!foundModule) {
    throw new NotFoundError(`Module ${moduleId} not found`);
  }

  return foundModule;
};

//GET all module
const findAllModules = async (): Promise<ModulesDocument[]> => {
  return Modules.find();
};

//GET a module byId
const findAllModulesById = async (
  moduleId: string
): Promise<ModulesDocument> => {
  const foundModule = await Modules.findById(moduleId);

  if (!foundModule) {
    throw new NotFoundError(`Module ${moduleId} not found`);
  }

  return foundModule;
};

//Delete lessons by Id
const deleteModuleById = async (moduleId: string): Promise<ModulesDocument> => {
  const foundModule = await Modules.findById(moduleId);

  if (!foundModule) {
    throw new NotFoundError(`Module ${moduleId} not found`);
  }
  return foundModule;
};

export default {
  createModule,
  updateModule,
  deleteModuleById,
  findAllModules,
  findAllModulesById,
};
