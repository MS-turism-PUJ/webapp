import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { AuthService } from './auth.service';
import { API_URL } from '../config/environment/urls';
import { Rating } from '../models/rating';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  axiosInstance: AxiosInstance;

  averageRatingSubject = new BehaviorSubject<number>(0);
  ratingsSubject = new BehaviorSubject<Rating[]>([]);
  quantityRatingSubject = new BehaviorSubject<number>(0);

  constructor(private authService: AuthService) {
    this.axiosInstance = axios.create({
      baseURL: `${API_URL}/services/ratings`,
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
  }

  async syncAverageRating(serviceId: string): Promise<void> {
    const response = await this.axiosInstance.get(`/average/${serviceId}`);

    this.averageRatingSubject.next(response.data);
  }

  getAverageRating(): Observable<number> {
    return this.averageRatingSubject.asObservable();
  }

  async syncQuantityRating(serviceId: string): Promise<void> {
    const response = await this.axiosInstance.get(`/quantity/${serviceId}`);

    this.quantityRatingSubject.next(response.data);
  }

  getQuantityRating(): Observable<number> {
    return this.quantityRatingSubject.asObservable();
  }

  async syncRatings(serviceId: string): Promise<void> {
    const response = await this.axiosInstance.get(`/${serviceId}`);

    this.ratingsSubject.next(response.data.ratings);
  }

  getRatings(): Observable<Rating[]> {
    return this.ratingsSubject.asObservable();
  }

  async getMyRating(serviceId: string): Promise<Rating> {
    const response = await this.axiosInstance.get(`/my-rating/${serviceId}`);

    return response.data;
  }

  async rateService(serviceId: string, rating: Rating): Promise<void> {
    await this.axiosInstance.post(`/rate/${serviceId}`, rating);
    this.syncAverageRating(serviceId);
    this.syncQuantityRating(serviceId);
    this.syncRatings(serviceId);
  }
}
