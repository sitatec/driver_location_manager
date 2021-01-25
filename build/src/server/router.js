"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("./controllers");
const utils_1 = require("./utils");
const router = (request, response) => {
    if (request.url === "/add" && request.method === "POST") {
        controllers_1.addController(request, response);
    }
    else if (request.url === "/delete" && request.method === "DELETE") {
        controllers_1.removeController(request, response);
    }
    else if (request.url === "/update" && request.method === "PATCH") {
        controllers_1.updateController(request, response);
    }
    else if (request.url === "/findClosest" && request.method === "GET") {
        controllers_1.findClosestLocationController(request, response);
    }
    else if (process.env.NODE_ENV == "development" && request.url == "/test") {
        testController(request, response);
    }
    else
        utils_1.sendNotFoundResponse(response);
};
exports.default = router;
///////////////////////////////////////////////////////////////////////////////
///                             ONLY FOR TESTS                              ///
///////////////////////////////////////////////////////////////////////////////
const testController = (request, response) => {
    const CoordinatesRepositoryClass = require("../data/inMemoryCoordinatesRepository")
        .default;
    const coordinatesRepository = new CoordinatesRepositoryClass();
    response
        .writeHead(200)
        .end(JSON.stringify(mapToObject(coordinatesRepository.getAllCoordinatesForTest())));
};
function mapToObject(map) {
    const out = Object.create(null);
    map.forEach((value, key) => {
        if (value instanceof Map) {
            out[key] = mapToObject(value);
        }
        else {
            out[key] = value;
        }
    });
    return out;
}
