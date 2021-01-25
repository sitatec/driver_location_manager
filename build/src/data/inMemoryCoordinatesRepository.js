"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coordinatesRepository_1 = require("./coordinatesRepository");
// TODO: Refactoring (create a class InMemoryDatabase wich will extends a Database class)
// TODO: faire en sorte que quelqu'un qui se trouve dans une ville differente de celle d'un taxi proche de lui puisse se trouver .
const inMemoryDatabase = new Map();
class InMemoryCoordinatesRepository {
    getCoordinatesByCityName(cityName) {
        const coordinates = inMemoryDatabase.get(cityName);
        if (coordinates)
            return coordinates;
        throw coordinatesRepository_1.CoordinatesRepositoryException.coordinatesNotFound();
    }
    saveCoordinates(cityName, id, coordinates) {
        const coordinatesWrapper = {
            lastWriteTime: Date.now(),
            coordinates: coordinates,
        };
        inMemoryDatabase.get(cityName)?.set(id, coordinatesWrapper) ??
            inMemoryDatabase.set(cityName, new Map([[id, coordinatesWrapper]]));
    }
    getCoordinates(cityName, id) {
        const coordinates = inMemoryDatabase.get(cityName)?.get(id)?.coordinates;
        if (!coordinates) {
            throw coordinatesRepository_1.CoordinatesRepositoryException.coordinatesNotFound();
        }
        return coordinates;
    }
    clearOldCoordinates(minLifeTime) {
        let currentTime;
        let deletedCoordinateIds = [];
        inMemoryDatabase.forEach((cityCoordinatesList) => {
            currentTime = Date.now();
            cityCoordinatesList.forEach((coordinatesWrapper, id) => {
                if (currentTime - coordinatesWrapper.lastWriteTime >= minLifeTime) {
                    cityCoordinatesList.delete(id);
                    deletedCoordinateIds.push(id);
                }
            });
        });
        return deletedCoordinateIds;
    }
    getTotalCoordinatesCount() {
        let coordinatesCount = 0;
        inMemoryDatabase.forEach((cityCoordinatesList) => {
            coordinatesCount += cityCoordinatesList.size;
        });
        return coordinatesCount;
    }
    contains(id, cityName) {
        return inMemoryDatabase.get(cityName)?.has(id) ?? false;
    }
    // TODO test
    removeCoordinates(cityName, id) {
        const cityCoordinatesList = inMemoryDatabase.get(cityName);
        if (cityCoordinatesList)
            cityCoordinatesList.delete(id);
        else
            throw coordinatesRepository_1.CoordinatesRepositoryException.coordinatesNotFound();
    }
    getAllCoordinatesForTest() {
        if (process.env.NODE_ENV !== "development")
            return null;
        return inMemoryDatabase;
    }
}
exports.default = InMemoryCoordinatesRepository;
