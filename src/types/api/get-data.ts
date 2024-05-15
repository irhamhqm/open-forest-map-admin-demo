export interface FireEventDetail {
  data: FireEvent;
  meta: string;
  status: boolean;
}

type FireEvent = {
  fire_event_id: number;
  fire_intensity: string; //| "moderate";
  fire_size: number;
  fire_type: string;
  spatial: {
    entity_code: string | null;
    geom: string;
    pilot_id: number | null;
  };
  temporal: {
    from_date: string;
    to_date: string;
  };
};

export interface FireEventList {
  data: FireEvent[];
  meta: string;
  status: boolean;
}

type SoilType = {
  soil_texture: string;
  soil_type: string;
  soil_type_id: number;
  spatial: {
    entity_code: string | null;
    geom: string;
    pilot_id: number | null;
  };
  temporal: {
    acquired_date: string;
  };
};

export interface SoilTypeDetail {
  data: SoilType;
  meta: string;
  status: boolean;
}

export interface SoilTypeList {
  data: SoilType[];
  meta: string;
  status: boolean;
}

type Program = {
  program_budget: number | null;
  program_description: string;
  program_engfile_path: string;
  program_file_path: string;
  program_id: number;
  program_name: string;
  program_size: number;
  spatial: {
    entity_code: string | null;
    geom: string | null;
    pilot_id: number | null;
  };
  temporal: {
    from_date: string;
    to_date: string;
  };
};

export interface ProgramDetail {
  data: Program;
  meta: string;
  status: boolean;
}

export interface ProgramList {
  data: Program[];
  meta: string;
  status: boolean;
}

type Regulation = {
  regulation_description: string;
  regulation_engfile_path: string;
  regulation_file_path: string;
  regulation_id: number;
  regulation_name: string;
  spatial: {
    entity_code: string | null;
    geom: string | null;
    pilot_id: number | null;
  };
  temporal: {
    acquired_date: string;
  };
};

export interface RegulationList {
  data: Regulation[];
  meta: string;
  status: boolean;
}

export interface RegulationDetail {
  data: Regulation;
  meta: string;
  status: boolean;
}
