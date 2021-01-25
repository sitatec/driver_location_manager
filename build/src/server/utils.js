"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSortedClosestCoordinates = exports.getRequestData = exports.sendNotFoundResponse = void 0;
const sendNotFoundResponse = (httpResponse) => httpResponse.writeHead(404).end();
exports.sendNotFoundResponse = sendNotFoundResponse;
const getRequestData = (request, parseData = true) => {
    return new Promise((resolve, reject) => {
        let data = "";
        request
            .on("data", (chunk) => (data += chunk))
            .on("end", () => {
            if (!data)
                return reject(Error("invalid-data"));
            try {
                resolve(JSON.parse(data));
            }
            catch (_) {
                reject(Error("invalid-data"));
            }
        })
            .on("error", (error) => reject(error));
    });
};
exports.getRequestData = getRequestData;
const distanceBetween = (first, second) => {
    const dLat = (second.lat * Math.PI) / 180 - (first.lat * Math.PI) / 180;
    const dLon = (second.lon * Math.PI) / 180 - (first.lon * Math.PI) / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((first.lat * Math.PI) / 180) *
            Math.cos((second.lat * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    // [6378.137] Radius of earth in KM
    return 6378.137 * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};
const getSortedClosestCoordinates = (coordinatesList, data) => {
    let coordinates;
    const closestCoordinates = [];
    let distance;
    coordinatesList.forEach((coordinatesWrapper, id) => {
        coordinates = coordinatesWrapper.coordinates;
        distance = distanceBetween(data.coord, coordinates);
        if (distance <= data.maxDistance)
            closestCoordinates[distance] = { [id]: coordinates };
        if (closestCoordinates.length == data.count)
            return null;
    });
    return closestCoordinates;
};
exports.getSortedClosestCoordinates = getSortedClosestCoordinates;
