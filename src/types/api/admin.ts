export interface FireEvent {
  type: string;
  properties: {
    temporal: {
      datetime: number;
      daterange: string;
    };
    data: {
      name: string;
      value: number;
      size: number;
    };
  };
  geometry: {
    type: string;
    coordinates: {
      lon: number;
      lat: number;
    }[][];
    pilot: string;
  };
}

export interface FireEventResponse {
  data: {
    name: string;
    size: number;
    value: number;
  };
  meta: unknown;
  status: boolean;
}

export interface SoilType {
  type: string;
  properties: {
    temporal: {
      datetime: number;
      daterange: string;
    };
    data: {
      name: string;
      description: string;
    };
  };
  geometry: {
    type: string;
    coordinates: {
      lon: number;
      lat: number;
    }[][];
    pilot: string;
  };
}

export interface SoilTypeResponse {
  data: {
    description: string;
    name: string;
  };
  meta: unknown;
  status: true;
}
