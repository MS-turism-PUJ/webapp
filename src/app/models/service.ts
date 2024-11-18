import { ServiceCategory } from "./service.category";

export class Service {
  constructor (
    public price: number,
    public name: string,
    public city: string,
    public country: string,
    public description: string,
    public category: ServiceCategory,
    public capital?: string,
    public currency?: string,
    public officialName?: string,
    public region?: string,
    public language?: string,
    public population?: number,
    public latitude?: number,
    public longitude?: number,
    public arrivalLatitude?: number,
    public arrivalLongitude?: number,
    public departureDate?: string,
    public duration?: number,
    public transportType?: string,
    public drink?: string,
    public lunch?: string,
    public dessert?: string
  ) {}
}
