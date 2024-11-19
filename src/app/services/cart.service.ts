import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Payment } from '../models/payment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private apollo: Apollo) { }

  async getCartItems(): Promise<Payment> {
    const result = await this.apollo.query<{ getMyShoppingCart: Payment }>({
      query: gql`
        query getMyShoppingCart {
          getMyShoppingCart {
            totalAmount
            paid
            services {
              name
              price
              description
            }
            user {
              name
              email
              username
            }
          }
        }
      `
    }).pipe(
      // Mapear la respuesta al modelo Producto
      map(result => {
        const info = result.data.getMyShoppingCart;
        info.services = info.services.map(service => {
          return {
            serviceId: service.serviceId,
            name: service.name,
            price: service.price,
            description: service.description,
            city: service.city,
            country: service.country,
            category: service.category,
            user: info.user
          }
        });
        return info;
      })
    ).toPromise();

    return result || new Payment('', 0, { userId: 0, name: '', email: '', username: '' }, false, []);
  }

  async addToCart(serviceId: string) {
    const response = await this.apollo.mutate({
      mutation: gql`
        mutation addToMyShoppingCart($serviceId: ID!) {
          addToMyShoppingCart(serviceId: $serviceId)
        }
      `,
      variables: {
        serviceId
      }
    }).toPromise();

    console.log(response);
  }

  async removeItem(serviceId: string) {
    await this.apollo.mutate({
      mutation: gql`
        mutation removeFromMyShoppingCart($serviceId: ID!) {
          removeFromMyShoppingCart(serviceId: $serviceId)
        }
      `,
      variables: {
        serviceId
      }
    }).toPromise();
  }
}
