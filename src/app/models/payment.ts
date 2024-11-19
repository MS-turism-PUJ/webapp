import { Service } from "./service"
import { User } from "./user"

export class Payment {
  constructor(
    public paymentId: string,
    public totalAmount: number,
    public user: User,
    public paid: boolean,
    public services: Service[]
  ) {}
}
