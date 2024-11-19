import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Payment } from '../models/payment';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  payment: Payment = {
    paymentId: '',
    totalAmount: 0,
    user: {
      userId: 0,
      name: '',
      email: '',
      username: ''
    },
    paid: false,
    services: []
  };

  private cartSubject = new BehaviorSubject<Payment>(this.payment);

  constructor(private apollo: Apollo) {
    this.syncCart();
  }

  private async syncCart() {
    const result = await this.apollo.query<{ getMyShoppingCart: Payment }>({
      query: gql`
      query getMyShoppingCart {
        getMyShoppingCart {
          totalAmount
          paid
          services {
            serviceId
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
      `,
      fetchPolicy: 'network-only'
    }).pipe(
      map(result => {
        const info = result.data.getMyShoppingCart;
        const services = info.services.map(service => {
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
        return { ...info, services };
      })
    ).toPromise();

    result && (this.payment = result);

    this.cartSubject.next(this.payment);
  }

  getCart(): Observable<Payment> {
    return this.cartSubject.asObservable();
  }

  async addToCart(serviceId: string) {
    await this.apollo.mutate({
      mutation: gql`
        mutation addToMyShoppingCart($serviceId: ID!) {
          addToMyShoppingCart(serviceId: $serviceId)
        }
      `,
      variables: {
        serviceId
      }
    }).toPromise();

    this.syncCart();
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

    this.syncCart();
  }
}
