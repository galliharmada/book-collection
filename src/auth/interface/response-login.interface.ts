export interface ResponseLogin {
  id: number;
  email: string;
  accessToken: string;
  refreshToken: string;
  roles: string;
}
