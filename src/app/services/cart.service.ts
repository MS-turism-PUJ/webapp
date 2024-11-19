import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Payment } from '../models/payment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private apollo: Apollo) {}

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
          }
        }
      `
    }).pipe(
      // Mapear la respuesta al modelo Producto
      map(result => {
        return result.data.getMyShoppingCart;
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
