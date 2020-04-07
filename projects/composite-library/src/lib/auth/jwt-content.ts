export interface JwtContent {
  email: string;
  sub: string;
  jti: string;
  exp: number;
  iat: number;
}
