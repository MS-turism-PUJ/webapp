import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { API_URL } from '../config/environment/urls';
import { AuthService } from './auth.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private authService: AuthService) {
    this.axiosInstance = axios.create({
      baseURL: `${API_URL}/users`,
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`,
      }
    });
  }
  axiosInstance: AxiosInstance

  async getMyInfo(): Promise<User> {
    const result = await this.axiosInstance.get("/");
    return result.data;
  }


  async getMyphoto(): Promise<string>
  {
    const result = await this.axiosInstance.get("/photo",{ responseType: 'blob',});
    
    return URL.createObjectURL(result.data);
  }



}
