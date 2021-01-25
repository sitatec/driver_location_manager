import http from "http";
import InMemoryCoordinatesRepository from "./data/inMemoryCoordinatesRepository";
import router from "./server/router";
// Remove all console logs.
http.createServer(router).listen(3000, () => console.log("Started"));

const oneHourInMilliseconds = 3_600_000;
const coordinatesRepository = new InMemoryCoordinatesRepository();

setInterval(() => {
  const coordinatesCount = coordinatesRepository.getTotalCoordinatesCount();
  if (coordinatesCount > 100_000)
    coordinatesRepository.clearOldCoordinates(oneHourInMilliseconds * 3);
}, oneHourInMilliseconds);
