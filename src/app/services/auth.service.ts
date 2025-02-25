import { Injectable } from '@angular/core'
import axios from 'axios'
import { Role } from '../models/role'
import { API_URL } from '../config/environment/urls'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null
  private role: Role | null = null
  private refreshToken: string | null = null

  private axiosInstance = axios.create({
    baseURL: `${API_URL}/users/auth`,
  })

  constructor() {
    this.token = localStorage.getItem('auth_token');
    this.refreshToken = localStorage.getItem('auth_refresh_token');
    this.role = localStorage.getItem('auth_role') as Role | null;
  }

  public async isAuthenticated(): Promise<boolean> {
    try {
      await this.refresh()

      return true
    } catch {
      return false
    }
  }

  public async login(username: string, password: string): Promise<Role> {
    const response = await this.axiosInstance.post('/login', {
      username,
      password,
    })

    this.token = response.data.access_token
    this.refreshToken = response.data.refresh_token
    this.role = response.data.role

    localStorage.setItem('auth_token', response.data.access_token);
    localStorage.setItem('auth_refresh_token', response.data.refresh_token);
    localStorage.setItem('auth_role', response.data.role);

    return this.role as Role
  }

  public async refresh(): Promise<void> {
    const response = await this.axiosInstance.post(
      '/refresh',
      new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: 'webapp',
        refresh_token: this.refreshToken as string,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )

    this.token = response.data.access_token
    this.refreshToken = response.data.refresh_token

    localStorage.setItem('auth_token', response.data.access_token)
    localStorage.setItem('auth_refresh_token', response.data.refresh_token)
  }

  public logout(): void {
    this.token = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_refresh_token')
    localStorage.removeItem('auth_role')
  }

  public async registerClient(username: string, name: string, age: number, email: string, password: string, description: string, photo?: File): Promise<void> {
    const response = await this.axiosInstance.postForm('/client/register', {
      username,
      name,
      age,
      email,
      password,
      description,
      photo,
    })

    this.token = response.data.access_token
    this.refreshToken = response.data.refresh_token
    this.role = response.data.role

    localStorage.setItem('auth_token', response.data.access_token)
    localStorage.setItem('auth_refresh_token', response.data.refresh_token)
    localStorage.setItem('auth_role', response.data.role)
  }

  public async registerProvider(username: string, name: string, age: number, email: string, password: string, description: string, phone: number, webPage?: string, photo?: File): Promise<void> {
    const response = await this.axiosInstance.postForm('/provider/register', {
      username,
      name,
      age,
      email,
      password,
      description,
      photo,
      phone,
      webPage,
    })

    this.token = response.data.access_token
    this.refreshToken = response.data.refresh_token
    this.role = response.data.role

    localStorage.setItem('auth_token', response.data.access_token)
    localStorage.setItem('auth_refresh_token', response.data.refresh_token)
    localStorage.setItem('auth_role', response.data.role)
  }

  public getToken(): string | null {
    return this.token
  }

  public getRole(): Role | null {
    return this.role
  }

  public hasRole(...roles: Role[]): boolean {
    if (!this.role) {
      return false
    }
    return roles.includes(this.role)
  }
}