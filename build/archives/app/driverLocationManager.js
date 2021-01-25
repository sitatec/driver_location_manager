"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inMemoryCoordinatesRepository_1 = __importDefault(require("../../src/data/inMemoryCoordinatesRepository"));
const locationManagerException_1 = require("./locationManagerException");
class DriverLocationManager {
    constructor(coordinatesRepository = new inMemoryCoordinatesRepository_1.default()) {
        this.coordinatesRepository = coordinatesRepository;
    }
    addLocation(driverId, location) {
        this.coordinatesRepository.saveCoordinates(location.cityName, driverId, location.coordinates);
    }
    removeLocation(driverId, cityName) {
        try {
            this.coordinatesRepository.removeCoordinates(cityName, driverId);
        }
        catch (error) {
            if (error.exceptionType ==
                0 /* CoordinatesNotFound */) {
                throw locationManagerException_1.LocationManagerException.UnableToRemoveUnsavedLocation();
            }
            else
                throw locationManagerException_1.LocationManagerException.unknown();
        }
    }
    updateLocation(driverId, newLocation) {
        // TODO handle the case were the new location city doesn't match to the old.
        if (!this.coordinatesRepository.contains(driverId, newLocation.cityName))
            throw locationManagerException_1.LocationManagerException.UnableToUpdateUnsavedLocation();
        this.coordinatesRepository.saveCoordinates(newLocation.cityName, driverId, newLocation.coordinates);
    }
}
exports.default = DriverLocationManager;
