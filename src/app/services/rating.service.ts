import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { AuthService } from './auth.service';
import { API_URL } from '../config/environment/urls';
import { Rating } from '../models/rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  axiosInstance: AxiosInstance;

  constructor(private authService: AuthService) {
    this.axiosInstance = axios.create({
      baseURL: `${API_URL}/services/ratings`,
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
  }

  async getAverageRating(serviceId: string): Promise<number> {
    const response = await this.axiosInstance.get(`/average/${serviceId}`);

    return response.data;
  }

  async getQuantityRating(serviceId: string): Promise<number> {
    const response = await this.axiosInstance.get(`/quantity/${serviceId}`);

    return response.data;
  }

  async getRatings(serviceId: string): Promise<Rating[]> {
    const response = await this.axiosInstance.get(`/${serviceId}`);

    return response.data.ratings;
  }

  async getMyRating(serviceId: string): Promise<Rating> {
    const response = await this.axiosInstance.get(`/my-rating/${serviceId}`);

    return response.data;
  }

  async rateService(serviceId: string, rating: Rating): Promise<void> {
    await this.axiosInstance.post(`/rate/${serviceId}`, rating);
  }
}
