"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findClosestLocationController = exports.updateController = exports.removeController = exports.addController = void 0;
const utils_1 = require("./utils");
const inMemoryCoordinatesRepository_1 = __importDefault(require("../data/inMemoryCoordinatesRepository"));
const coordinatesRepository = new inMemoryCoordinatesRepository_1.default();
const errorHandler = (error, response) => {
    if (error.message == "invalid-data" ||
        error.exceptionType ==
            0 /* CoordinatesNotFound */)
        response.writeHead(404).end();
    else
        response.writeHead(500).end();
};
const addController = async (request, response) => {
    try {
        const data = await utils_1.getRequestData(request);
        coordinatesRepository.saveCoordinates(data.city, data.id, data.coord);
        response.writeHead(200).end();
    }
    catch (error) {
        errorHandler(error, response);
    }
};
exports.addController = addController;
const updateController = async (request, response) => {
    try {
        const data = await utils_1.getRequestData(request);
        if (!coordinatesRepository.contains(data.id, data.city)) {
            utils_1.sendNotFoundResponse(response);
        }
        coordinatesRepository.saveCoordinates(data.city, data.id, data.coord);
        response.writeHead(200).end();
    }
    catch (error) {
        errorHandler(error, response);
    }
};
exports.updateController = updateController;
const removeController = async (request, response) => {
    try {
        const data = await utils_1.getRequestData(request);
        coordinatesRepository.removeCoordinates(data.city, data.id);
        response.writeHead(200).end();
    }
    catch (error) {
        errorHandler(error, response);
    }
};
exports.removeController = removeController;
const findClosestLocationController = async (request, response) => {
    const data = await utils_1.getRequestData(request);
    const coordinatesList = coordinatesRepository.getCoordinatesByCityName(data.city);
    const result = utils_1.getSortedClosestCoordinates(coordinatesList, data);
    if (result.length != 0)
        response.writeHead(200).end(JSON.stringify(result));
    else
        utils_1.sendNotFoundResponse(response);
};
exports.findClosestLocationController = findClosestLocationController;
