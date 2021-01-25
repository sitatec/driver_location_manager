import { IncomingMessage, ServerResponse } from "http";
import {
  addController,
  removeController,
  updateController,
} from "./controllers";
import { sendErrorResponse } from "./utils";

const router = (request: IncomingMessage, response: ServerResponse) => {
  switch (request.url) {
    case "/add":
      addController(request, response);
      break;
    case "/delete":
      removeController(request, response);
      break;
    case "/update":
      updateController(request, response);
      break;
    case "/findClosest":
      // TODO implements.
      break;
    default:
      if (process.env.NODE_ENV == "development" && request.url == "/test") {
        testController(request, response);
      } else sendErrorResponse(response);
  }
};
export default router;

const testController = (request: IncomingMessage, response: ServerResponse) => {
  const CoordinatesRepositoryClass = require("../data/inMemoryCoordinatesRepository")
    .default;
  const coordinatesRepository = new CoordinatesRepositoryClass();
  response
    .writeHead(200)
    .end(
      JSON.stringify(
        mapToObject(coordinatesRepository.getAllCoordinatesForTest())
      )
    );
};

function mapToObject(map: Map<string, any>) {
  const out = Object.create(null);
  map.forEach((value, key) => {
    if (value instanceof Map) {
      out[key] = mapToObject(value);
    } else {
      out[key] = value;
    }
  });
  return out;
}

