export class AuthSignInOutputDto {
  readonly accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}
