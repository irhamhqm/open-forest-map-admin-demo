export interface SignInPayload {
    user_name: string;
    user_password: string;
  }
  
  export interface SignInResponse {
    data: string;
    meta: string;
    status: true;
  }