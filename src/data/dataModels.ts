export class Coordinates {
  constructor(public latitude: number, public longitude: number) {}
}

type CoordinatesWrapper = {
  lastWriteTime: number;
  coordinates: Coordinates;
};

export class Location {
  constructor(public cityName: string, public coordinates: Coordinates){}
}

export type InMemoryDatabaseStructure = Map<
  string,
  Map<string, CoordinatesWrapper>
>;