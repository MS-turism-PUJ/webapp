import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { API_URL } from '../config/environment/urls';
import { AuthService } from './auth.service';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  axiosInstance: AxiosInstance;

  constructor(private authService: AuthService) {
    this.axiosInstance = axios.create({
      baseURL: `${API_URL}/services/questions`,
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
  }

  async getQuestions(contentId: string) {
    const response = await this.axiosInstance.get(`/${contentId}`);
    return response.data;
  }

  async createQuestion(contentId: string, question: Question) {
    const response = await this.axiosInstance.post(`/${contentId}`, question);
    return response.data;
  }
}
