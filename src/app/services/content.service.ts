import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Content } from '../models/content';
import { ServiceCategory } from '../models/service.category';

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

  constructor(private apollo: Apollo) {}

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
