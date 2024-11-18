import { Service } from "./service";

export class Content {
  constructor(
    public name: string,
    public description: string,
    public service?: Service
  ) {}
}
