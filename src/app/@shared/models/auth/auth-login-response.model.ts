export interface AuthLoginResponseModel {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expire: number;
}
