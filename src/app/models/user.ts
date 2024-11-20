export class User {
  constructor(
    public userId: number,
    public name: string,
    public email: string,
    public username: string,
    public phone?: number,
    public age?: number,
    public webPage?: string,
    public description?: string,
    public socialmedia?: string,

  ) {}
}
