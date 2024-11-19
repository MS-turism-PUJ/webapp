import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs';
import { Content } from '../models/content';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  constructor(private apollo: Apollo) {}

  async getContents(page: number = 1, limit: number = 10): Promise<Content[]> {
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

    return result || [];
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
