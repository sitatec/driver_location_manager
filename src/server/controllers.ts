import { IncomingMessage, ServerResponse } from "http";
import { sendErrorResponse, getRequestData } from "./utils";
import InMemoryCoordinatesRepository from "../data/inMemoryCoordinatesRepository";
import { CoordinatesRepositoryExceptionType } from "../data/coordinatesRepository";
// TODO write better error handler.
// TODO refactore repetitive code in the controller && remove unnecessary  abstraction.
const coordinatesRepository = new InMemoryCoordinatesRepository();

// const wrappeConntrollerLogic = async (controllerLogic: (data: JsonType) => void, response: ServerResponse, request: IncomingMessage) => {
//   try {
//     const data = await getRequestData(request);
//     controllerLogic(data);
//   } catch (_) {
//     response.writeHead(500).end();
//   }
// }

const errorHandler = (error: any, response: ServerResponse) => {
  if (
    error.message == "invalid-data" ||
    error.exceptionType ==
      CoordinatesRepositoryExceptionType.CoordinatesNotFound
  )
    response.writeHead(404).end();
  else response.writeHead(500).end();
};

const addController = async (
  request: IncomingMessage,
  response: ServerResponse
) => {
  if (request.method !== "POST") sendErrorResponse(response);
  try {
    const data = await getRequestData(request);
    coordinatesRepository.saveCoordinates(
      data.location.cityName,
      data.id,
      data.location.coordinates
    );
    response.writeHead(200).end();
  } catch (error) {
    errorHandler(error, response);
  }
};

const updateController = async (
  request: IncomingMessage,
  response: ServerResponse
) => {
  if (request.method !== "PATCH") sendErrorResponse(response);
  try {
    const data = await getRequestData(request);
    if (!coordinatesRepository.contains(data.id, data.location.cityName))
      sendErrorResponse(response);
    coordinatesRepository.saveCoordinates(
      data.location.cityName,
      data.id,
      data.location.coordinates
    );
    response.writeHead(200).end();
  } catch (error) {
    errorHandler(error, response);
  }
};

const removeController = async (
  request: IncomingMessage,
  response: ServerResponse
) => {
  if (request.method !== "DELETE") sendErrorResponse(response);
  try {
    const data = await getRequestData(request);
    coordinatesRepository.removeCoordinates(data.cityName, data.id);
    response.writeHead(200).end();
  } catch (error) {
    errorHandler(error, response);
  }
};

export { addController, removeController, updateController };
