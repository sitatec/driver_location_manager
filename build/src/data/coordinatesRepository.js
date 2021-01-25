"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoordinatesRepositoryExceptionType = exports.CoordinatesRepositoryException = void 0;
class CoordinatesRepositoryException extends Error {
    constructor(exceptionType, description) {
        super(description);
        this.exceptionType = exceptionType;
    }
    static coordinatesNotFound() {
        return new this(0 /* CoordinatesNotFound */, "The given combination of city name and id does not match any Location.");
    }
}
exports.CoordinatesRepositoryException = CoordinatesRepositoryException;
var CoordinatesRepositoryExceptionType;
(function (CoordinatesRepositoryExceptionType) {
    CoordinatesRepositoryExceptionType[CoordinatesRepositoryExceptionType["CoordinatesNotFound"] = 0] = "CoordinatesNotFound";
})(CoordinatesRepositoryExceptionType = exports.CoordinatesRepositoryExceptionType || (exports.CoordinatesRepositoryExceptionType = {}));
