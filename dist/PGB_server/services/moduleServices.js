"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const modulesModel_1 = __importDefault(require("../models/modulesModel"));
const errorHandlers_1 = require("../helpers/errorHandlers");
//POST
const createModule = (modulesDocument) => __awaiter(void 0, void 0, void 0, function* () {
    const createdModule = yield modulesDocument.save();
    return createdModule;
});
//PUT to update
const updateModule = (moduleId, update) => __awaiter(void 0, void 0, void 0, function* () {
    const foundModule = yield modulesModel_1.default.findByIdAndUpdate(moduleId, update, {
        new: true,
    });
    if (!foundModule) {
        throw new errorHandlers_1.NotFoundError(`Module ${moduleId} not found`);
    }
    return foundModule;
});
//GET all module
const findAllModules = () => __awaiter(void 0, void 0, void 0, function* () {
    return modulesModel_1.default.find();
});
//GET a module byId
const findAllModulesById = (moduleId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundModule = yield modulesModel_1.default.findById(moduleId);
    if (!foundModule) {
        throw new errorHandlers_1.NotFoundError(`Module ${moduleId} not found`);
    }
    return foundModule;
});
//Delete lessons by Id
const deleteModuleById = (moduleId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundModule = yield modulesModel_1.default.findById(moduleId);
    if (!foundModule) {
        throw new errorHandlers_1.NotFoundError(`Module ${moduleId} not found`);
    }
    return foundModule;
});
exports.default = {
    createModule,
    updateModule,
    deleteModuleById,
    findAllModules,
    findAllModulesById,
};
//# sourceMappingURL=moduleServices.js.map