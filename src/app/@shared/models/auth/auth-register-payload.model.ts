export interface AuthRegisterPayloadModel {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  accept_terms: boolean;
}
