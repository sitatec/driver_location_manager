import { IncomingMessage, ServerResponse } from "http";
import { banClient, getRequestData } from "./utils";
import DriverLocationManager from "../app/driverLocationManager";
import { LocationManagerExceptionType } from "../app/locationManagerException";
// TODO write better error handler.
// TODO refactore repetitive code in the controller && remove unnecessary  abstraction.
const driverLocationManager = new DriverLocationManager();

// const wrappeConntrollerLogic = async (controllerLogic: (data: JsonType) => void, response: ServerResponse, request: IncomingMessage) => {
//   try {
//     const data = await getRequestData(request);
//     controllerLogic(data);
//   } catch (_) {
//     response.writeHead(500).end();
//   }
// }

const addController = async (
  request: IncomingMessage,
  response: ServerResponse
) => {
  if (request.method !== "POST") banClient(response);
  try {
    const data = await getRequestData(request);
    driverLocationManager.addLocation(data.id, data.location);
    response.writeHead(200).end();
  } catch (error) {
    if (error.message == "invalid-data") response.writeHead(404).end();
    else response.writeHead(500).end();
  }
};

const removeController = async (
  request: IncomingMessage,
  response: ServerResponse
) => {
  if (request.method !== "DELETE") banClient(response);
  try {
    const data = await getRequestData(request);
    driverLocationManager.removeLocation(data.id, data.cityName);
    response.writeHead(200).end();
  } catch (error) {
    console.log("\n\n" + error + "\n\n")
    if (error.message == "invalid-data") response.writeHead(404).end();
    else if (
      error.exceptionType ==
      LocationManagerExceptionType.UnableToRemoveUnsavedLocation
    )
      response.writeHead(404).end();
    else response.writeHead(500).end();
  }
};

const updateController = async (
  request: IncomingMessage,
  response: ServerResponse
) => {
  if (request.method !== "PATCH") banClient(response);
  try {
    const data = await getRequestData(request);
    driverLocationManager.updateLocation(data.id, data.location);
    response.writeHead(200).end();
  } catch (error) {
    if (error.message == "invalid-data") response.writeHead(404).end();
    else if (
      error.exceptionType ==
      LocationManagerExceptionType.UnableToUpdateUnsavedLocation
    )
      response.writeHead(404).end();
    else response.writeHead(500).end();
  }
};

export { addController, removeController, updateController };
