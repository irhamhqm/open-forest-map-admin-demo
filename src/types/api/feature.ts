export interface AllFeaturesResponse {
    data: FeatureData[]
    meta: string
    status: boolean
  }
  
  export interface FeatureData {
    feature_id: number
    feature_name: string
  }