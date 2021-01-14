export class ShortUserDataDto {
  public login: string;
  public id: number;

  constructor(login: string, id: number) {
    this.login = login;
    this.id = id;
  }
}
