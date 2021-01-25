"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const inMemoryCoordinatesRepository_1 = __importDefault(require("./data/inMemoryCoordinatesRepository"));
const router_1 = __importDefault(require("./server/router"));
// Remove all console logs.
http_1.default.createServer(router_1.default).listen(3000, () => console.log("Started"));
const oneHourInMilliseconds = 3600000;
const coordinatesRepository = new inMemoryCoordinatesRepository_1.default();
setInterval(() => {
    const coordinatesCount = coordinatesRepository.getTotalCoordinatesCount();
    if (coordinatesCount > 100000)
        coordinatesRepository.clearOldCoordinates(oneHourInMilliseconds * 3);
}, oneHourInMilliseconds);
