export interface AllPilotsResponse {
  data: PilotData[] | undefined;
  meta: string;
  status: boolean;
}

export interface PilotData {
  pilot_id: number;
  pilot_name: string;
}

export interface PilotDetailsResponse {
  data: {
    centroid: {
      lat: number;
      lon: number;
    };
    pilot_geom: string;
    pilot_id: number | null;
    pilot_name: string;
  };
  meta: null;
  status: true;
}
