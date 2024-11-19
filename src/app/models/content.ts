import { Service } from "./service";
import { User } from "./user";

export class Content {
  constructor(
    public contentId: string,
    public name: string,
    public description: string,
    public user: User,
    public service?: Service,
  ) { }
}
