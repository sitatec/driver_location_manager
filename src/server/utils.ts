import { IncomingMessage, ServerResponse } from "http";

const banClient = (httpResponse: ServerResponse) =>
  httpResponse.writeHead(404).end();

const getRequestData = (request: IncomingMessage, parseData = true): Promise<JsonType> => {
  return new Promise((resolve, reject) => {
    let data = "";
    request
      .on("data", (chunk) => (data += chunk))
      .on("end", () => {
        console.log("\n\n Data: " + data + "\n\n")
        if(!data) return reject(Error('invalid-data'))
        try {
          resolve(JSON.parse(data));
        }catch (_){
          reject(Error('invalid-data'));
        }
      })
      .on("error", (error) => reject(error));
  });
};


export type JsonType = {
  [key: string]: any;
};

export { banClient, getRequestData };
