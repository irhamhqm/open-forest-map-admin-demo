
export interface AllPilotsResponse {
    data: PilotData[] | undefined;
    meta: string;
    status: boolean;
};

export interface PilotData {
    pilot_id: number;
    pilot_name: string;
  }