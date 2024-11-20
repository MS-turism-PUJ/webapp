import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { AuthService } from './auth.service';
import { API_URL } from '../config/environment/urls';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  axiosInstance: AxiosInstance

  constructor(private authService: AuthService) {
    this.axiosInstance = axios.create({
      baseURL: `${API_URL}/services`,
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`,
      }
    });
  }

  async createService(serviceData: any, serviceType: string): Promise<string> {
    let endpoint = '';

    switch (serviceType) {
      case 'ALIMENTATION':
        endpoint = '/alimentation';
        break;
      case 'HOUSING':
        endpoint = '/housing';
        break;
      case 'TRANSPORT':
        endpoint = '/transport';
        break;
      case 'ECO_WALK':
        endpoint = '/ecowalk';
        break;
      default:
        throw new Error('Invalid service type');
    }

    try {
      const response = await this.axiosInstance.post(`${endpoint}`, serviceData);
      return response.data.serviceId;
    } catch (error) {
      console.error('Error creating service:', error);
      throw error;
    }
  }


}
