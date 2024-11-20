import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Content } from '../models/content';
import { ServiceCategory } from '../models/service.category';
import axios, { AxiosInstance } from 'axios';
import { API_URL } from '../config/environment/urls';
import { AuthService } from './auth.service';
import { ServiceService } from './service.service';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  contentsSubject = new BehaviorSubject<Content[]>([]);
  filterSubject = new BehaviorSubject<string | undefined>(undefined);
  categoriesSubject = new BehaviorSubject<ServiceCategory[] | undefined>(undefined);
  loadingSubject = new BehaviorSubject<boolean>(false);
  lessThanSubject = new BehaviorSubject<number | undefined>(undefined);
  moreThanSubject = new BehaviorSubject<number | undefined>(undefined);

  axiosInstance: AxiosInstance

  constructor(private apollo: Apollo, private authService: AuthService, private serviceService: ServiceService) {
    this.axiosInstance = axios.create({
      baseURL: `${API_URL}/services/contents`,
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`,
      }
    });
  }

  async syncAllContents(page: number = 1, limit: number = 10) {
    this.loadingSubject.next(true);

    const result = await this.apollo.query<{ findAllContents: Content[] }>({
      query: gql`
        query findAllContents($page: Int, $limit: Int) {
          findAllContents(page: $page, limit: $limit) {
            contentId
            name
            description
            service {
              serviceId
              price
              name
              city
              country
              capital
              currency
              officialName
              region
              language
              population
              latitude
              longitude
              description
              category
              arrivalLatitude
              arrivalLongitude
              departureDate
              duration
              transportType
              drink
              lunch
              dessert
            }
            user {
              name
              email
              username
            }
          }
        }
      `,
      fetchPolicy: 'network-only',
      variables: {
        page,
        limit
      }
    }).pipe(
      // Mapear la respuesta al modelo Producto
      map(result => {
        return result.data.findAllContents;
      })
    ).toPromise();

    this.contentsSubject.next(result || []);
    this.filterSubject.next(undefined);
    this.categoriesSubject.next(undefined);
    this.lessThanSubject.next(undefined);
    this.moreThanSubject.next(undefined);
    this.loadingSubject.next(false);
  }

  async syncContentsByFilter(
    filter: {
      filter?: string,
      categories?: ServiceCategory[],
      lessThan?: number,
      moreThan?: number
    },
    page: number = 1,
    limit: number = 10
  ) {
    this.loadingSubject.next(true);

    const result = await this.apollo.query<{ findContentsByFilter: Content[] }>({
      query: gql`
        query findContentsByFilter($filter: ServiceFilter, $page: Int, $limit: Int) {
          findContentsByFilter(filter: $filter, page: $page, limit: $limit) {
            contentId
            name
            description
            service {
              serviceId
              price
              name
              city
              country
              capital
              currency
              officialName
              region
              language
              population
              latitude
              longitude
              description
              category
              arrivalLatitude
              arrivalLongitude
              departureDate
              duration
              transportType
              drink
              lunch
              dessert
            }
            user {
              name
              email
              username
            }
          }
        }
      `,
      fetchPolicy: 'network-only',
      variables: {
        filter,
        page,
        limit
      }
    }).pipe(
      // Mapear la respuesta al modelo Producto
      map(result => {
        return result.data.findContentsByFilter;
      })
    ).toPromise();

    this.contentsSubject.next(result || []);
    this.filterSubject.next(filter.filter);
    this.categoriesSubject.next(filter.categories);
    this.lessThanSubject.next(filter.lessThan);
    this.moreThanSubject.next(filter.moreThan);
    this.loadingSubject.next(false);
  }

  async getContentById(contentId: string): Promise<Content | null> {
    const result = await this.apollo
      .query<{ findContentById: Content }>({
        query: gql`
          query findContentById($contentId: ID!) {
            findContentById(contentId: $contentId) {
              name
              description
              service {
                serviceId
                price
                name
                city
                country
                description
                category
                capital
                currency
                officialName
                region
                language
                population
                latitude
                longitude
                arrivalLatitude
                arrivalLongitude
                departureDate
                duration
                transportType
                drink
                lunch
                dessert
              }
              user {
                name
                email
                username
              }
            }
          }
        `,
        variables: {
          contentId,
        },
      })
      .toPromise();

    return result?.data?.findContentById || null;
  }

  async getPhoto(contentId: string): Promise<string> {
    this.loadingSubject.next(true);

    try {
      const response = await this.axiosInstance.get(`/${contentId}/photo`, {
        responseType: 'blob',
        validateStatus: (status) => status === 200 || status === 404,
        headers: {
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      });

      if (response.status === 404) {
        this.loadingSubject.next(false);
        return '';
      }

      const href = URL.createObjectURL(response.data);

      this.loadingSubject.next(false);
      return href;
    } catch (error) {
      this.loadingSubject.next(false);
      console.error('Error fetching blob:', error);
      throw error;
    }
  }

  async getMyContents(): Promise<Content[]> {
    const response = await this.axiosInstance.get(``);
    return response.data
  }

  async createContentWithService(contentData: any): Promise<Content> {
    try {
      let serviceId: string | undefined = undefined;

      if (contentData.service) {
        serviceId = await this.serviceService.createService(contentData.service, contentData.service.category);
      }

      const contentPayload = {
        ...contentData,
        serviceId: serviceId || '',
      };

      return await this.createContent(contentPayload);
    } catch (error) {
      console.error('Error creating content with service:', error);
      throw error;
    }
  }

  async createContent(contentData: any): Promise<Content> {
    const formData = new FormData();

    // formData.append('name', contentData.name);
    // formData.append('description', contentData.description || '');
    // formData.append('serviceId', contentData.serviceId || '');

    // if (contentData.photo) {
    //   formData.append('photo', contentData.photo);
    // }

    try {
      const response = await this.axiosInstance.postForm(``, { name: contentData.name, description: contentData.description, serviceId: contentData.serviceId, photo: contentData.photo }
      );
      return response.data;
    } catch (error) {
      console.error('Error creating content:', error);
      throw error;
    }
  }

}
