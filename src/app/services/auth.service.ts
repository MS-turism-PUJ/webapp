import { Injectable } from '@angular/core'
import axios from 'axios'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string | null = null
  private refreshToken: string | null = null
  private axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/users/auth',
  })

  constructor() {}

  public isAuthenticated(): boolean {
    return this.token !== null
  }

  public async login(user: string, password: string): Promise<void> {
    const response = await this.axiosInstance.post('/login', {
      user,
      password,
    })

    this.token = response.data.access_token
    this.refreshToken = response.data.refresh_token
  }

  public async refresh(): Promise<void> {}

  public logout(): void {
    this.token = null
  }

  public async register(): Promise<void> {
    return
  }
}
