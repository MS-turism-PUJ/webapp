import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Content } from '../models/content';
import { ServiceCategory } from '../models/service.category';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  contents: Content[] = [];
  page: number = 1;
  limit: number = 10;
  private contentsSubject = new BehaviorSubject<Content[]>(this.contents);
  private pageSubject = new BehaviorSubject<number>(this.page);
  private limitSubject = new BehaviorSubject<number>(this.limit);

  constructor(private apollo: Apollo) {}

  async syncAllContents(page: number = 1, limit: number = 10) {
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

    this.contents = result || [];

    this.contentsSubject.next(this.contents);
  }

  async syncContentsByFilter(filter: string, categories: ServiceCategory[], page: number = 1, limit: number = 10) {
    const result = await this.apollo.query<{ findContentsByFilter: Content[] }>({
      query: gql`
        query findContentsByFilter($filter: String, $page: Int, $limit: Int) {
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
        // categories: categories.map(category => category.name),
        page,
        limit
      }
    }).pipe(
      // Mapear la respuesta al modelo Producto
      map(result => {
        return result.data.findContentsByFilter;
      })
    ).toPromise();

    this.contents = result || [];

    this.contentsSubject.next(this.contents);
  }

  getContents(): Observable<Content[]> {
    return this.contentsSubject.asObservable();
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
}
