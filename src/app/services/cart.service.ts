import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Service } from '../models/service';



@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: Service[] = [];
  private cartSubject = new BehaviorSubject<Service[]>([]);

  updateCartItems(items: any[]) {
    this.cartSubject.next(items);
  }

  getCartItems() {
    return this.cartSubject.asObservable();
  }

  addToCart(service: Service) {
    this.items.push(service);
    this.cartSubject.next(this.items);
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
    this.cartSubject.next(this.items);
  }
}
