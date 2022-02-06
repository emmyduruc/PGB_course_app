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
exports.deleteModule = exports.findModuleById = exports.findAllModule = exports.updateModule = exports.createModule = void 0;
const errorHandlers_1 = require("../helpers/errorHandlers");
const modulesModel_1 = __importDefault(require("../models/modulesModel"));
const moduleServices_1 = __importDefault(require("../services/moduleServices"));
//POST/creates modules
const createModule = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { modules } = req.body;
        const module = new modulesModel_1.default({
            modules,
        });
        const createdModule = yield moduleServices_1.default.createModule(module);
        res.json(createdModule);
    }
    catch (error) {
        if (error instanceof Error && error.name == "ValidationError") {
            next(new errorHandlers_1.BadRequestError("Invalid Request", error));
        }
        else {
            next(error);
        }
    }
});
exports.createModule = createModule;
//PUT
const updateModule = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = req.body;
        const moduleId = req.params.lessonId;
        const updatedModule = yield moduleServices_1.default.updateModule(moduleId, update);
        res.json(updatedModule);
    }
    catch (error) {
        if (error instanceof Error && error.name == "ValidationError") {
            next(new errorHandlers_1.BadRequestError("Invalid Request", error));
        }
        else {
            next(error);
        }
    }
});
exports.updateModule = updateModule;
// GET /lessons (gets all existing lesson)
const findAllModule = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield moduleServices_1.default.findAllModules());
    }
    catch (error) {
        if (error instanceof Error && error.name == "ValidationError") {
            next(new errorHandlers_1.BadRequestError("Invalid Request", error));
        }
        else {
            next(error);
        }
    }
});
exports.findAllModule = findAllModule;
// GET /lesson/:lessonId //get the existing resource
const findModuleById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield moduleServices_1.default.findAllModulesById(req.params.moduleId));
    }
    catch (error) {
        if (error instanceof Error && error.name == "ValidationError") {
            next(new errorHandlers_1.BadRequestError("Invalid Request", error));
        }
        else {
            next(error);
        }
    }
});
exports.findModuleById = findModuleById;
// DELETE /module/:moduelId //Delete an existing resource
const deleteModule = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield moduleServices_1.default.deleteModuleById(req.params.moduelId);
        res.status(204).end();
    }
    catch (error) {
        if (error instanceof Error && error.name == "ValidationError") {
            next(new errorHandlers_1.BadRequestError("Invalid Request", error));
        }
        else {
            next(error);
        }
    }
});
exports.deleteModule = deleteModule;
//# sourceMappingURL=moduleControllers.js.map