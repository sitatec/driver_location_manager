"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationManagerExceptionType = exports.LocationManagerException = void 0;
class LocationManagerException extends Error {
    constructor(exceptionType, description) {
        super(description);
        this.exceptionType = exceptionType;
    }
    static UnableToUpdateUnsavedLocation() {
        return new this(0 /* UnableToUpdateUnsavedLocation */, "The given location is not  registred so it can't be updated.");
    }
    static UnableToRemoveUnsavedLocation() {
        return new this(0 /* UnableToUpdateUnsavedLocation */, "The given location is not registred so it can't be removed.");
    }
    static unknown() {
        return new this(2 /* unknown */, "Unknown exception reason.");
    }
}
exports.LocationManagerException = LocationManagerException;
var LocationManagerExceptionType;
(function (LocationManagerExceptionType) {
    LocationManagerExceptionType[LocationManagerExceptionType["UnableToUpdateUnsavedLocation"] = 0] = "UnableToUpdateUnsavedLocation";
    LocationManagerExceptionType[LocationManagerExceptionType["UnableToRemoveUnsavedLocation"] = 1] = "UnableToRemoveUnsavedLocation";
    LocationManagerExceptionType[LocationManagerExceptionType["unknown"] = 2] = "unknown";
})(LocationManagerExceptionType = exports.LocationManagerExceptionType || (exports.LocationManagerExceptionType = {}));
